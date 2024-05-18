
const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');
const { authenticateToken } = require('../middleware/authenticateToken');

// Route for getting all Machines
router.get('/machinesList', authenticateToken, machineController.getAllMachines);





module.exports = router;
