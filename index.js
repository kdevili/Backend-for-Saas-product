const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./src/routes/auth');
const contactPersonRoutes = require('./src/routes/contactPerson');
const machineRoutes = require('./src/routes/machines');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/contact_persons', contactPersonRoutes);
app.use('/api/machines', machineRoutes);

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'src', 'images')));


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
