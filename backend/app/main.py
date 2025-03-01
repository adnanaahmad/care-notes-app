from .config.standard_response import StandardResponse
from fastapi import FastAPI
from .services.care_note_service import CareNoteService
from .models.models import CareNoteRequest

app = FastAPI()

@app.get("/api/care-notes")
def get_care_notes():
    try:
        care_notes = CareNoteService.get_all_care_notes()
        return StandardResponse(data=[note.dict() for note in care_notes])
    except Exception as e:
        return StandardResponse(status=False, message="Failed to get care notes", errors=[str(e)])

@app.post("/api/care-notes")
def create_care_note(note: CareNoteRequest):
    try:
        new_note = CareNoteService.create_care_note(note)
        return StandardResponse(data=new_note.dict())

    except Exception as e:
        return StandardResponse(status=False, message="Failed to create care note", errors=[str(e)])
