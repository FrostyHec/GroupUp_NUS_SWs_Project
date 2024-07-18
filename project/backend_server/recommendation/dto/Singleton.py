from concurrent.futures import ThreadPoolExecutor

from algorithm.Recommender import Recommender
from config.Config import Config


class Singleton:
    recommender = Recommender()