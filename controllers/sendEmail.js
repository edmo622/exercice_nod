const nodemailer = require('nodemailer');

/**
 * Envoie un email via SMTP (Gmail, SendGrid, etc.)
 * @param {string} to - Destinataire
 * @param {string} subject - Sujet de l'email
 * @param {string} text - Corps du message (texte)
 * @returns {Promise<string>} - Statut d'envoi
 */
async function sendEmail(to, subject, text) {
  // 1. Créer un transporteur SMTP (ex: Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Email depuis les variables d'environnement
      pass: process.env.EMAIL_PASSWORD, // Mot de passe ou "App Password"
    },
  });

  // 2. Options de l'email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  // 3. Envoyer l'email
  try {
    const info = await transporter.sendMail(mailOptions);
    return `Email envoyé à ${to} : ${info.response}`;
  } catch (error) {
    throw new Error(`Échec de l'envoi : ${error.message}`);
  }
}

module.exports = sendEmail;
