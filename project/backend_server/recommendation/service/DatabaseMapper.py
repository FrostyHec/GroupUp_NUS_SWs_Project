import json
from typing import Optional, Dict, List, Tuple

from sqlalchemy import create_engine
import json

from config.Config import Config

# 数据库连接URL
DATABASE_URL = (f'postgresql+psycopg2://{Config.database_username}:'
                f'{Config.database_password}@'
                f'{Config.database_url}')

# 创建数据库引擎并配置连接池
engine = create_engine(DATABASE_URL)


class DatabaseMapper:

    @classmethod
    def __execute_query(cls, query, handle_function, params=None):
        with engine.connect() as connection:
            result = connection.execute(query, params)
            res = handle_function(result)
        return res

    @classmethod
    def get_restriction(cls, survey_id: int) -> json:
        query = 'SELECT group_restriction FROM survey WHERE id = :survey_id;'
        params = {'survey_id': survey_id}
        return cls.__execute_query(query, cls.__to_json, params)

    @classmethod
    def __to_json(cls, result):
        row = result.fetchall()
        if row:
            result_json = json.dumps(row)
        else:
            result_json = json.dumps({})
        return result_json

    @classmethod
    def json_is_empty(cls, json_str):
        return json_str == json.dumps({})

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
    def get_survey(cls, survey_id: int) -> json:
        query = 'SELECT survey FROM survey WHERE id = :survey_id;'
        params = {'survey_id': survey_id}
        return cls.__execute_query(query, cls.__to_json, params)

    @classmethod
    def get_query(cls, survey_id: int, user_id: int) -> json:
        query = 'SELECT query FROM query WHERE id = :survey_id and member_id = :user_id;'
        params = {'user_id': user_id, 'survey_id': survey_id}
        return cls.__execute_query(query, cls.__to_json, params)

    @classmethod
    def get_user_groups(cls, survey_id: int, user_id: int) -> (Optional[int], list[int]):
        query = """
        select group_id from group_member m
        join group_table t on m.group_id == t.id
        where survey_id = : survey_id and member_id = :user_id;
                 """
        params = {'user_id': user_id, 'survey_id': survey_id}
        group_id = int(cls.__execute_query(query, cls.__to_single, params))
        if group_id is None:
            return None, []

        query2 = """
        select member_id from group_member where group_id = :group_id;
        """
        params2 = {'group_id': group_id}
        res = cls.__execute_query(query2, cls.__to_multiple, params2)
        members = [int(i) for i in res]
        return group_id, members

    @classmethod
    def get_groups(cls, survey_id:int, user_id:int)->Tuple[Dict[int,int],Dict[int,List[int]]]:
        """
        返回<uid:gid>, <gid:list[uid]>, 过滤掉了自己用户所在的组
        :param survey_id:
        :param user_id:
        :return:
        """
        query1 = """
        select id,member_id from group_table t
        join group_member m on t.id==m.group_id 
        where survey_id = :survey_id
        ;
        """
        params = {'survey_id':survey_id}
        rows = cls.__execute_query(query1,cls.__to_multiple,params)
        ug,gu = {},{}
        for row in rows:
            gid,uid = row[0],row[1]
            ug[uid]=gid
            if gid not in gu:
                gu[gid]=[]
            gu[gid].append(uid)

        # 过滤掉自己
        if user_id in ug:
            rmv_gid= ug[user_id]
            for uid in gu[rmv_gid]:
                del ug[uid]
            del gu[rmv_gid]
        return ug,gu




