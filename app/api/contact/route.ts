/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  sanitizeInput,
  validateEmailSecurity,
  ContactRateLimiter,
  isSpamContent,
} from "@/lib/security";
import {
  logSubmission,
  isBlockedIP,
  isBlockedEmail,
} from "@/lib/contact-monitor";

// In-memory storage for tracking submissions (consider using Redis in production)
const submissionTracker = new Map<
  string,
  { count: number; lastSubmission: number; emails: Set<string> }
>();
const rateLimiter = new ContactRateLimiter();

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  return forwardedFor?.split(",")[0] || realIP || cfConnectingIP || "unknown";
}

function isValidSubmissionRate(
  clientIP: string,
  email: string
): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;

  const tracker = submissionTracker.get(clientIP) || {
    count: 0,
    lastSubmission: 0,
    emails: new Set(),
  };

  // Check if same email was used recently
  if (tracker.emails.has(email) && now - tracker.lastSubmission < oneHour) {
    return { allowed: false, reason: "Email address already used recently" };
  }

  // Check submission frequency
  if (now - tracker.lastSubmission < fiveMinutes) {
    return {
      allowed: false,
      reason: "Please wait before sending another message",
    };
  }

  // Reset counter if more than 1 hour passed
  if (now - tracker.lastSubmission > oneHour) {
    tracker.count = 0;
    tracker.emails.clear();
  }

  // Max 3 emails per hour per IP
  if (tracker.count >= 3) {
    return {
      allowed: false,
      reason: "Too many messages sent. Please try again later",
    };
  }

  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Check if IP is blocked
    if (isBlockedIP(clientIP)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Rate limiting check
    if (!rateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, honeypot, timestamp } = body;

    // Honeypot check (bot detection)
    if (honeypot && honeypot.trim() !== "") {
      console.log(`Bot detected from IP: ${clientIP}`);
      logSubmission({
        ip: clientIP,
        email: email || "unknown",
        name: name || "bot",
        subject: subject || "bot submission",
        message: "Bot detected via honeypot",
        timestamp: Date.now(),
        userAgent,
      });
      return NextResponse.json(
        { error: "Submission rejected" },
        { status: 400 }
      );
    }

    // Timestamp check (form must be filled for at least 3 seconds)
    if (timestamp && Date.now() - timestamp < 3000) {
      return NextResponse.json(
        { error: "Form submitted too quickly" },
        { status: 400 }
      );
    }

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedEmail = email.trim().toLowerCase();

    // Check if email is blocked
    if (isBlockedEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Email address is not allowed" },
        { status: 403 }
      );
    }

    // Enhanced email validation
    const emailValidation = validateEmailSecurity(sanitizedEmail);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.reason || "Invalid email address" },
        { status: 400 }
      );
    }

    // Spam content detection
    const fullContent = `${sanitizedName} ${sanitizedSubject} ${sanitizedMessage}`;
    if (isSpamContent(fullContent)) {
      console.log(
        `Spam detected from IP: ${clientIP}, Email: ${sanitizedEmail}`
      );
      logSubmission({
        ip: clientIP,
        email: sanitizedEmail,
        name: sanitizedName,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        timestamp: Date.now(),
        userAgent,
      });
      return NextResponse.json(
        { error: "Message contains inappropriate content" },
        { status: 400 }
      );
    }

    // Check submission rate for this IP and email
    const rateCheck = isValidSubmissionRate(clientIP, sanitizedEmail);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: rateCheck.reason }, { status: 429 });
    }

    // Update submission tracker
    const tracker = submissionTracker.get(clientIP) || {
      count: 0,
      lastSubmission: 0,
      emails: new Set(),
    };
    tracker.count += 1;
    tracker.lastSubmission = Date.now();
    tracker.emails.add(sanitizedEmail);
    submissionTracker.set(clientIP, tracker);

    // Log successful submission
    logSubmission({
      ip: clientIP,
      email: sanitizedEmail,
      name: sanitizedName,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: Date.now(),
      userAgent,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p style="margin: 10px 0;"><strong>IP Address:</strong> ${clientIP}</p>
            <p style="margin: 10px 0;"><strong>User Agent:</strong> ${userAgent}</p>
            <p style="margin: 10px 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${sanitizedMessage.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Reply to:</strong> ${sanitizedEmail}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
