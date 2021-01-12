from pydantic import BaseModel, Field
from pymongo import MongoClient
from bson import ObjectId
from typing import Optional, List
import os

client = MongoClient(f"mongodb+srv://{os.environ['DB_USER']}:{os.environ['DB_PWD']}@clustertorre.vhroj.mongodb.net/torre?retryWrites=true&w=majority")
db = client.torre


class PyObjectId(ObjectId):

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectid')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')

class Skill(BaseModel):
    name: str

class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id')
    name: str
    username: str
    verified: bool
    match_index: float
    picture: Optional[str]
    professionalHeadline: Optional[str]
    skills: List[Skill]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }

class Opportunity(BaseModel):
    id: str
    objective: str
    skills: List[Skill]