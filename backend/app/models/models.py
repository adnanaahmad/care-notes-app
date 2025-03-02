from pydantic import BaseModel
from datetime import datetime

class BaseCareNote(BaseModel):
    residentName: str
    content: str
    authorName: str

class CareNote(BaseCareNote):
    id: int
    dateTime: datetime

class CareNoteRequest(BaseCareNote):
    pass