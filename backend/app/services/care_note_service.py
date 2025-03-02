from typing import List
from app.models.models import CareNote, CareNoteRequest
from app.config.mock_db import mock_db as db

class CareNoteService:
    """
    Service class for handling care note operations.
    """
    @staticmethod
    def get_all_care_notes() -> List[CareNote]:
        """
        Retrieves all care notes from the database.

        Returns:
            List[CareNote]: A list of all care notes.
        """
        return db

    @staticmethod
    def create_care_note(note_request: CareNoteRequest) -> CareNote:
        """
        Creates a new care note and adds it to the database.

        Args:
            note_request (CareNoteRequest): The request object containing care note details.

        Returns:
            CareNote: The newly created care note.
        """
        # Generate a new ID (last note's ID + 1 or 1 if empty)
        new_id = db[-1].id + 1 if db else 1
        # Create a new CareNote with the generated ID
        new_note = CareNote(
            id=new_id,
            residentName=note_request.residentName,
            dateTime=note_request.dateTime,
            content=note_request.content,
            authorName=note_request.authorName
        )

        db.append(new_note)
        return new_note