// routes/contactPersonRoutes.js

const express = require('express');
const router = express.Router();
const contactPersonController = require('../controllers/contactPersonController');

// Route for getting all contact persons
router.get('/contactpersons', contactPersonController.getAllContactPersons);

// Route for getting a specific contact person by ID
router.get('/contactpersons/:id', contactPersonController.getContactPersonById);

// Route for choose favorite or not
router.post('/isfavorite', contactPersonController.chooseContactPersonFavorite);

// Route for get all favorite persons
router.get('/is_favorite_persions', contactPersonController.getAllFavoriteContactPersons);

// Route for get all priority persons
router.get('/is_priority_persions', contactPersonController.getAllPriorityContactPersons);

// Route for creating a new contact person
router.post('/contactpersons', contactPersonController.createContactPerson);

// Route for updating an existing contact person
router.put('/contactpersons/:id', contactPersonController.updateContactPerson);

// Route for deleting a contact person
router.delete('/contactpersons/:id', contactPersonController.deleteContactPerson);


module.exports = router;
