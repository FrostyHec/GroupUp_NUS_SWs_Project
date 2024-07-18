import asyncio
import pickle
from queue import Queue
from typing import Optional, List, Tuple, Dict

from common.Log import Log
from common.Response import Response
from common.Utils import Utils
from dto.GroupVectors import GroupVectors
from dto.Singleton import Singleton
from dto.Vector import Vector
from exception.Exception import ExternalException, InternalException
from mapper.DatabaseMapper import DatabaseMapper
from service.StorageService import StorageService


class VectorService:
    @classmethod
    def query_user_vector(cls, survey_id: int, user_id: int) -> Vector:
        return cls.fetch_vectors(survey_id, [user_id])[user_id]

    @classmethod
    def query_user_group_vectors(cls, survey_id: int, user_id: int) -> Optional[GroupVectors]:
        # TODO 1. 查询该用户所在的组的所有成员 2. 分别查询其向量
        group_id, user_ids = DatabaseMapper.get_user_groups(survey_id, user_id)
        if group_id is None:
            return None
        res_dict =  cls.fetch_vectors(survey_id, user_ids)
        return GroupVectors(group_id, res_dict)


    @classmethod
    def query_current_group_vectors(cls,survey_id:int,user_id:Optional[int]=None) -> List[
        GroupVectors]:
        # TODO 1. 查询当前分组情况，并且对每个组查询其成员的向量
        ug,gu = DatabaseMapper.get_groups(survey_id,user_id)
        uids = [key for key in ug]
        vecs = cls.fetch_vectors(survey_id, uids)
        res = []
        for group_id, value in gu.items():
            group_info = {}
            for uid in value:
                if uid not in vecs:
                    raise InternalException(f'ERROR! Cannot get the vectors!vecs:{vecs},ug:{ug},'
                                            f'gu:{gu}')
                group_info[uid] = vecs[uid]
            res.append(GroupVectors(group_id,group_info))
        return res



    @classmethod
    def generate_user_vector(cls, survey_id: int, user_id: int) -> Vector:
        survey,query = cls.__get_survey_and_query(survey_id,user_id)
        vector: Vector = Singleton.recommender.get_vector(survey, query)
        return vector
    @classmethod
    def __get_survey_and_query(cls,survey_id,user_id):
        survey = DatabaseMapper.get_survey(survey_id)
        query = DatabaseMapper.get_query(survey_id, user_id)
        if DatabaseMapper.json_is_empty(survey):
            raise ExternalException(Response.get_not_found("survey-no-found"))
        elif DatabaseMapper.json_is_empty(query):
            raise ExternalException(Response.get_not_found("query-no-found"))
        return survey,query

    @classmethod
    def generate_user_vector_by_description(cls, survey_id:int, description:str, user_id:int)->Vector:
        #TODO
        assert description!=""
        survey,query = cls.__get_survey_and_query(survey_id,user_id)
        return Singleton.recommender.get_willing(survey,description,query)

    @classmethod
    def fetch_vectors(cls, survey_id: int, user_ids: List[int]) -> Dict[int, Vector]:
        que:Queue[Tuple[int,Vector]] = Queue()
        def push_to_queue(uid: int, key: str, queue: Queue, res):
            code, data = res
            if code != 200:
                # try generating immediately
                Log.warn(f"Failed to get vector from storage service:{uid}, generating immediately")
                vec = cls.generate_user_vector(survey_id, uid)
                Utils.async_execution(StorageService.upload, (key, vec),
                                     exception_handler=StorageService.common_failure_handler)
            else:
                vec = Utils.deserialize_object_from_bytes(data)
            queue.put((uid, vec)) #?
        async def async_main():
            futures = []
            for uid in user_ids:
                key = Utils.get_key(survey_id,uid)
                future = Utils.async_execution(StorageService.get,
                                     (key,),
                                     success_handler=push_to_queue,
                                     success_handler_param=(uid,key,que)
                                     )
                futures.append(future)
            for future in futures:
                await future

        asyncio.run(async_main())

        res = {}
        while not que.empty():
            uid, vec = que.get()
            res[uid] = vec
        return res

    @classmethod
    def query_current_person_vectors(cls,survey_id:int, user_id:Optional[int]=None)->Dict[int,Vector]:
        # TODO 注意：只拉取填了表单的人
        uids = DatabaseMapper.get_single_user(survey_id,user_id)
        return cls.fetch_vectors(survey_id, uids)


