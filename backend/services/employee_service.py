# services/employee_service.py
from utils.db import mongo

# Fetch employee by ID
def get_employee_by_id(employee_id):
    """
    Fetch an employee by their employee_id.

    Args:
    - employee_id (str): The ID of the employee.

    Returns:
    - dict: The employee's details, or None if not found.
    """
    employee = mongo.db.employees.find_one({"employee_id": employee_id})  # Find one employee by ID
    if employee:
        return {
            "employee_id": employee.get("employee_id"),
            "name": employee.get("name"),
            "gender": employee.get("gender"),
            "designation": employee.get("designation"),
            "position": employee.get("position"),
            "date_of_joining": employee.get("date_of_joining"),
            # "department": employee.get("department"),
            "employee_status": employee.get("employee_status"),
            "working_tenure": employee.get("working_tenure"),
            "allowances": employee.get("allowances"),
            "deductions": employee.get("deductions"),
            "basic_salary": employee.get("basic_salary"),
            "net_salary": employee.get("net_salary"),
            "company_date": employee.get("company_date"),
            "email": employee.get("email")
        }
    return None
