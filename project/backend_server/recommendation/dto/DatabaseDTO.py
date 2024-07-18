from sqlalchemy import Column, BigInteger
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class GroupTable(Base):
    __tablename__ = 'group_table'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    survey_id = Column(BigInteger)

class GroupMember(Base):
    __tablename__ = 'group_member'
    group_id = Column(BigInteger, primary_key=True, autoincrement=False)
    member_id = Column(BigInteger)