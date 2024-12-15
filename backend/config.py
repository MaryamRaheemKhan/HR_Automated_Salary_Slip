import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    # MongoDB URI for connecting to the database
    MONGO_URI = os.getenv("MONGO_URI")
    
    # Secret key for encoding and decoding JWT tokens
    JWT_SECRET = os.getenv("JWT_SECRET")
    
    # Email credentials for sending emails (e.g., password, address)
    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
    
    # SMTP server configuration for email sending
    SMTP_SERVER = os.getenv("SMTP_SERVER")
    SMTP_PORT = os.getenv("SMTP_PORT")
    
    # Folder names for file uploads and PDF storage
    UPLOAD_FOLDER = "uploads"
    PDF_FOLDER = "pdfs"
    
    # Allowed origin(s) for CORS (Cross-Origin Resource Sharing)
    CORS_ORIGIN = os.getenv("CORS_ORIGIN")
