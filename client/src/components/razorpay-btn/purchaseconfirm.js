// Import necessary modules
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Define your email sending function
const sendEmail = async (email, subject, text) => {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Your Gmail email address
      pass: 'your-password', // Your Gmail password
    },
  });

  // Define email options
  let mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: email, // Recipient address
    subject: subject, // Subject line
    text: text, // Plain text body
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

// Route to handle purchase confirmation and send email
router.post('/purchase-confirmation', async (req, res) => {
  try {
    const { userEmail, adminEmail, productName, paymentId } = req.body;

    // Send confirmation email to user
    await sendEmail(
      userEmail,
      'Purchase Confirmation',
      `Dear Customer,\n\nThank you for your purchase of ${productName}. Your payment ID is ${paymentId}.\n\nRegards,\nYour Company`
    );

    // Send confirmation email to admin
    await sendEmail(
      adminEmail,
      'New Purchase Notification',
      `Dear Admin,\n\nA new purchase has been made for ${productName} with payment ID ${paymentId}.\n\nRegards,\nYour Company`
    );

    // Send response
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
