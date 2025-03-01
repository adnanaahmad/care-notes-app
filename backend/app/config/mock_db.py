from datetime import datetime
from app.models.models import CareNote  # Updated import path

mock_db = [
    CareNote(
        id=1,
        residentName="Alice Johnson",
        dateTime=datetime(2024, 8, 15, 9, 30),
        content="Administered morning medication.",
        authorName="Nurse Smith"
    ),
    CareNote(
        id=2,
        residentName="Bob Williams",
        dateTime=datetime(2024, 9, 17, 11, 45),
        content="Assisted with physical therapy exercises.",
        authorName="Dr. Brown"
    ),
    CareNote(
        id=3,
        residentName="Charlie Davis",
        dateTime=datetime(2024, 7, 20, 14, 15),
        content="Monitored blood pressure and vitals.",
        authorName="Nurse Johnson"
    )
]