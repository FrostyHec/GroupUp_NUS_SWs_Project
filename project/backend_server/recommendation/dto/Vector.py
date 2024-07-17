import numpy
class Vector:
    def __init__(self, shape: tuple, vector: numpy.ndarray):
        self.shape = shape # This usually a tuple of (number of questions, number of features)
        self.vector = vector # This is usually a numpy array of shape (number of questions, number of features)
