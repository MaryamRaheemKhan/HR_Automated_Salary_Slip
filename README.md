# HR Salary Slip Portal

## Overview

The HR Salary Slip Portal is a web-based dashboard that enables HR personnel to efficiently manage salary slip generation and distribution. With features like Excel file parsing, PDF generation, email distribution, and detailed logging, this portal streamlines the payroll process and ensures accuracy.

## Features

- Parse Excel files to extract salary information.
- Generate salary slips in PDF format for each employee.
- Send generated PDFs to employees via email.
- Log all incoming requests using a dynamic logging mechanism.
- Backend powered by Flask for API synchronization.

---

## Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (version 16 or above)
- MongoDB (for storing logs and employee data)
- npm or yarn (for dependency management)
- A valid SMTP configuration for email services
- Flask backend

### Installation Steps

1. Clone the repository:

   	```
   	git clone https://github.com/MaryamRaheemKhan/UnikrewApp.git
	```
2. Navigate to the project directory:

   ```
   cd UnikrewApp
   ```
3. Install dependencies:

   ```
   npm install
   ```
   Or, if using yarn:

   ```
   yarn install
   ```
4. Set up the Flask backend:

   Navigate to the backend directory
   

   Install Flask and required libraries:

   ```
   pip install -r requirements.txt
   ```
   

   Run the Flask server:

   ```
   python app.py
   ```

5. Create a .env file in the root directory and configure the following environment variables:

   	env
   	EMAIL_ADDRESS=unikrewapp@outlook.com
	SMTP_USERNAME=apikey
	EMAIL_PASSWORD=password
	SMTP_SERVER=smtp.sendgrid.net
	SMTP_PORT=587
	MONGO_URI=mongodburi
	JWT_SECRET=jwtsecret
	CORS_ORIGIN=http://localhost:3000
   

6. Start the development server:

   ```
   npm start
   ```

   Or, for production:

   ```
   npm run build
   npm run serve
   ```

7. Access the portal at http://localhost:4000.

---

## API Documentation

### Endpoints

#### 1. Upload Excel File

*POST* /api/upload

- *Description:* Parses an uploaded Excel file to extract employee salary data.
- *Request:*
  - Content-Type: multipart/form-data
  - Body: file (Excel file)
- *Response:*
  json
  {
    "status": "success",
    "message": "File uploaded and parsed successfully",
    "parsedData": [
      { "Name": "John Doe", "salary": 5000 },
      { "Name": "Jane Smith", "salary": 7000 }
    ]
  }
  

#### 2. Generate Salary Slips

*POST* /api/generate-pdfs

- *Description:* Generates PDF salary slips for all employees parsed from the Excel file.
- *Request:*
  - Body: employeeData (Array of employee details)
- *Response:*
  json
  {
    "status": "success",
    "message": "PDFs generated successfully",
    "pdfLinks": [
      "https://portal.example.com/pdfs/john-doe.pdf",
      "https://portal.example.com/pdfs/jane-smith.pdf"
    ]
  }
  

#### 3. Send Emails

*POST* /api/send-emails

- *Description:* Sends generated PDFs to employees via email.
- *Request:*
  - Body: emailData (Array of employee emails and corresponding PDF links)
- *Response:*
  json
  {
    "status": "success",
    "message": "Emails sent successfully",
    "emailStatuses": [
      { "email": "john.doe@example.com", "status": "sent" },
      { "email": "jane.smith@example.com", "status": "sent" }
    ]
  }
  

#### 4. Internal Logging Process

- *Description:* The application logs all incoming requests dynamically using the @app.before_request decorator in the Flask backend.
- *Details:*
  - The log_request function inspects the request.endpoint and determines the action type.
  - Example actions logged:
    - "New User Registration" for user registration routes.
    - "File Upload" for file upload routes.
  - Logs include details such as the request type, URL, and action performed.
- *Usage:* Logs are stored internally for tracking and troubleshooting. They can be extended for external monitoring if needed.

---

## Usage Guide

### Uploading an Excel File

1. Navigate to the "Upload" section of the dashboard.
2. Click on the "Choose File" button and select the Excel file containing employee salary information.
3. Click "Upload" to parse the file.

### Generating Salary Slips

1. After uploading the file, navigate to the "Generate Salary Slips" section.
2. Click the "Generate PDFs" button.
3. Download links for the generated PDFs will be displayed.

### Sending Emails

1. Navigate to the "Email Distribution" section.
2. Click the "Send Emails" button to distribute the generated PDFs to employees.
3. Check the email status logs for delivery confirmation.

---

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements or fixes.