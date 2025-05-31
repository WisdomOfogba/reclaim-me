import { generateKeyPair } from 'crypto';
import { writeFileSync } from 'fs';

// Generate RSA key pair
generateKeyPair('rsa', {
  modulusLength: 3072, // Recommended 2048 or 4096 for RSA
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8', // PKCS#8 is a common and secure format
    format: 'pem'
  }
}, (err, publicKey, privateKey) => {
  if (err) {
    console.error('Error generating key pair:', err);
    return;
  }
  writeFileSync('private_rsa_key.pem', privateKey);
  writeFileSync('public_rsa_key.pem', publicKey);
  console.log('RSA key pair generated: private_rsa_key.pem, public_rsa_key.pem');
});