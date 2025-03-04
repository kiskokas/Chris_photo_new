import { NextRequest, NextResponse } from "next/server";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request:", body); // Debugging log

    const { name, email, message, recaptchaToken } = body;

    if (!recaptchaToken) {
      return NextResponse.json({ error: "Missing reCAPTCHA token" }, { status: 400 });
    }

    // Initialize the RecaptchaEnterpriseServiceClient with environment variables
    const client = new RecaptchaEnterpriseServiceClient({
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      projectId: process.env.GOOGLE_PROJECT_ID,
    });

    const projectPath = client.projectPath(process.env.GOOGLE_PROJECT_ID!);
    const [response] = await client.createAssessment({
      parent: projectPath,
      assessment: {
        event: {
          token: recaptchaToken,
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        },
      },
    });

    // Validate the reCAPTCHA token
    if (!response.tokenProperties?.valid) {
      return NextResponse.json({ error: "Invalid reCAPTCHA token" }, { status: 400 });
    }

    if ((response.riskAnalysis?.score || 0) < 0.5) {
      return NextResponse.json({ error: "Suspicious activity detected" }, { status: 403 });
    }

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "Új kapcsolatfelvétel",
      text: `Név: ${name}\nEmail: ${email}\nÜzenet: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Üzenet sikeresen elküldve!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
