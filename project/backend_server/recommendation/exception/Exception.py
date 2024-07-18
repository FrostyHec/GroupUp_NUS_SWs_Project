from common.Response import Response


class ExternalException(Exception):
    def __init__(self, response:Response):
        self.response = response

class InternalException(Exception):
    def __init__(self,msg):
        super().__init__(msg)