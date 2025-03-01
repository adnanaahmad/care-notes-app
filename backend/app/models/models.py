from pydantic import BaseModel
from datetime import datetime

class BaseCareNote(BaseModel):
    residentName: str
    dateTime: datetime
    content: str
    authorName: str

class CareNote(BaseCareNote):
    id: int

class CareNoteRequest(BaseCareNote):
    pass