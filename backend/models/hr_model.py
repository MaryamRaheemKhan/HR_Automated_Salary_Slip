from utils.db import mongo

hr_schema = {
    "username": str,
    "password": str,  # Encrypted
    "email":str,
}

def add_hr(hr_data):
    mongo.db.hr.insert_one(hr_data)

def find_hr_by_email(email):
    return mongo.db.hr.find_one({"email": email})
