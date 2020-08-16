import nodemailer, { SendMailOptions } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { User } from '../../models';

function createTransporter(): Mail {
  try {
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASSWORD);
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
      secure: true,
      debug: true,
      logger: true,
    });
  } catch (error) {
    console.error(`Error while creating Mail Transport`);
    console.error(error);
  }
}

export class EmailService {
  private static transporter: Mail = createTransporter();
  // TODO: pretty HTML format
  private static defaultOptions: SendMailOptions = {
    from: 'Work App work.app.general@gmail.com', // real app name and new email address
    subject: 'Work App - ',
  };

  public static async sendRecoveryLink(email: string, passwordToken: string) {
    const options = Object.assign({}, EmailService.defaultOptions, {
      to: email,
      text: `You issued a forgot password recovery process. Follow this link to reset your password to new one. Recovery process is active for 30 minutes. If you did not issue this recovery request then please do NOT do anything, because somebody is trying to issue this recovery on your behalf. Here is password recovery link for you to follow: ${
        process.env.NODE_ENV === 'production' ? 'https://workapp-dev.herokuapp.com/resetpassword/' : 'http://localhost:4200/resetpassword/'
      }${passwordToken}`,
      subject: EmailService.defaultOptions.subject + 'Password recovery link',
    });
    const res = await EmailService.transporter.sendMail(options);
    console.log(`Res from sendMail function`);
    console.log(res);
  }

  public static async sendInfoAboutCreatedUser(user: User) {
    const options = Object.assign({}, EmailService.defaultOptions, {
      to: user.email,
      text: `We are pleased to have you onboard, Your account is set up and ready to use. You can log in from here: https://workapp-dev.herokuapp.com/ .
      Your User ID is ${user.userId}`,
      subject: EmailService.defaultOptions.subject + `Welcome to Work App ${user.firstName}!`,
    });
    const res = await EmailService.transporter.sendMail(options);
    console.log(`Res from sendMail function`);
    console.log(res);
  }
}
