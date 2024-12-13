from flask import Blueprint, request, jsonify
from models.employee_model import insert_employee
import os
import pandas as pd
from werkzeug.utils import secure_filename
from utils.auth_middleware import token_required
# Configure the upload folder and allowed file extensions
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"xls", "xlsx"}

# Create the upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

employee_bp = Blueprint('employees', __name__)

# Expected fields for an employee entry
required_employee_fields = [
    "Name", "EmployeeID", "Gender", "Designation", "Position",
    "Date Of Joining", "Employee Status", "Working Tenure", "Allowances",
    "Deductions", "Basic Salary", "Net Salary", "Date", "Email"
]

# Helper function to check if file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to add an employee
@employee_bp.route('/add', methods=['POST'])
@token_required  # Apply the decorator to protect the route
def add_employee():
    data = request.json

    # Validate required fields
    missing_fields = [field for field in required_employee_fields if field not in data]
    if missing_fields:
        return jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        insert_employee(data)
        return jsonify({"message": "Employee added successfully!"}), 201
    except Exception as e:
        return jsonify({"message": "Failed to add employee", "error": str(e)}), 500


@employee_bp.route('/upload', methods=['POST'])
@token_required
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Please upload an Excel file."}), 400

    # Secure and save the file
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    try:
        # Parse the Excel file
        df = pd.read_excel(file_path, engine='openpyxl')
        # print("Parsed Data:", df.head())  # Debugging line
        df.columns = df.columns.str.strip()  # Remove leading/trailing spaces
        employee_data = df.to_dict(orient='records')
        
        # print("Employee Data:", employee_data)  # Debugging line
        print("Column Headers:", df.columns.tolist())
        for employee in employee_data:
             print(f"Working Tenure value: {employee.get('Working Tenure')}")
             missing_fields = [field for field in required_employee_fields if not employee.get(field)]
        if missing_fields:
             print(f"Missing fields: {missing_fields}")
             
        employee_record = {
                "employee_id": employee.get("Employee ID"),
                "name": employee.get("Name"),
                "email": employee.get("Email"),
                "gender": employee.get("Gender"),
                "designation": employee.get("Designation"),
                "position": employee.get("Position"),
                "date_of_joining": employee.get("Date Of Joining"),
                "employee_status": employee.get("Employee Status"),
                "working_tenure": employee.get("Working Tenure"),
                "allowances": employee.get("Allowances"),
                "deductions": employee.get("Deductions"),
                "basic_salary": employee.get("Basic Salary"),
                "net_salary": employee.get("Net Salary"),
                "company_date": employee.get("Date"),
            }

            # Insert the employee record into MongoDB
        insert_employee(employee_record)
        print(employee_record)

        return jsonify({"message": "File uploaded and employee data stored successfully","data": employee_data}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to parse or save file: {str(e)}"}), 500
