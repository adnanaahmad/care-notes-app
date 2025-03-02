from pydantic import BaseModel
from datetime import datetime

class BaseCareNote(BaseModel):
    residentName: str
    content: str
    authorName: str
    dateTime: datetime

class CareNote(BaseCareNote):
    id: int
class CareNoteRequest(BaseCareNote):
    pass