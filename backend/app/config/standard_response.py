from typing import Generic, TypeVar, Optional, List
from pydantic import BaseModel

T = TypeVar("T")

class StandardResponse(BaseModel, Generic[T]):
    status: bool = True
    message: str = "Success"
    data: Optional[T] = None
    errors: Optional[List[str]] = None
    meta: Optional[dict] = None

    class Config:
        arbitrary_types_allowed = True 