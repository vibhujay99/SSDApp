const axios = require('axios');

// Middleware function to check CSRF token
export function checkCSRFToken(req, res, next) {
  const csrfToken = req.headers['x-csrf-token'];
  
  // Check if the CSRF token is present
  if (!csrfToken) {
    return res.status(403).json({ error: 'CSRF token missing' });
  }
  
  next();
}
