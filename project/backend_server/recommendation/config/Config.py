import importlib.util

module_name = 'safety-nonpublic-config'
module_path = './safety-nonpublic-config.py'

spec = importlib.util.spec_from_file_location(module_name, module_path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
DatabaseConfig = module.DatabaseConfig


class Config:
    port = 5000
    global_thread_pool_size:int = 1000
    storage_service = 'http://localhost:7011/api/v1/object'
    start_cache = True

    base_api = '/api/v1'
    database_url = DatabaseConfig.DATABASE_URL
    database_username = DatabaseConfig.DATABASE_USER
    database_password = DatabaseConfig.DATABASE_PASSWORD
