// serverless-functions/submit-form.js
const nodemailer = require('nodemailer');
const cors = require('cors');

// Enable CORS for serverless function
const corsMiddleware = cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
});

exports.handler = async function (event, context) {
  // Apply CORS middleware
  await corsMiddleware(event, context);

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

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
      body: 'Form submitted successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
