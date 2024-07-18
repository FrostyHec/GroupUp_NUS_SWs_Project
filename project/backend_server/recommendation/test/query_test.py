import time

from mapper.DatabaseMapper import DatabaseMapper
from service.VectorService import VectorService


def test1():
    res = DatabaseMapper.get_query_and_survey(1)
    print(res)

def test2():
    t1 = time.time()
    res = VectorService.fetch_vectors(10,[7])
    print("time consumed:",time.time()-t1)
    print(res)

if __name__ == "__main__":
    test2()