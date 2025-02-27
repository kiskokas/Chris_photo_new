import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Minden mezőt ki kell tölteni!" }, { status: 400 });
    }

    // Check if environment variables exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email environment variables!");
      return NextResponse.json({ error: "Email configuration error" }, { status: 500 });
    }

    // Nodemailer transport setup
    const transporter = nodemailer.createTransport({
      service: "gmail", // Change this if you're using a different provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Fallback to sender email
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
