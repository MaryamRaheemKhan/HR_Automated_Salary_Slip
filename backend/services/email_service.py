import smtplib  # Importing the smtplib module to send emails
from email.mime.text import MIMEText  # Importing MIMEText to create email text content
from email.mime.multipart import MIMEMultipart  # Importing MIMEMultipart to handle multipart emails (e.g., text + attachments)
from email.mime.base import MIMEBase  # Importing MIMEBase for handling attachments
from email import encoders  # Importing encoders to encode attachment in base64
from config import Config  # Importing configuration details (like email address and password) from config file

def send_email(recipient_email, subject, body, attachment_path=None):
    """
    Sends an email with optional attachment.

    Parameters:
    recipient_email (str): The recipient's email address.
    subject (str): Subject of the email.
    body (str): Body of the email (plain text).
    attachment_path (str): Path to the file to be attached (optional).
    """
    
    # Fetching sender email and password from configuration
    sender_password = Config.EMAIL_PASSWORD  # Password or API key for the email account
    sender_email = Config.EMAIL_ADDRESS  # Email address of the sender

    # Create an instance of MIMEMultipart, which will hold all parts of the email (e.g., body and attachments)
    msg = MIMEMultipart()
    msg['from'] = sender_email  # Setting sender email
    msg['to'] = recipient_email  # Setting recipient email
    msg['subject'] = subject  # Setting subject of the email

    # Adding the body of the email (plain text format)
    msg.attach(MIMEText(body, 'plain'))

    # Check if there is an attachment
    if attachment_path:
        # Open the file in binary read mode
        with open(attachment_path, "rb") as attachment:
            # Create a MIMEBase instance to represent the attachment
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())  # Reading the attachment data into the payload
        # Encode the attachment into base64 to send over email
        encoders.encode_base64(part)
        # Add header to specify that this part is an attachment, with the filename
        part.add_header('Content-Disposition', f'attachment; filename={attachment_path.split("/")[-1]}')
        msg.attach(part)  # Attach the part to the email message

    # Setup the SMTP server connection
    with smtplib.SMTP(Config.SMTP_SERVER, Config.SMTP_PORT) as server:
        server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
        server.login("apikey", sender_password)  # Log in to the SMTP server with the API key as the password
        # Send the email by passing the sender, recipient, and the email content (msg.as_string() converts the email to a string)
        server.sendmail(sender_email, recipient_email, msg.as_string())
