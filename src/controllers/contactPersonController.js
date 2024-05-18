// controllers/contactPersonController.js

const ContactPerson = require('../models/contactPerson');

// Get all contact persons
exports.getAllContactPersons = async (req, res) => {
  try {
    const contactPersons = await ContactPerson.findAll();
    res.status(200).json(contactPersons);
  } catch (error) {
    console.error('Error fetching contact persons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Choose the favorite or not
exports.chooseContactPersonFavorite = async (req, res) => {
  const { contactPersonId, isFavorite } = req.body;

  try {
      // Find the contact person by ID
      const contactPerson = await ContactPerson.findByPk(contactPersonId);

      // If contact person not found, return error
      if (!contactPerson) {
          return res.status(404).json({ message: 'Contact person not found' });
      }

      // Update the favorite status of the contact person
      contactPerson.favorit = isFavorite;
      await contactPerson.save();

      // Return success response
      res.status(200).json({ message: 'Favorite status updated successfully' });
  } catch (error) {
      console.error('Error updating favorite status:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific contact person by ID
exports.getContactPersonById = async (req, res) => {
  const { id } = req.params;
  try {
    const contactPerson = await ContactPerson.findByPk(id);
    if (!contactPerson) {
      res.status(404).json({ error: 'Contact person not found' });
    } else {
      res.json(contactPerson);
    }
  } catch (error) {
    console.error('Error fetching contact person by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get All the favorite persons
exports.getAllFavoriteContactPersons = async (req,res)=>{

  try {
    const favoriteContactPersons = await ContactPerson.findAll({
      where: {
        favorit: true
      }
    });
    res.status(200).json(favoriteContactPersons);
  } catch (error) {
    console.error('Error fetching favorite contact persons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All the priority persons
exports.getAllPriorityContactPersons = async (req,res)=>{

  try {
    const priorityContactPersons = await ContactPerson.findAll({
      where: {
        ispriority: true
      }
    });
    res.status(200).json(priorityContactPersons);
  } catch (error) {
    console.error('Error fetching priority contact persons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Create a new contact person
exports.createContactPerson = async (req, res) => {
  const { name, jobRole, phoneNumber, email, company, companyLogo, favorit, isPriority } = req.body;
  try {
    const newContactPerson = await ContactPerson.create({
      name,
      jobRole,
      phoneNumber,
      email,
      company,
      companyLogo,
      favorit,
      isPriority
    });
    res.status(201).json(newContactPerson);
  } catch (error) {
    console.error('Error creating contact person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing contact person
exports.updateContactPerson = async (req, res) => {
  const { id } = req.params;
  const { name, jobRole, phoneNumber, email, company, companyLogo, favorit, isPriority } = req.body;
  try {
    const contactPerson = await ContactPerson.findByPk(id);
    if (!contactPerson) {
      res.status(404).json({ error: 'Contact person not found' });
    } else {
      await contactPerson.update({
        name,
        jobRole,
        phoneNumber,
        email,
        company,
        companyLogo,
        favorit,
        isPriority
      });
      res.json(contactPerson);
    }
  } catch (error) {
    console.error('Error updating contact person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a contact person
exports.deleteContactPerson = async (req, res) => {
  const { id } = req.params;
  try {
    const contactPerson = await ContactPerson.findByPk(id);
    if (!contactPerson) {
      res.status(404).json({ error: 'Contact person not found' });
    } else {
      await contactPerson.destroy();
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error deleting contact person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
