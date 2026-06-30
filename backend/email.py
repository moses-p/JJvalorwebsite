import os
import aiosmtplib
from email.message import EmailMessage
from typing import Optional

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER)


async def send_email(
    to: str,
    subject: str,
    body: str,
    html_body: Optional[str] = None,
) -> bool:
    """Send an email using SMTP."""
    if not all([SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD]):
        print("SMTP credentials not configured")
        return False

    try:
        message = EmailMessage()
        message["From"] = SMTP_FROM
        message["To"] = to
        message["Subject"] = subject

        message.set_content(body)
        if html_body:
            message.add_alternative(html_body, subtype="html")

        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            start_tls=True,
        )
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False


async def send_contact_notification(
    name: str,
    email: str,
    subject: str,
    message: str,
) -> bool:
    """Send notification email for new contact form submission."""
    if not SMTP_FROM:
        return False

    html_body = f"""
    <html>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> {name} ({email})</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Message:</strong></p>
        <p>{message}</p>
    </body>
    </html>
    """

    text_body = f"""
    New Contact Form Submission
    
    From: {name} ({email})
    Subject: {subject}
    
    Message:
    {message}
    """

    return await send_email(
        to=SMTP_FROM,
        subject=f"Contact Form: {subject}",
        body=text_body,
        html_body=html_body,
    )
