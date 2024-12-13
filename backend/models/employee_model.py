from utils.db import mongo

# MongoDB collection schema for employees
employee_schema = {
    "name": str,
    "employee_id": str,
    "gender": str,
    "designation": str,
    # "department":str,
    "position": str,
    "date_of_joining": str,
    "employee_status": str,
    "working_tenure": float,
    "allowances": float,
    "deductions": float,
    "basic_salary": float,
    "net_salary": float,
    "company_date": str,
    "email":str
}


# Insert a new employee
def insert_employee(employee_data):
    mongo.db.employees.insert_one(employee_data)


# Fetch all employees
def get_all_employees():
    employees = mongo.db.employees.find()
    # Adjust fields fetched to match the updated schema
    return [
        {
            "employee_id": emp.get("employee_id"),
            "name": emp.get("name"),
            "gender": emp.get("gender"),
            "designation": emp.get("designation"),
            "position": emp.get("position"),
            "date_of_joining": emp.get("date_of_joining"),
            "employee_status": emp.get("employee_status"),
            "working_tenure": emp.get("working_tenure"),
            "allowances": emp.get("allowances"),
            "deductions": emp.get("deductions"),
            "basic_salary": emp.get("basic_salary"),
            "net_salary": emp.get("net_salary"),
            "company_date": emp.get("company_date"),
            "email":emp.get("email")
        }
        for emp in employees
    ]
