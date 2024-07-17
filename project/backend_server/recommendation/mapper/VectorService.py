import asyncio
import json
from asyncio import Queue
from concurrent.futures import ThreadPoolExecutor
from typing import Optional, List, Tuple, Dict

from common.Log import Log
from common.Response import Response
from common.Utils import Utils
from config.Config import Config
from dto.GroupVectors import GroupVectors
from dto.Singleton import Singleton
from dto.Vector import Vector
from exception.Exception import ExternalException
from service.DatabaseMapper import DatabaseMapper
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
    def query_current_group_vectors(cls,survey_id:int,user_id:int) -> List[GroupVectors]:
        # TODO 1. 查询当前分组情况，并且对每个组查询其成员的向量
        ug,gu = DatabaseMapper.get_groups(survey_id,user_id)


    @classmethod
    def generate_user_vector(cls, survey_id: int, user_id: int) -> Vector:
        survey: json = DatabaseMapper.get_survey(survey_id)
        query: json = DatabaseMapper.get_query(survey_id, user_id)
        if DatabaseMapper.json_is_empty(survey):
            raise ExternalException(Response.get_not_found("survey-no-found"))
        elif DatabaseMapper.json_is_empty(query):
            raise ExternalException(Response.get_not_found("query-no-found"))
        vector: Vector = Singleton.recommender.get_vector(survey, query)
        return vector

    @classmethod
    def fetch_vectors(cls, survey_id: int, user_ids: List[int]) -> Dict[int, Vector]:
        que:Queue[Tuple[int,Vector]] = Queue()
        def push_to_queue(uid: int, key: str, queue: Queue, res):
            code, data = res
            if code != 200:
                # try generating immediately
                Log.warn(f"Failed to get vector from storage service, generating immediately")
                vec = cls.generate_user_vector(survey_id, uid)
                Utils.async_execution(StorageService.upload, (key, vec),
                                     exception_handler=StorageService.common_failure_handler)
            else:
                vec = Utils.deserialize_object_from_bytes(data)
            queue.put((uid, vec))
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


