from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "thryve_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256", "bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    # Pin to pbkdf2_sha256 to avoid bcrypt backend/runtime issues.
    return pwd_context.hash(password, scheme="pbkdf2_sha256")


def verify_password(
    plain_password,
    hashed_password
):
    try:
        return pwd_context.verify(
            plain_password,
            hashed_password
        )
    except Exception:
        # Never let password backend issues crash login flow.
        return False


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
