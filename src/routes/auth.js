const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');
const authController = require('../controllers/authController');


//router.post('/register', registerUser);
router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logoutUser);

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully' });
  });
module.exports = router;
