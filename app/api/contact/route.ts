import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { personalInfo } from "../../data/portfolioData";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // Change if using a different provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: personalInfo.email,
      replyTo: email,
      subject: subject || `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#0a0a0a;background-image:radial-gradient(circle at 80% 0%, rgba(49, 46, 129, 0.6) 0%, transparent 50%), radial-gradient(circle at 20% 100%, rgba(76, 29, 149, 0.6) 0%, transparent 50%);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="background-color:#111111;border:1px solid #333333;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
              <div style="background:linear-gradient(90deg, #312e81, #4c1d95);padding:30px 40px;">
                <h1 style="margin:0;color:#ffffff;font-size:24px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;">New Inquiry</h1>
                <p style="margin:10px 0 0;color:#e5e7eb;font-size:14px;">from your portfolio website</p>
              </div>
              <div style="padding:40px;">
                <div style="margin-bottom:24px;">
                  <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;font-weight:bold;">Name</p>
                  <p style="margin:8px 0 0;font-size:18px;color:#ffffff;">${name}</p>
                </div>
                <div style="margin-bottom:24px;">
                  <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;font-weight:bold;">Email</p>
                  <p style="margin:8px 0 0;font-size:18px;"><a href="mailto:${email}" style="color:#a78bfa;text-decoration:none;">${email}</a></p>
                </div>
                <div style="margin-bottom:24px;">
                  <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;font-weight:bold;">Subject</p>
                  <p style="margin:8px 0 0;font-size:18px;color:#ffffff;">${subject || "Project Collaboration Inquiry"}</p>
                </div>
                <div>
                  <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;font-weight:bold;">Message</p>
                  <div style="margin-top:12px;padding:24px;background-color:#1a1a1a;border-radius:12px;border:1px solid #262626;font-size:15px;line-height:1.6;color:#e5e7eb;white-space:pre-wrap;">${message}</div>
                </div>
              </div>
              <div style="padding:20px 40px;text-align:center;border-top:1px solid #262626;background-color:#0a0a0a;">
                <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Delivered via Portfolio Contact Form</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
