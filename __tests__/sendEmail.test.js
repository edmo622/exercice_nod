const path = require('path');
const sendEmail = require(path.resolve(__dirname, '../src/sendEmail'));
const nodemailer = require('nodemailer');

jest.mock('nodemailer');

describe('sendEmail', () => {
  const mockSendMail = jest.fn();
  const mockTransport = { sendMail: mockSendMail };

  beforeEach(() => {
    jest.resetAllMocks();
    nodemailer.createTransport.mockReturnValue(mockTransport);
    mockSendMail.mockResolvedValue({ response: '250 OK' });
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASSWORD = 'password123';
  });

  it('devrait appeler nodemailer avec les bons paramètres', async () => {
    const to = 'destinataire@test.com';
    const subject = 'Sujet de test';
    const text = 'Ceci est un test';

    await sendEmail(to, subject, text);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: 'test@example.com',
        pass: 'password123'
      }
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'test@example.com',
      to,
      subject,
      text
    });
  });

  it('devrait retourner un message de succès', async () => {
    const result = await sendEmail(
      'destinataire@test.com',
      'Sujet de test',
      'Ceci est un test.'
    );

    expect(result).toBe('Email envoyé à destinataire@test.com');
  });

  it('devrait échouer si les identifiants SMTP sont invalides', async () => {
    nodemailer.createTransport.mockImplementation(() => {
      throw new Error('SMTP failed');
    });

    await expect(
      sendEmail('destinataire@test.com', 'Sujet', 'Message')
    ).rejects.toThrow('Échec de l\'envoi : SMTP failed');
  });

  it('devrait gérer les erreurs d\'envoi d\'email', async () => {
    mockSendMail.mockRejectedValue(new Error('Échec de livraison'));

    await expect(
      sendEmail('destinataire@test.com', 'Sujet', 'Message')
    ).rejects.toThrow('Échec de l\'envoi : Échec de livraison');
  });
});