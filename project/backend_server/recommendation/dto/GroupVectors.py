from typing import Dict

from dto.Vector import Vector


class GroupVectors:
    def __init__(self, group_id: int, group_info: Dict[int, Vector]):
        """
        :param group_id: group_id
        :param group_info: <userid,vector>
        """
        self.group_id: int = group_id
        self.info: Dict[int, Vector] = group_info
