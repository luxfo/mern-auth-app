import nodemailer from "nodemailer";

const Mail = {
  send: async (p_to, p_subject, p_text) => {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });

    const mailOptions = {
      from: '"Prueba" <prueba@ethereal.com>',
      to: p_to,
      subject: p_subject,
      text: p_text,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.messageId) {
      return nodemailer.getTestMessageUrl(info);
    }
  },
};

export const sendMailVerificationCode = async (
  userEmail,
  userVerificationCode
) => {
  try {
    return await Mail.send(
      userEmail,
      "AuthApp - Verification Code",
      "Hi! You verification code is: " + userVerificationCode
    );
  } catch (error) {
    throw error;
  }
};

export const sendMailResetPassword = async (userEmail, url) => {
  try {
    return await Mail.send(
      userEmail,
      "AuthApp - Verification Code",
      "Hi! To reset password go to: " + url
    );
  } catch (error) {
    throw error;
  }
};
