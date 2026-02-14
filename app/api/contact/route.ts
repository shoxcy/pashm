import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure the transporter
        // Note: User needs to set EMAIL_USER and EMAIL_PASS environment variables
        // For Gmail, use an App Password if 2FA is enabled.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address (authenticated account)
            to: 'pashmco@gmail.com', // Receiver address
            replyTo: email, // Reply to the user's email
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        // Send the email
        // If credentials are not set, we'll log a warning and simulate success
        // so the UI doesn't break for the user immediately.
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('EMAIL_USER or EMAIL_PASS not set. Email not sent.');
            console.log('Would have sent:', mailOptions);
            return NextResponse.json(
                { message: 'Message received (Simulation: Email configuration missing)' },
                { status: 200 }
            );
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
