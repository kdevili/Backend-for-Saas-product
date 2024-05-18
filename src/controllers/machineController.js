
const MachineCategory = require('../models/company');


// Get all contact persons
exports.getAllMachines = async (req, res) => {
    try {
      const Machines = await ContactPerson.findAll();
      res.status(200).json(contactPersons);
    } catch (error) {
      console.error('Error fetching contact persons:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };