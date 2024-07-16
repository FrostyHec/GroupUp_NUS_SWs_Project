from typing import List, Dict, Optional

from DTO.GroupVectors import GroupVectors
from algorithm.Vector import Vector


# TODO
class Recommender:
    def __init__(self):
        pass

    def get_vector(self, survey, answer) -> Vector:
        pass

    def get_willing(self, survey, willing: str) -> Vector:
        pass

    def get_person_preference_order(self, user: Vector,
                                    user_group: Optional[GroupVectors],
                                    current_ungrouped_person: Dict[int, Vector],
                                    restriction) -> Dict[int, float]:
        pass

    def get_group_preference_order(self, user: Vector,
                                   user_group: Optional[GroupVectors],
                                   current_group: List[GroupVectors],
                                   restriction
                                   ) -> Dict[int, float]:
        pass

    def grouping(self, current_group: List[GroupVectors],
                 current_ungrouped: Dict[int, Vector],
                 restriction) -> List[GroupVectors]:
        pass
