import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from config import Config

def send_email(recipient_email, subject, body, attachment_path=None, from_address="unikrewcompany@gmail.com"):
    # sender_email = from_address.split("<")[1].replace(">", "").strip()  # Extract email part if `from_address` has name
    sender_password = Config.EMAIL_PASSWORD
    sender_email=Config.EMAIL_ADDRESS

    # Email setup
    msg = MIMEMultipart()
    msg['from'] = from_address  # Full "Company Name <email@domain.com>" format
    msg['to'] = recipient_email
    msg['subject'] = subject

    # Body
    msg.attach(MIMEText(body, 'plain'))

    # Attachment
    if attachment_path:
        with open(attachment_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename={attachment_path.split("/")[-1]}')
        msg.attach(part)

    # Send email
    # with smtplib.SMTP(Config.SMTP_SERVER, Config.SMTP_PORT) as server:
    #     server.starttls()
    #     server.login(sender_email, sender_password)
    #     server.sendmail(from_address, recipient_email, msg.as_string())
    with smtplib.SMTP('142.251.173.108', 587) as server:  # Use the IPv4 address directly
          server.starttls()
          server.login(sender_email, sender_password)
          server.sendmail(from_address, recipient_email, msg.as_string())