import { Resend } from 'resend';

// We initialize inside the function or lazily
let resend: Resend | null = null;

interface EmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailParams) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Skipping email send.");
        return { success: false, error: "Email service not configured" };
    }

    if (!resend) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Danholt Suites <bookings@danholtsuites.com>', // Replace with your verified domain
            to: [to],
            subject: subject,
            html: html,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Unexpected Email Error:", err);
        return { success: false, error: "Internal email error" };
    }
}

export const getBookingTemplate = (name: string, roomName: string, checkIn: string, checkOut: string, total: number) => `
    <div style="font-family: 'Playfair Display', serif; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #C8975E;">
        <h1 style="color: #C8975E; font-size: 24px; text-transform: uppercase; letter-spacing: 4px; text-align: center;">Danholt Suites</h1>
        <div style="margin-top: 40px; line-height: 1.6;">
            <p>Dear ${name},</p>
            <p>Thank you for choosing Danholt Suites. We are delighted to confirm your upcoming stay.</p>
            
            <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h2 style="font-size: 18px; color: #C8975E; margin-bottom: 20px;">Reservation Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #999;">Suite:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">${roomName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #999;">Check-in:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">${new Date(checkIn).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #999;">Check-out:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">${new Date(checkOut).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 0 0 0; color: #C8975E; font-weight: bold;">Grand Total:</td>
                        <td style="padding: 20px 0 0 0; font-size: 20px; color: #C8975E; font-weight: bold;">₦${total.toLocaleString()}</td>
                    </tr>
                </table>
            </div>

            <p style="font-style: italic; color: #999; text-align: center;">"Defining Hospitality, Redefining Luxury"</p>
            
            <div style="margin-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.1); pt: 20px;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                    If you have any questions, please contact our concierge at +234 81 2345 6789.<br/>
                    Danholt Suites, Area 11, Garki, Abuja.
                </p>
            </div>
        </div>
    </div>
`;
