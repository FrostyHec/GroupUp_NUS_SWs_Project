from typing import List, Dict

from algorithm.Vector import Vector


class GroupVectors:
    def __init__(self, group_id: int, group_info: Dict[int, Vector]):
        self.group_id: int = group_id
        self.info: Dict[int, Vector] = group_info
