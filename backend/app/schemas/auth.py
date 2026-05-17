from pydantic import BaseModel


class RegisterSchema(BaseModel):
    full_name: str
    email: str
    password: str
    role: str
    department: str


class LoginSchema(BaseModel):
    email: str
    password: str