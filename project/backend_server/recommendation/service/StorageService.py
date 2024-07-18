import pickle

import requests

from common.Log import Log
from config.Config import Config
from exception.Exception import InternalException


class StorageService:
    @staticmethod
    def upload(key: str, data):
        data = pickle.dumps(data)
        resp = requests.post(Config.storage_service,
                             params={'key': key},
                             files={'file': data})
        if resp.status_code != 200:
            raise InternalException(resp)

    @staticmethod
    def get(key: str):
        response = requests.get(Config.storage_service, params={'key': key})
        return response.status_code, response.content

    @staticmethod
    def delete(key: str):
        resp = requests.delete(Config.storage_service, params={'key': key})
        if not (200 <= resp.status_code < 400):
            raise InternalException(resp)

    @staticmethod
    def common_failure_handler(e: Exception):
        Log.warn(f"failed to upload: {e}")
