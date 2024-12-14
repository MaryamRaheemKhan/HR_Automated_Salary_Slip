import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    JWT_SECRET = os.getenv("JWT_SECRET")
    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
    SMTP_SERVER = os.getenv("SMTP_SERVER")
    SMTP_PORT = os.getenv("SMTP_PORT")
    UPLOAD_FOLDER = "uploads"
    PDF_FOLDER = "pdfs"
    CORS_ORIGIN = os.getenv("CORS_ORIGIN")
