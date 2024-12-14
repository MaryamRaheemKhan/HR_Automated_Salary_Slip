from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from utils.db import mongo
from controllers import auth_controller, employee_controller, pdf_controller, email_controller
from utils.logger import log_action
import os
from dotenv import load_dotenv
from config import Config
PDF_FOLDER = "pdfs"
load_dotenv()

app = Flask(__name__)
app.config.from_object('config.Config')

# Enable CORS
CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGIN}})

# Initialize MongoDB
mongo.init_app(app)

@app.before_request
def log_request():
    # Log information for all incoming requests, modify this depending on specific routes
    action_type = "Unknown"
    if request.endpoint == 'auth_controller.register':  # Example for register route
        action_type = "New User Registration"
    elif request.endpoint == 'pdf_controller.upload':  # Example for file upload route
        action_type = "File Upload"
    
    log_action(action_type, f"Request details: {request.method} {request.url}")

@app.route('/pdfs/<filename>')
def serve_pdf(filename):
    try:
        print(f"Serving PDF: {filename}")  # Add this log for debugging
        return send_from_directory(PDF_FOLDER, filename)
    except FileNotFoundError:
        print(f"File not found: {filename}")  # Add this log for debugging
        return "File not found", 404

# Register Blueprints
app.register_blueprint(auth_controller.auth_bp, url_prefix='/api/auth')
app.register_blueprint(employee_controller.employee_bp, url_prefix='/api/employees')
app.register_blueprint(pdf_controller.pdf_bp, url_prefix='/api/pdf')
app.register_blueprint(email_controller.email_bp, url_prefix='/api/email')

@app.route('/test_db')
def test_db():
    try:
        collections = mongo.db.list_collection_names()  # List all collections in the database
        return jsonify({"message": "MongoDB is connected!", "collections": collections}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/employees', methods=['GET'])
def get_employees():
    try:
        employees = list(mongo.db.employees.find({}, {"_id": 0}))  # Fetch all employees and exclude `_id`
        return jsonify({"employees": employees}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch employees: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)

