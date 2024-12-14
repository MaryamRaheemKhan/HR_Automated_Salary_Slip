from flask import Blueprint, request, jsonify
import bcrypt
import jwt
import datetime
from config import Config  # Ensure that Config is properly set up
from models.hr_model import add_hr, find_hr_by_email

auth_bp = Blueprint('auth', __name__)

# Register Route
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json

        # Ensure all required fields are provided
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({"error": "Missing fields"}), 400

        
        # Hash the password before storing it
        password = data['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        hr_data = {
            "username": data['username'],
            "email": data['email'],
            "password": hashed_password.decode('utf-8')  # Store the hashed password
        }
        
        # Add HR data to database
        add_hr(hr_data)
        return jsonify({"message": "HR registered successfully!"}), 201

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400


# Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        print(f"Received login data: {data}")  # Debugging log

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Username and password are required!"}), 400

        # Find the user from the database
        hr = find_hr_by_email(username)
        if not hr:
            return jsonify({"message": "Invalid credentials (user not found)!"}), 401

        # Get the hashed password from the database
        stored_hashed_password = hr.get('password')
        if not stored_hashed_password:
            return jsonify({"message": "No password found for this user!"}), 400
        
        # Compare the provided password with the hashed password in the database
        if not bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
            return jsonify({"message": "Invalid credentials (password mismatch)!"}), 401

        # Ensure that the JWT secret is loaded from the environment
        if not hasattr(Config, 'JWT_SECRET') or not Config.JWT_SECRET:
            raise ValueError("JWT_SECRET not found in configuration.")

        # Generate JWT token
        token = jwt.encode(
            {'username': hr['username'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
            Config.JWT_SECRET, algorithm="HS256"
        )

        return jsonify({"token": token}), 200

    except Exception as e:
        print(f"Error occurred in login: {str(e)}")  # Log for debugging
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400
