const crypto = require('crypto');

// Generate a random secret with 256 bits (32 bytes)
const secret = crypto.randomBytes(32).toString('hex');

console.log(secret);
