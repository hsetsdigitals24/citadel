import nodemailer from "nodemailer";

export type AppointmentData = {
  fullName: string;
  phone: string;
  email: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  reason: string;
  contactMethod: string;
};

export type ContactData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const hasSmtp = !!process.env.SMTP_HOST;

export const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#F7F9FC;font-family:Inter,system-ui,Arial,sans-serif;color:#0B1B33">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px">
      <div style="background:#1B3E6F;color:#fff;padding:24px;border-radius:16px 16px 0 0">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.8">Citadel Global Dental Clinic</div>
        <div style="font-size:22px;margin-top:6px;font-weight:600">${title}</div>
      </div>
      <div style="background:#fff;padding:28px;border-radius:0 0 16px 16px;box-shadow:0 8px 24px -12px rgba(11,27,51,0.12)">
        ${body}
      </div>
      <div style="text-align:center;color:#8A97AB;font-size:12px;margin-top:16px;line-height:1.6">
        Citadel Global Dental Clinic — 221 Ibrahim Taiwo Road, Ilorin<br/>
        Adewole Specialist Dental Clinic — 25 Okoerin Street, Ilorin<br/>
        08131539685
      </div>
    </div>
  </body></html>`;
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 0;color:#5B6B82;width:40%">${label}</td><td style="padding:8px 0;color:#0B1B33;font-weight:500">${value}</td></tr>`;
}

export async function sendAppointmentNotification(a: AppointmentData) {
  if (!transporter) return;
  const html = shell(
    "New appointment request",
    `<p style="margin:0 0 16px;color:#5B6B82">A new appointment request was submitted from the website.</p>
     <table style="width:100%;font-size:14px;border-collapse:collapse">
       ${row("Name", a.fullName)}
       ${row("Phone", a.phone)}
       ${row("Email", a.email)}
       ${row("Preferred date", a.preferredDate ?? "—")}
       ${row("Preferred time", a.preferredTime ?? "—")}
       ${row("Contact method", a.contactMethod)}
       ${row("Reason", a.reason)}
     </table>`
  );
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CLINIC_EMAIL,
    subject: `New appointment request — ${a.fullName}`,
    html,
  });
}

export async function sendAppointmentConfirmation(a: AppointmentData) {
  if (!transporter) return;
  const html = shell(
    "We received your request",
    `<p style="margin:0 0 12px">Hi ${a.fullName.split(" ")[0]},</p>
     <p style="margin:0 0 12px;color:#5B6B82">Thank you for reaching out to Citadel Global Dental Clinic. We have received your appointment request and our team will be in touch shortly via your preferred contact method (<strong>${a.contactMethod}</strong>).</p>
     <p style="margin:0 0 12px;color:#5B6B82">Working hours: 8:00 AM – 4:00 PM daily. For emergencies, call <a style="color:#C0392B" href="tel:08131539685">08131539685</a>.</p>
     <p style="margin:24px 0 0;color:#0B1B33;font-weight:600">— Citadel Global Dental Clinic</p>`
  );
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: a.email,
    subject: "We received your appointment request — Citadel Global Dental Clinic",
    html,
  });
}

export async function sendContactEnquiry(c: ContactData) {
  if (!transporter) return;
  const html = shell(
    "New website enquiry",
    `<table style="width:100%;font-size:14px;border-collapse:collapse">
       ${row("Name", c.name)}
       ${row("Email", c.email)}
       ${row("Phone", c.phone ?? "—")}
     </table>
     <p style="margin-top:16px;color:#0B1B33;white-space:pre-wrap">${c.message}</p>`
  );
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CLINIC_EMAIL,
    subject: `Website enquiry — ${c.name}`,
    html,
  });
}
