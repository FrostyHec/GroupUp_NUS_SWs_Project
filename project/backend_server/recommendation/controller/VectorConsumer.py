import datetime
import json
import time
from enum import Enum

import pika
from tzlocal import get_localzone
from common.Log import Log
from common.Utils import Utils
from config.Config import Config
from dto.Singleton import Singleton
from mapper.DatabaseMapper import DatabaseMapper
from service.StorageService import StorageService

date_format = '%Y-%m-%dT%H:%M:%S.%f%z'
local_timezone = get_localzone()
class VectorMessageType(Enum):
    UPDATE = 1
    DELETE = 2


class VectorConsumer:
    @staticmethod
    def get_rabbitmq_connection():
        credentials = pika.PlainCredentials(Config.mq_user, Config.mq_password)
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=Config.mq_host, port=Config.mq_port,
                                      credentials=credentials)
        )
        return connection

    @staticmethod
    def get_channel(connection):
        channel = connection.channel()
        channel.queue_declare(queue=Config.vector_queue)
        return channel

    @classmethod
    def start_consuming(cls):
        connection = cls.get_rabbitmq_connection()
        channel = cls.get_channel(connection)
        channel.basic_consume(
            queue=Config.vector_queue, on_message_callback=cls.callback, auto_ack=True
        )
        Log.info('Waiting for messages')
        channel.start_consuming()

    @staticmethod
    def callback(ch, method, properties, body):
        try:
            message = body.decode('utf-8')
            data = json.loads(message)
            Log.info(f"Received message on vector consumer: {body}\n,data:{data}")

            type = int(data['type'])
            if type == VectorMessageType.DELETE.value:
                VectorConsumer.delete_vector(data)
            elif type == VectorMessageType.UPDATE.value:
                VectorConsumer.update_vector(data)
            else:
                Log.warn(f"Unknown message type: {type}")
        except Exception as e:
            Log.warn(f"Error while processing message: {e}")


    @classmethod
    def update_vector(cls, data):
        rcvd_update_time = datetime.datetime.strptime(data['update_time'], date_format).replace(tzinfo=datetime.timezone.utc)
        query_id = data['query_id']
        if rcvd_update_time is None:
            Log.warn(f"error!update time is NULL!:{data}")
            return
        # 从数据库中检查是否为最新
        questions, update_at, questions_answer, survey_id, member_id, status \
            = DatabaseMapper.get_query_and_survey(
            query_id)
        update_at = update_at.replace(tzinfo=local_timezone)
        if status != 2 or  update_at-rcvd_update_time>datetime.timedelta(seconds=1):
            Log.warn(f"Message is outdated, skipping:{data}")
            return

        t1 = time.time()
        Log.info(f"Updating vector for survey:{survey_id}, member:{member_id}")
        vec = Singleton.recommender.get_vector(questions, questions_answer)
        Log.info(f"Generated vector:{vec},time taken:{time.time()-t1}")

        StorageService.upload(Utils.get_key(survey_id, member_id), vec)
        Log.info(f"Vector updated for survey:{survey_id}, member:{member_id}")

    @classmethod
    def delete_vector(cls, data):
        user_id = data['user_id']
        survey_id = data['survey_id']
        StorageService.delete(Utils.get_key(survey_id, user_id))
