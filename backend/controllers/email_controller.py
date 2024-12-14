from flask import Blueprint, request, jsonify
from services.email_service import send_email
import os

email_bp = Blueprint('email', __name__)

PDF_FOLDER = os.path.join(os.getcwd(), 'pdfs')

@email_bp.route('/send', methods=['POST'])
def send_bulk_emails():
    data = request.json

    # Ensure the request contains emailData
    if "emailData" not in data or not isinstance(data["emailData"], list):
        return jsonify({"message": "Invalid or missing email data"}), 400

    email_data_list = data["emailData"]
    print("The email data list is", email_data_list)

    # Check if the email_data_list is empty
    if not email_data_list:
        return jsonify({"message": "No email data provided"}), 400

    results = []
    # Ensure you properly format the attachment path
    for email_data in email_data_list:
        try:
            # Extract employee name and format it
            employee_name = email_data['employee_name']
            
            # Construct the attachment path
            attachment_path = os.path.join(PDF_FOLDER, f"{employee_name}_salary_slip.pdf")
            
            # Standardize the path to avoid backslash issues on different OS
            attachment_path = os.path.normpath(attachment_path)

            # Debugging: print the constructed path
            print(f"Attachment path for {employee_name}: {attachment_path}")

            # Check if the PDF file exists
            if not os.path.exists(attachment_path):
                raise FileNotFoundError(f"PDF for employee {employee_name} not found at path: {attachment_path}")

       
            send_email(
            recipient_email=email_data["to"],    # Correct keyword: 'to' should map to 'recipient_email'
            subject=email_data["subject"],
            body=email_data["body"],
            attachment_path=attachment_path
             )
            results.append({"to": email_data["to"], "status": "success"})

        except Exception as e:
            results.append({"to": email_data.get("to", "Unknown"), "status": "failed", "error": str(e)})
            print(f"Error sending email to {email_data.get('to', 'Unknown')}: {str(e)}")

    return jsonify({"results": results}), 200
