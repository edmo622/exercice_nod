const path = require('path');
const sendEmail  = require('../controllers/sendEmail');  
const nodemailer = require('nodemailer');
//edmond
jest.mock('nodemailer');

describe('sendEmail', () => {
  const mockSendMail = jest.fn();
  const mockTransport = { sendMail: mockSendMail };

  beforeEach(() => {
    jest.resetAllMocks();
    nodemailer.createTransport.mockReturnValue(mockTransport);
    mockSendMail.mockResolvedValue({ response: '250 OK' });
    process.env.EMAIL_USER = 'dmond@mediabox.bi';//edmondtest
    process.env.EMAIL_PASSWORD = 'Edmondmbx@2022';
  });

  it('devrait appeler nodemailer avec les bons paramètres', async () => {
    const to = 'kwzrdmnd@gmail.com';
    const subject = 'Sujet de test';
    const text = 'Ceci est un test';

    await sendEmail(to, subject, text);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: 'edmond@mediabox.bi',
        pass: 'Edmondmbx@2022'
      }
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'edmond@mediabox.bi',
      to,
      subject,
      text
    });
  });

  it('devrait retourner un message de succès', async () => {
    const result = await sendEmail(
      'kwzrdmnd@gmail.com',
      'Sujet de test',
      'Ceci est un test.'
    );
    expect(result).toMatch(/Email envoyé à kwzrdmnd@gmail.com/);
  });
  
  it('devrait échouer si les identifiants SMTP sont invalides', async () => {
    nodemailer.createTransport.mockImplementation(() => {
      throw new Error('SMTP failed');
    });
  
    await expect(
      sendEmail('kwzrdmnd@gmail.com', 'Sujet', 'Message')
    ).rejects.toThrow('Échec de l\'envoi : SMTP failed');
  });

  it('devrait gérer les erreurs d\'envoi d\'email', async () => {
    mockSendMail.mockRejectedValue(new Error('Échec de livraison'));

    await expect(
      sendEmail('kwzrdmnd@gmail.com', 'Sujet', 'Message')
    ).rejects.toThrow('Échec de l\'envoi : Échec de livraison');
  });
});