from typing import Optional, Dict, List, Tuple

from sqlalchemy import create_engine, text
import json

from sqlalchemy.orm import sessionmaker

from config.Config import Config
from dto.DatabaseDTO import GroupTable, GroupMember
from dto.GroupVectors import GroupVectors

# 数据库连接URL
DATABASE_URL = (f'postgresql+psycopg2://{Config.database_username}:'
                f'{Config.database_password}@'
                f'{Config.database_url}')

# 创建数据库引擎并配置连接池
engine = create_engine(DATABASE_URL)

Session = sessionmaker(bind=engine)


class DatabaseMapper:

    @classmethod
    def __execute_query(cls, query: str, handle_function, params=None):
        with engine.connect() as connection:
            result = connection.execute(text(query), params)
            res = handle_function(result)
        return res

    @classmethod
    def get_restriction(cls, survey_id: int):
        query = 'SELECT group_restriction FROM survey WHERE id = :survey_id;'
        params = {'survey_id': survey_id}
        return cls.__execute_query(query, cls.__to_json, params)

    @classmethod
    def __empty_to(cls, result):
        return result

    @classmethod
    def __to_json(cls, result):
        row = result.fetchone()
        if row:
            x = row[0]
            result_json = json.dumps(x)
            result_json = json.loads(result_json)
        else:
            result_json = {}
        if isinstance(result_json, str):
            raise 'Error!result_json is str!:'
        return result_json

    @classmethod
    def json_is_empty(cls, json_str):
        return json_str is None or len(json_str) == 0

    @classmethod
    def __to_single(cls, result):
        row = result.fetchone()
        if row is None or len(row) == 0:
            return None
        if row and len(row) == 1:
            return row[0]
        else:
            raise ValueError(f"Query did not return exactly one row with one column:{result}")

    @classmethod
    def __to_multiple(cls, result):
        return result.fetchall()

    @classmethod
    def get_survey(cls, survey_id: int):
        query = 'SELECT questions FROM survey WHERE id = :survey_id;'
        params = {'survey_id': survey_id}
        return cls.__execute_query(query, cls.__to_json, params)

    @classmethod
    def get_query(cls, survey_id: int, user_id: int):
        query = """SELECT questions_answer FROM query 
        WHERE survey_id = :survey_id and member_id = :user_id""" # status==2? TODO
        # and
        # status=2;
        params = {'user_id': user_id, 'survey_id': survey_id}
        return cls.__execute_query(query, cls.__to_json, params)

    @classmethod
    def get_user_groups(cls, survey_id: int, user_id: int) -> (Optional[int], list[int]):
        query = """
        select group_id from group_member m
        join group_table t on m.group_id = t.id
        where survey_id = :survey_id and member_id = :user_id;
                 """
        params = {'user_id': user_id, 'survey_id': survey_id}
        group_id = cls.__execute_query(query, cls.__to_single, params)
        if group_id is None:
            return None, []
        group_id = int(group_id)

        query2 = """
        select member_id from group_member where group_id = :group_id;
        """
        params2 = {'group_id': group_id}
        res = cls.__execute_query(query2, cls.__to_multiple, params2)
        members = [int(i) for i in res]
        return group_id, members

    @classmethod
    def get_groups(cls, survey_id: int, user_id: Optional[int] = None) -> Tuple[
        Dict[int, int], Dict[int,
        List[int]]]:
        """
        返回<uid:gid>, <gid:list[uid]>, 过滤掉了自己用户所在的组
        :param survey_id:
        :param user_id:
        :return:
        """
        query1 = """
        select id,member_id from group_table t
        join group_member m on t.id=m.group_id 
        where survey_id = :survey_id
        ;
        """
        params = {'survey_id': survey_id}
        rows = cls.__execute_query(query1, cls.__to_multiple, params)
        ug, gu = {}, {}
        for row in rows:
            gid, uid = row[0], row[1]
            ug[uid] = gid
            if gid not in gu:
                gu[gid] = []
            gu[gid].append(uid)

        # 过滤掉自己
        if user_id is not None and user_id in ug:
            rmv_gid = ug[user_id]
            for uid in gu[rmv_gid]:
                del ug[uid]
            del gu[rmv_gid]
        return ug, gu

    @classmethod
    def get_query_and_survey(cls, query_id: int):
        query = """
        select survey_id,update_at,questions_answer,member_id,status from query where id= :query_id;
        """
        params = {'query_id': query_id}
        result = cls.__execute_query(query, cls.__empty_to, params)
        row = result.fetchone()
        survey_id, update_at, questions_answer, member_id, status = (row[0], row[1], row[2],
                                                                     row[3], row[4])

        query2 = """
        select questions from survey where id = :survey_id;
        """
        params2 = {'survey_id': survey_id}
        questions = cls.__execute_query(query2, cls.__to_json, params2)
        return questions, update_at, questions_answer, survey_id, member_id, status

    @classmethod
    def update_grouping_result(cls, sid: int, group_res: List[GroupVectors]):
        """
        :param group_res:
        :return:
        """
        # 清空组队情况
        delete_member = """
        delete from group_member where group_id in (select id from group_table where survey_id= :sid);
        """
        session = Session()
        session.execute(text(delete_member), {'sid': sid})
        session.commit()

        # 重新插入
        group_members: List[GroupMember] = []
        for group in group_res:
            gid = group.group_id
            members: List[int] = list(group.info.keys())
            if gid == -1:  # TODO 新的组，需创建新的id
                new_group = GroupTable(survey_id=sid)
                session.add(new_group)
                gid = new_group.id
            assert gid != -1
            for mid in members:
                group_members.append(GroupMember(group_id=gid, member_id=mid))

        # 批量添加
        session.add_all(group_members)
        session.commit()
        session.close()

    @classmethod
    def get_single_user(cls, survey_id: int, user_id: Optional[int] = None) -> List[int]:
        # 查询所有<uid,sid>存在query但不存在<uid,gid>与<gid,sid> for some gid的组，最后过滤user_id
        query = """
        with grouped_uids as (
            select member_id from group_member 
            where group_id in (
                select id from group_table where 
                survey_id=:survey_id
            )
        )
        select member_id from query where survey_id=:survey_id and member_id not in (
            select member_id from grouped_uids
        ) and status=2 
        """
        params = {'survey_id': survey_id}
        if user_id is not None:
            query += " and member_id != :user_id"
            params['user_id'] = user_id
        res = cls.__execute_query(query, cls.__to_multiple, params)
        return [int(e[0]) for e in res]
