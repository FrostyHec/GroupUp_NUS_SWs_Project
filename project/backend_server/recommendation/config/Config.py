import importlib.util
import os

current_script_path = os.path.abspath(__file__)
current_script_dir = os.path.dirname(current_script_path)

module_name = 'safety-nonpublic-config'
module_path = os.path.join(current_script_dir, 'safety-nonpublic-config.py')

spec = importlib.util.spec_from_file_location(module_name, module_path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
DatabaseConfig = module.DatabaseConfig


class Config:
    port = 5000
    global_thread_pool_size:int = 1000
    storage_service = 'http://localhost:7002/api/v1/object'
    start_cache = True

    base_api = '/api/v1'
    database_url = DatabaseConfig.DATABASE_URL
    database_username = DatabaseConfig.DATABASE_USER
    database_password = DatabaseConfig.DATABASE_PASSWORD

    vector_queue = 'vector_queue'
    mq_host = DatabaseConfig.RABBITMQ_HOST
    mq_port = DatabaseConfig.RABBITMQ_PORT
    mq_user = DatabaseConfig.RABBITMQ_USER
    mq_password = DatabaseConfig.RABBITMQ_PASSWORD

    recommender_model = "default"
    API_key = DatabaseConfig.API_KEY
