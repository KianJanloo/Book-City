import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'kian1slayer@gmail.com',
        pass: 'ridf icto bbtf idzy',
      },
    });
  }

  async sendForgotPasswordEmail(email: string, code: string) {
    await this.transporter.sendMail({
      from: '"Book City 📒🥰" <kian1slayer@gmail.com>',
      to: email,
      subject: 'Reset your password',
      html: `
      <p>Hi,</p>
      <p>Click below to reset your password:</p>
      <span>Your Code: ${code}</span>`,
    });
  }
}
