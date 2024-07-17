import os
import time

import requests
import filecmp

from common.Utils import Utils
from config.Config import Config
from service.StorageService import StorageService


def test():
    url = Config.storage_service
    testfile_path = 'testfile.txt'
    download_path = 'downloaded_example.txt'
    file_name = "longzhi"
    # 打开文件并发起POST请求
    with open(testfile_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(url, params={'key': file_name}, files=files)

    print(f"response on upload:{response}")

    assert response.status_code == 200

    response = requests.get(url, params={'key': file_name})

    assert response.status_code == 200

    print(f"response on download:{response}")

    with open('downloaded_example.txt', 'wb') as f:
        f.write(response.content)

    assert filecmp.cmp(testfile_path, download_path)

    os.remove(download_path)

    print('test pass on normal upload')


def test_download_empty():
    url = Config.storage_service
    testfile_path = 'testfile.txt'
    file_name = "longzhi"
    response = requests.get(url, params={'key': file_name})
    print(response)
    assert response.status_code == 404
    print('test-pass')


def test_upload_object():
    test_data = [1, 2, 3, 4, 5, 6, 7]
    file = Utils.serialize_object_to_bytes(test_data)
    t1= time.time()
    StorageService.upload('fei', file)
    t2 = time.time()
    print(f'upload consumed:{t2-t1}')
    code, rcvd_file = StorageService.get('fei')
    print(f'get consumed:{time.time()-t2}')
    assert code == 200
    rcvd_data = Utils.deserialize_object_from_bytes(rcvd_file)
    assert test_data == rcvd_data


if __name__ == "__main__":
    t1 = time.time()
    # test()
    test_upload_object()
    print(f"time: {time.time()-t1}")
