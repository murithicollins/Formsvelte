import nodemailer from 'nodemailer';
import Email from '$lib/email/Email.svelte';
import { render } from 'svelte-email';

export async function load(event) {
  return {};
}

export const actions = {

  default: async (event) => {

    // console.log('button')


    let request = event.request;
    let data = await request.formData();

    let name = data.get('Name');
    let email = data.get('Email');

    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: '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',
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // render the email template
    const emailHtml = render({
        template: Email,
        props: {
            name: name,
            email: email,
        }
    });

    const options = {
      from: 'support@pnpradius.com',
      to: 'murithic2016@gmail.com',
      subject: 'New Contact Form Submission',
      html:emailHtml
    };

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    let message = `Thank you ${name} for your message. We will get back to you soon.`;

    event.locals = {
      message,
    };

    return {
      status: 200,
    };
  },
};
