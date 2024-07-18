import threading

from config.Config import Config
from controller.RecommendConrtoller import app
from controller.VectorConsumer import VectorConsumer



if __name__ == '__main__':
    consumer_thread = threading.Thread(target=VectorConsumer.start_consuming)
    consumer_thread.start()
    app.run(host='0.0.0.0', port=Config.port)