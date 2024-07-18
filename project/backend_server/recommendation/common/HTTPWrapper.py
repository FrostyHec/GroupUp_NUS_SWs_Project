from enum import Enum
from functools import wraps
from flask import make_response, jsonify

from common.Log import Log
from common.Response import Response
from exception.Exception import ExternalException


class HTTPCodeType(Enum):
    OK = 200
    INTERNAL_SERVER_ERROR = 500


def reply_json(data, status=HTTPCodeType.OK):
    return make_response(jsonify(data), status.value)

def common_http_response(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            reply:Response = f(*args, **kwargs)
            return reply_json(reply.to_dict())
        except ExternalException as e:
            Log.info(f'ExternalException:{e}')
            return reply_json(e.response.data)
        except Exception as e:
            Log.warn(f'InternalException:{e}')
            return reply_json(str(e), HTTPCodeType.INTERNAL_SERVER_ERROR)
    return decorated_function
