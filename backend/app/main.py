from .config.standard_response import StandardResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .services.care_note_service import CareNoteService
from .models.models import CareNoteRequest

app = FastAPI()
# Configure CORS to allow requests from the frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allowed origin for CORS
    allow_credentials=True,                  # Allow sending cookies in CORS requests
    allow_methods=["*"],                     # Allow all HTTP methods for CORS
    allow_headers=["*"],                     # Allow all headers for CORS
)

@app.get("/api/care-notes")
def get_care_notes():
    """
    Endpoint to retrieve all care notes.
    Returns a list of care notes.
    """
    try:
        care_notes = CareNoteService.get_all_care_notes()
        return StandardResponse(data=[note.dict() for note in care_notes])
    except Exception as e:
        return StandardResponse(status=False, message="Failed to get care notes", errors=[str(e)])

@app.post("/api/care-notes")
def create_care_note(note: CareNoteRequest):
    """
    Endpoint to create a new care note.
    Accepts a CareNoteRequest model and returns the created care note.
    """
    try:
        new_note = CareNoteService.create_care_note(note)
        return StandardResponse(data=new_note.dict())
    except Exception as e:
        return StandardResponse(status=False, message="Failed to create care note", errors=[str(e)])
