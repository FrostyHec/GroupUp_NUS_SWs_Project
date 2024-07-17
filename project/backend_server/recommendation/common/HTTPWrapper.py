from enum import Enum
from functools import wraps
from flask import make_response, jsonify

from exception.Exception import ExternalException


class HTTPCodeType(Enum):
    OK = 200
    INTERNAL_SERVER_ERROR = 500


def reply_json(data, status=HTTPCodeType.OK):
    return make_response(jsonify(data), status)

def common_http_response(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return reply_json(f(*args, **kwargs))
        except ExternalException as e:
            return reply_json(e.response.data)
        except Exception as e:
            return reply_json(str(e), HTTPCodeType.INTERNAL_SERVER_ERROR)
    return decorated_function
