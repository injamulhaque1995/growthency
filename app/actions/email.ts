"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  service?: string
  budget?: string
  message: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Send Contact Form Email
// Sends an admin notification + an auto-reply to the user
// ─────────────────────────────────────────────────────────────────────────────
export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, service, budget, message } = data

  const adminHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color:#18181b;padding:32px 40px;">
                  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">New Contact from ${name}</h1>
                  <p style="margin:8px 0 0;color:#a1a1aa;font-size:14px;">Submitted via Growthency contact form</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="display:block;color:#71717a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Name</span>
                        <span style="color:#18181b;font-size:16px;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="display:block;color:#71717a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Email</span>
                        <a href="mailto:${email}" style="color:#6366f1;font-size:16px;text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                    ${phone ? `
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="display:block;color:#71717a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Phone</span>
                        <span style="color:#18181b;font-size:16px;">${phone}</span>
                      </td>
                    </tr>` : ""}
                    ${service ? `
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="display:block;color:#71717a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Service Interested In</span>
                        <span style="color:#18181b;font-size:16px;">${service}</span>
                      </td>
                    </tr>` : ""}
                    ${budget ? `
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="display:block;color:#71717a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Budget</span>
                        <span style="color:#18181b;font-size:16px;">${budget}</span>
                      </td>
                    </tr>` : ""}
                    <tr>
                      <td style="padding:12px 0;">
                        <span style="display:block;color:#71717a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Message</span>
                        <div style="background-color:#f9f9fb;border-left:3px solid #6366f1;padding:16px;border-radius:0 4px 4px 0;">
                          <p style="margin:0;color:#18181b;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color:#f9f9fb;padding:20px 40px;border-top:1px solid #e4e4e7;">
                  <p style="margin:0;color:#71717a;font-size:13px;">
                    Sent from <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#6366f1;text-decoration:none;">Growthency</a> — ${new Date().toUTCString()}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  const userHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>We received your message</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:40px;">
                  <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Thanks, ${name}!</h1>
                  <p style="margin:12px 0 0;color:#e0e7ff;font-size:16px;">We&apos;ve received your message and will be in touch shortly.</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:1.6;">
                    Hi ${name},
                  </p>
                  <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:1.6;">
                    Thank you for reaching out to <strong>Growthency</strong>. We&apos;ve received your inquiry and a member of our team will review it and get back to you within <strong>1–2 business days</strong>.
                  </p>
                  ${service ? `<p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:1.6;">You expressed interest in: <strong>${service}</strong>. We&apos;re excited to explore how we can help you grow.</p>` : ""}
                  <p style="margin:0 0 32px;color:#3f3f46;font-size:15px;line-height:1.6;">
                    In the meantime, feel free to browse our <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" style="color:#6366f1;text-decoration:none;">blog</a> or check out our <a href="${process.env.NEXT_PUBLIC_APP_URL}/tools" style="color:#6366f1;text-decoration:none;">free tools</a>.
                  </p>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color:#6366f1;border-radius:6px;">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">Visit Growthency</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color:#f9f9fb;padding:24px 40px;border-top:1px solid #e4e4e7;">
                  <p style="margin:0 0 4px;color:#71717a;font-size:13px;">
                    © ${new Date().getFullYear()} Growthency. All rights reserved.
                  </p>
                  <p style="margin:0;color:#a1a1aa;font-size:12px;">
                    You received this email because you submitted a contact form at growthency.com.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  try {
    // Notification to admin
    await resend.emails.send({
      from: `Growthency Contact <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: adminHtml,
    })

    // Auto-reply to the user
    await resend.emails.send({
      from: `Growthency <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "We received your message — Growthency",
      html: userHtml,
    })

    return { success: true }
  } catch (error) {
    console.error("[email] sendContactEmail error:", error)
    throw new Error("Failed to send email. Please try again.")
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Subscribe to Newsletter
// ─────────────────────────────────────────────────────────────────────────────
export async function subscribeNewsletter(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address")
  }

  const welcomeHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to the Growthency Newsletter</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:48px 40px;text-align:center;">
                  <h1 style="margin:0 0 8px;color:#ffffff;font-size:32px;font-weight:700;">Welcome to Growthency</h1>
                  <p style="margin:0;color:#e0e7ff;font-size:17px;">You&apos;re now part of our community of growth-focused marketers.</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <p style="margin:0 0 20px;color:#3f3f46;font-size:15px;line-height:1.7;">
                    Thanks for subscribing! Here&apos;s what you can expect from us:
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="color:#6366f1;font-size:18px;margin-right:10px;">✦</span>
                        <span style="color:#3f3f46;font-size:15px;"><strong>Weekly growth insights</strong> — practical tips you can apply immediately</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="color:#6366f1;font-size:18px;margin-right:10px;">✦</span>
                        <span style="color:#3f3f46;font-size:15px;"><strong>Early access</strong> to new tools and features</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #f4f4f5;">
                        <span style="color:#6366f1;font-size:18px;margin-right:10px;">✦</span>
                        <span style="color:#3f3f46;font-size:15px;"><strong>Case studies</strong> from real campaigns we&apos;ve run</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;">
                        <span style="color:#6366f1;font-size:18px;margin-right:10px;">✦</span>
                        <span style="color:#3f3f46;font-size:15px;"><strong>Exclusive offers</strong> for subscribers only</span>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:32px;text-align:center;">
                    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                      <tr>
                        <td style="background-color:#6366f1;border-radius:6px;">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">Read Our Latest Articles</a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color:#f9f9fb;padding:24px 40px;border-top:1px solid #e4e4e7;text-align:center;">
                  <p style="margin:0 0 4px;color:#71717a;font-size:13px;">
                    © ${new Date().getFullYear()} Growthency. All rights reserved.
                  </p>
                  <p style="margin:0;color:#a1a1aa;font-size:12px;">
                    You subscribed at <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#6366f1;text-decoration:none;">growthency.com</a>.
                    To unsubscribe, reply to this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  try {
    await resend.emails.send({
      from: `Growthency <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Welcome to the Growthency newsletter!",
      html: welcomeHtml,
    })

    return { success: true }
  } catch (error) {
    console.error("[email] subscribeNewsletter error:", error)
    throw new Error("Failed to send welcome email. Please try again.")
  }
}
