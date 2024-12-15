from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from utils.db import mongo
from controllers import auth_controller, employee_controller, pdf_controller, email_controller
from utils.logger import log_action
import os
from dotenv import load_dotenv
from config import Config

# Set the folder to store PDFs
PDF_FOLDER = "pdfs"
# Load environment variables from a .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)
# Configure the app using settings from the Config class
app.config.from_object('config.Config')

# Enable CORS (Cross-Origin Resource Sharing) for all routes
CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGIN}})

# Initialize the MongoDB connection
mongo.init_app(app)

@app.before_request
def log_request():
    """
    Logs the details of incoming requests.
    Modifies the action type based on the route being accessed.
    """
    action_type = "Unknown"
    # Example: If the request is for the registration route, log it as "New User Registration"
    if request.endpoint == 'auth_controller.register':  
        action_type = "New User Registration"
    # Example: If the request is for the file upload route, log it as "File Upload"
    elif request.endpoint == 'pdf_controller.upload':
        action_type = "File Upload"
    
    # Log the action details
    log_action(action_type, f"Request details: {request.method} {request.url}")

@app.route('/pdfs/<filename>')
def serve_pdf(filename):
    """
    Route to serve PDF files from the 'pdfs' folder.
    If the file is not found, return a 404 error.
    """
    try:
        print(f"Serving PDF: {filename}")  # Debugging log
        # Serve the requested PDF file from the specified directory
        return send_from_directory(PDF_FOLDER, filename)
    except FileNotFoundError:
        print(f"File not found: {filename}")  # Debugging log
        # Return 404 if the file doesn't exist
        return "File not found", 404

# Register Blueprints for different sections of the app
# These blueprints group related routes for authentication, employee management, PDF generation, and email functionality
app.register_blueprint(auth_controller.auth_bp, url_prefix='/api/auth')
app.register_blueprint(employee_controller.employee_bp, url_prefix='/api/employees')
app.register_blueprint(pdf_controller.pdf_bp, url_prefix='/api/pdf')
app.register_blueprint(email_controller.email_bp, url_prefix='/api/email')

@app.route('/test_db')
def test_db():
    """
    Test route to check the MongoDB connection.
    Lists all collections in the MongoDB database to confirm the connection is active.
    """
    try:
        collections = mongo.db.list_collection_names()  # List all collections in the database
        # Return the list of collections with a success message
        return jsonify({"message": "MongoDB is connected!", "collections": collections}), 200
    except Exception as e:
        # Return an error message if there is an issue connecting to MongoDB
        return jsonify({"error": str(e)}), 500

@app.route('/employees', methods=['GET'])
def get_employees():
    """
    Fetch and return a list of all employees from the database.
    Excludes the MongoDB '_id' field from the response.
    """
    try:
        # Fetch all employees from the database, excluding the '_id' field
        employees = list(mongo.db.employees.find({}, {"_id": 0}))
        # Return the list of employees in JSON format
        return jsonify({"employees": employees}), 200
    except Exception as e:
        # Return an error message if the fetch fails
        return jsonify({"error": f"Failed to fetch employees: {str(e)}"}), 500

# Run the app on port 5000 in debug mode
if __name__ == "__main__":
    app.run(debug=True, port=5000)
