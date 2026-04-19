import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Send email to ANY recipient
 */
export async function sendMail({ to, subject, html }) {
  try {
    const response = await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: Array.isArray(to) ? to : [to], // ✅ single OR multiple emails
      subject,
      html,
    })

    console.log('✅ Email sent:', response)
  } catch (error) {
    console.error('❌ Email send failed:', error)
  }
}
