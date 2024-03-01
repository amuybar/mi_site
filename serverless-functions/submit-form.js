// serverless-functions/submit-form.js
const nodemailer = require('nodemailer');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Parse the JSON body
  const { name, email, message } = JSON.parse(event.body);

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'odaribq@gmail.com',
      pass: 'lvtb rffi xioo jyoi',
    },
  });

  // Email sent to you
  const mailOptions = {
    from: 'odaribq@gmail.com',
    to: email,
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email to you
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to you: ' + info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
    };
  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
    };
  }
};
