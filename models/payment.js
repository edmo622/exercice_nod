const stripe = require('stripe')('sk_live_51Kt2x...XqVjDz0L'); // DANGER !

async function processPayment(amount) {
  return stripe.charges.create({
    amount: amount * 100,
    currency: 'eur',
    source: 'tok_visa'
  });
}