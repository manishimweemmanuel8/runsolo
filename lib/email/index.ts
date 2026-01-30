import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import type { ReactElement } from 'react';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  template: ReactElement;
}

export async function sendEmail({ to, subject, template }: SendEmailOptions) {
  const html = await render(template);

  const result = await transporter.sendMail({
    from: `"RunSolo" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
  });

  return result;
}

export { transporter };
