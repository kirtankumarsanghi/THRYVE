from pydantic import BaseModel
from typing import Literal


class RegisterSchema(BaseModel):
    full_name: str
    email: str
    password: str
    role: str
    department: str


class LoginSchema(BaseModel):
    email: str
    password: str


class DemoLoginSchema(BaseModel):
    role: Literal["employee", "manager", "admin"]
