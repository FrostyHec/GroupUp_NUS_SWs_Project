import asyncio
import pickle
import io

from exception.Exception import InternalException


class Utils:
    @staticmethod
    def get_key(survey_id: int, user_id: int) -> str:
        return f"survey-{survey_id}-user-{user_id}"

    @staticmethod
    def serialize_object_to_bytes(obj):
        byte_data = pickle.dumps(obj)
        byte_stream = io.BytesIO(byte_data)
        return io.BufferedReader(byte_stream)


    @staticmethod
    def deserialize_object_from_bytes(byte_stream):
        return pickle.loads(byte_stream)


    @staticmethod
    async def async_function(function,params,exception_handler=None,success_handler=None,
                             success_handler_param = None
                             ):
        try:
            res = function(*params)
            if success_handler is None:
                return res
            if success_handler_param is None:
                return success_handler()
            return success_handler(*success_handler_param,res)
        except Exception as e:
            if exception_handler is None:
                raise e
            return exception_handler(e)
    @classmethod
    def async_execution(cls,function,params,exception_handler=None,success_handler=None,
                        success_handler_param = None):
        return asyncio.create_task(cls.async_function(function,params,exception_handler,
                                                      success_handler,
                                                success_handler_param))