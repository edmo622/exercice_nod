const nodemailer = require('nodemailer');

/**
 * Envoie un email via SMTP (Gmail, SendGrid, etc.)
 * @param {string} to - Destinataire
 * @param {string} subject - Sujet de l'email
 * @param {string} text - Corps du message (texte)
 * @returns {Promise<string>} - Statut d'envoi
 */
async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmailfgfg',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    return `Email envoyé à ${to} : ${info.response}`;
  } catch (error) {
    throw new Error(`Échec de l'envoi : ${error.message}`);
  }
}

module.exports = sendEmail;
