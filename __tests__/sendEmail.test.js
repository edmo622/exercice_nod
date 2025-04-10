const sendEmail = require('./sendEmail');
const nodemailer = require('nodemailer');

// Mock de Nodemailer pour éviter d'envoyer de vrais emails
jest.mock('nodemailer');

describe('sendEmail', () => {
  beforeEach(() => {
    // Simuler une réponse réussie
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({ response: '250 OK' }),
    });
  });

  it('devrait envoyer un email avec succès', async () => {
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASSWORD = 'password123';

    const result = await sendEmail(
      'destinataire@test.com',
      'Sujet de test',
      'Ceci est un test.'
    );

    expect(result).toContain('Email envoyé à destinataire@test.com');
    expect(nodemailer.createTransport).toHaveBeenCalled();
  });

  it('devrait échouer si les identifiants SMTP sont invalides', async () => {
    nodemailer.createTransport.mockImplementation(() => {
      throw new Error('SMTP failed');
    });

    await expect(
      sendEmail('destinataire@test.com', 'Sujet', 'Message')
    ).rejects.toThrow('Échec de l\'envoi : SMTP failed');
  });
});