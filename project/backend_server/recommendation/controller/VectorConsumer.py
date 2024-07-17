import json
from enum import Enum

import pika

from common.Log import Log
from common.Utils import Utils
from config.Config import Config
from dto.Singleton import Singleton
from mapper.DatabaseMapper import DatabaseMapper
from service.StorageService import StorageService


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
        message = body.decode('utf-8')
        data = json.loads(message)
        Log.info(f"Received message on vector consumer: {body}\n,data:{data}")

        type = int(data['type'])
        if type == VectorMessageType.DELETE.name:
            VectorConsumer.delete_vector(data)
        elif type == VectorMessageType.UPDATE.name:
            VectorConsumer.update_vector(data)
        else:
            Log.warn(f"Unknown message type: {type}")

    @classmethod
    def update_vector(cls, data):
        update_time = data['update_time']
        query_id = data['query_id']

        # 从数据库中检查是否为最新
        questions, update_at, questions_answer, survey_id, member_id = DatabaseMapper.get_query_and_survey(
            query_id)
        if update_time < update_at:
            Log.info(f"Message is outdated, skipping:{data}")
            return

        vec = Singleton.recommender.get_vector(questions, questions_answer)
        StorageService.upload(Utils.get_key(survey_id, member_id), vec)

    @classmethod
    def delete_vector(cls, data):
        user_id = data['user_id']
        survey_id = data['survey_id']
        StorageService.delete(Utils.get_key(survey_id, user_id))
