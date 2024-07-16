import json
from typing import List, Dict, Optional

from DTO.GroupVectors import GroupVectors
from algorithm.Vector import Vector


# TODO
class Recommender:
    def __init__(self):
        pass

    def get_vector(self, survey: json, answer: json) -> Vector:
        """
        :param survey: 标准问卷的json格式
        :param answer:
        :return:
        """
        pass

    def get_willing(self, survey: json, willing: str) -> Vector:
        pass

    def get_person_preference_order(self, user: Vector,
                                    user_group: Optional[GroupVectors],
                                    current_ungrouped_person: Dict[int, Vector],
                                    restriction: json) -> Dict[int, float]:
        """
        :param user: 用户的向量
        :param user_group: 可能用户不在一个组中，此时为None
        :param current_ungrouped_person: 未组队的个人 <userid,vector>
        :param restriction: 组队的限制
        :return: <userid,recommendation_value(0~100)>
        """
        pass

    def get_group_preference_order(self, user: Vector,
                                   user_group: Optional[GroupVectors],
                                   current_group: List[GroupVectors],
                                   restriction: json
                                   ) -> Dict[int, float]:
        """
        :param user: 用户的向量
        :param user_group: 可能用户不在一个组中，此时为None
        :param current_group: 当前的组队的组
        :param restriction: 组队的限制
        :return: <groupid,recommendation_value(0~100)>
        """
        pass

    def grouping(self, current_group: List[GroupVectors],
                 current_ungrouped: Dict[int, Vector],
                 restriction: json
                 ) -> List[GroupVectors]:
        """
        :param current_group:
        :param current_ungrouped:
        :param restriction:
        :return:
        """
        pass
