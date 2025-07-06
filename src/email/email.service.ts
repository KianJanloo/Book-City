import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'kian1slayer@gmail.com',
        pass: 'jjid ipmy tdsg zctg',
      },
    });
  }

  async sendForgotPasswordEmail(email: string, code: string) {
    await this.transporter.sendMail({
      from: '"Book City 📒🥰" <kian1slayer@gmail.com>',
      to: email,
      subject: 'Reset Your Password - Book City',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fafafa;">
        <h2 style="color: #4A90E2; text-align: center;">🔑 Reset Your Password</h2>
        <p style="font-size: 16px; color: #333;">Hi dear user,</p>
        <p style="font-size: 16px; color: #333;">We received a request to reset your password for your Book City account. Use the code below to reset it:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; padding: 15px 30px; font-size: 20px; color: white; background-color: #4A90E2; border-radius: 8px; letter-spacing: 2px;">
            ${code}
          </span>
        </div>

        <p style="font-size: 14px; color: #555;">If you didn’t request a password reset, please ignore this email.</p>
        <p style="font-size: 14px; color: #555;">Thank you,<br/>Book City Team 📚✨</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} Book City. All rights reserved.</p>
      </div>
    `,
    });
  }
}
