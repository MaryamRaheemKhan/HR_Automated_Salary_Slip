# from fpdf import FPDF
# import os
# from config import Config

# def generate_salary_slip(employee_data, salary_details):
#     # Check if all required fields exist in the employee data
#     required_fields = ["Name", "EmployeeID", "Designation"]
#     for field in required_fields:
#         if field not in employee_data:
#             raise ValueError(f"Missing required employee field: {field}")
    
#     # Check if salary_details contains the necessary fields
#     salary_fields = ["basic", "allowances", "deductions"]
#     for field in salary_fields:
#         if field not in salary_details:
#             raise ValueError(f"Missing required salary field: {field}")

#     # Calculate the net salary
#     net_salary = salary_details["basic"] + salary_details["allowances"] - salary_details["deductions"]

#     # Create the PDF
#     pdf = FPDF()
#     pdf.add_page()
#     pdf.set_font("Arial", size=12)

#     # Title
#     pdf.set_font("Arial", style='B', size=16)
#     pdf.cell(200, 10, txt="Salary Slip", ln=True, align='C')

#     # Employee details
#     pdf.set_font("Arial", size=12)
#     pdf.cell(200, 10, txt=f"Employee ID: {employee_data['employee_id']}", ln=True)
#     pdf.cell(200, 10, txt=f"Employee Name: {employee_data['name']}", ln=True)
#     # pdf.cell(200, 10, txt=f"Department: {employee_data['department']}", ln=True)
#     pdf.cell(200, 10, txt=f"Designation: {employee_data['designation']}", ln=True)

#     # Salary Breakdown
#     pdf.cell(200, 10, txt="Salary Breakdown:", ln=True)
#     pdf.cell(200, 10, txt=f"Basic Salary: {salary_details['basic']}", ln=True)
#     pdf.cell(200, 10, txt=f"Allowances: {salary_details['allowances']}", ln=True)
#     pdf.cell(200, 10, txt=f"Deductions: {salary_details['deductions']}", ln=True)
#     pdf.cell(200, 10, txt=f"Net Salary: {net_salary}", ln=True)

#     # Amount in Words
#     pdf.cell(200, 10, txt=f"Amount in Words: {employee_data['amount_in_words']}", ln=True)

#     # Footer Section (Signatures)
#     pdf.cell(200, 10, txt=f"HR Manager: {employee_data['hr_manager']}", ln=True)
#     pdf.cell(200, 10, txt=f"Finance Director: {employee_data['finance_director']}", ln=True)

#     # Save PDF
#     pdf_folder = Config.PDF_FOLDER
#     if not os.path.exists(pdf_folder):
#         os.makedirs(pdf_folder)
    
#     pdf_path = os.path.join(pdf_folder, f"{employee_data['employee_id']}_salary_slip.pdf")
#     pdf.output(pdf_path)

#     return pdf_path





