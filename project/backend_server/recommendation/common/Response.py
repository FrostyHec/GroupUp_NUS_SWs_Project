from enum import Enum
import json

class ResponseCodeType(Enum):
    SUCCESS = 200
    NOT_MODIFIED = 304
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    NO_FOUND = 404
    INTERNAL_ERROR = 500

class Response:
    def __init__(self, code_type, msg, data):
        self.code = code_type.value
        self.msg = msg
        self.data = data

    @staticmethod
    def get_success(msg="", data=None):
        return Response(ResponseCodeType.SUCCESS, msg, data)

    @staticmethod
    def get_not_modified(msg=""):
        return Response(ResponseCodeType.NOT_MODIFIED, msg, None)

    @staticmethod
    def get_bad_request(msg):
        return Response(ResponseCodeType.BAD_REQUEST, msg, None)

    @staticmethod
    def get_unauthorized(msg):
        return Response(ResponseCodeType.UNAUTHORIZED, msg, None)

    @staticmethod
    def get_not_found(msg):
        return Response(ResponseCodeType.NO_FOUND, msg, None)

    @staticmethod
    def get_internal_error(msg):
        return Response(ResponseCodeType.INTERNAL_ERROR, msg, None)

    def to_dict(self):
        return {
            'code': self.code,
            'msg': self.msg,
            'data': self.data
        }

    def __str__(self):
        return json.dumps(self.to_dict())