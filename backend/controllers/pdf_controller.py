import os
from flask import Blueprint,send_from_directory, request, jsonify

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from utils.auth_middleware import token_required

pdf_bp = Blueprint('pdf', __name__)
PDF_DIRECTORY = "pdfs"

HR_MANAGER = {
    "name": "Sarah Johnson",
    "designation": "HR Manager",
    "department": "Head of Human Resources",
}
FINANCE_DIRECTOR = {
    "name": "Michael Anderson",
    "designation": "Finance Director",
    "department": "Director of Finance",
}

@pdf_bp.route('/generate', methods=['POST'])
@token_required
def generate_pdf():
    # Extract data from the request
    data = request.json.get('data', [])
    if not data or not isinstance(data, list):
        return jsonify({"error": "No valid employee data provided"}), 400

    # Create a directory to store PDFs
    output_folder = "pdfs"
    os.makedirs(output_folder, exist_ok=True)

    pdf_files_with_ids = []

    try:
        for idx, employee in enumerate(data):
            # Validate employee data
            required_fields = [
                "Name", "EmployeeID", "Designation", "DateofJoining", 
                "BasicSalary", "Allowances", "Deductions"
            ]

            # Check required fields in employee data
            for field in required_fields:
                if field not in employee:
                    return jsonify({"error": f"Missing required field: {field} in employee #{idx + 1}"}), 400

            # Calculate net salary
            try:
                net_salary = (
                    employee["BasicSalary"] + employee["Allowances"] - employee["Deductions"]
                )
            except TypeError:
                return jsonify({"error": f"Salary fields must be numeric in employee #{idx + 1}"}), 400

            # Generate unique PDF for each employee
            pdf_path = os.path.join(output_folder, f"{employee['Name']}_salary_slip.pdf")
            pdf_files_with_ids.append({
                "employeeID": employee["EmployeeID"],
                "pdfPath": pdf_path
            })

            # Generate PDF using ReportLab
            c = canvas.Canvas(pdf_path, pagesize=letter)

            # Header Section
            c.setFont("Helvetica-Bold", 16)
            c.drawCentredString(300, 770, "UNIKREW SOLUTIONS")
            c.setFont("Helvetica", 12)
            c.drawCentredString(300, 755, f"Salary Slip - {employee.get('Date', 'N/A')}")

            # Employee Details Section
            c.setFont("Helvetica-Bold", 12)
            c.drawString(50, 710, "Employee Details")
            c.setFont("Helvetica", 10)
            details = [
                f"Employee ID: {employee['EmployeeID']}",
                f"Name: {employee['Name']}",
                f"Designation: {employee['Designation']}",
                f"Date of Joining: {employee['DateofJoining']}",
            ]
            y_position = 690
            for detail in details:
                c.drawString(50, y_position, detail)
                y_position -= 15

            # Salary Breakdown Section
            y_position -= 20
            c.setFont("Helvetica-Bold", 12)
            c.drawString(50, y_position, "Salary Details")
            c.setFont("Helvetica", 10)
            salary_details = [
                f"Basic Salary: {employee['BasicSalary']}",
                f"Allowances: {employee['Allowances']}",
                f"Deductions: {employee['Deductions']}",
                f"Net Salary: {net_salary}",
            ]
            y_position -= 15
            for detail in salary_details:
                c.drawString(50, y_position, detail)
                y_position -= 15

            # Footer Section with Signatures
            c.setFont("Helvetica", 8)
            c.drawString(50, 150, "_________________________________________")
            c.drawString(50, 135, f"{HR_MANAGER['name']} - {HR_MANAGER['designation']}")
            c.drawString(50, 120, HR_MANAGER['department'])

            c.drawString(350, 150, "_________________________________________")
            c.drawString(350, 135, f"{FINANCE_DIRECTOR['name']} - {FINANCE_DIRECTOR['designation']}")
            c.drawString(350, 120, FINANCE_DIRECTOR['department'])

            c.save()

        # Return both file paths and associated user IDs
        
        return jsonify({
            "message": "PDFs generated successfully",
            "files": pdf_files_with_ids
        }), 201

    except Exception as e:
        return jsonify({"error": "Failed to generate PDFs", "details": str(e)}), 500

@pdf_bp.route('/pdfs/<filename>', methods=['GET'])
def get_pdf(filename):
    try:
        # Safely serve the file from the "pdfs" folder
        file_path = os.path.join(PDF_DIRECTORY, filename)
        print("The filename is",filename)
        if os.path.exists(file_path):
            return send_from_directory(PDF_DIRECTORY, filename, as_attachment=True, mimetype='application/pdf')
        else:
            return jsonify({"error": "PDF file not found"}), 404
    except Exception as e:
        return jsonify({"error": f"Failed to fetch the PDF: {str(e)}"}), 500