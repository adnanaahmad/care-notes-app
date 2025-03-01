from typing import Generic, TypeVar, Optional, List
from pydantic.generics import GenericModel

T = TypeVar("T")

class StandardResponse(GenericModel, Generic[T]):
    status: bool = True
    message: str = "Success"
    data: Optional[T] = None
    errors: Optional[List[str]] = None
    meta: Optional[dict] = None

    class Config:
        arbitrary_types_allowed = True 