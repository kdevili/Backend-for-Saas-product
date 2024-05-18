const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mainUserModel = require('../models/mainUser'); // Changed the variable name to avoid conflict
const {defineCustomerUserModel}  = require('../models/customerUser');
const internalTokenBlacklist = require('../models/interalTokenBlacklist');
const Company = require('../models/company');

const login = async (req, res) => {
  const { email, username, company_code, password } = req.body;

  try {
    // If email is provided, attempt internal user login
    if (email) {
      // Find user by email in the main database
      const mainUser = await mainUserModel.findOne({ where: { email: email } });
      
      // If user not found, return error
      if (!mainUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if the user is an internal user
      if (mainUser.userType === 'internal') {
        // Check if the user is active or blocked
        if (mainUser.status === 'block') {
          return res.status(401).json({ message: 'User is inactive or blocked' });
        }
        // Validate password
        const isValidPassword = await bcrypt.compare(password, mainUser.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid password' });
        }
  
        // Generate JWT token for internal user
        const token = jwt.sign(
          { userId: mainUser.id, userType: mainUser.userType },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
  
        return res.status(200).json({ message: 'Internal Login successful', token });
      }
    } else if (username && company_code) {
      // Process customer login
      // Find company by randomCode in the main database
      const company = await Company.findOne({ where: { randomCode: company_code } });
      
      // If company not found, return error
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      
      // Define customer user model for the specific company
      const CustomerUserModel = await defineCustomerUserModel(company.id);
      
      // Find customer user by username in the company database
      const customerUser = await CustomerUserModel.findOne({ where: { userName: username } });   
      
      // If user not found, return error
      if (!customerUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if the user is active or blocked
      if (customerUser.status === 'block') {
        return res.status(401).json({ message: 'User is inactive or blocked' });
      }
      
      // Validate password
      const isValidPassword = await bcrypt.compare(password, customerUser.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token for customer user
      const token = jwt.sign(
        { userId: customerUser.id, userType: customerUser.userType, companyId:customerUser.companyId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({ message: 'Customer Login successful', token });
    } else {
      // If neither email nor username is found in the request body, return error
      return res.status(400).send('Neither email nor username found in the request body');
    }
  } catch (error) {
    // Handle errors
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




// Register a new user
/*const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({ name, email, password: hashedPassword });

    // Send success response
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    // Handle errors
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'An error occurred while registering user' });
  }
};*/

// Define logoutUser function

const logoutUser = async (req, res) => {
  try {
    // Retrieve the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    //console.log(req.user.userType);
    // Check if the user is internal or external based on userType
    if (req.user.userType === 'internal') {
      // For internal users, blacklist the token in the main database
      const user_id = req.user.userId; // Assuming you have the user ID stored in the request object (e.g., req.user)
      // Calculate the expiration timestamp (adjust based on your expiration duration)
      //console.log(user_id);
      const expirationDurationMs = 60 * 60 * 1000; // Example: 1 hour expiration duration
      const currentTime = new Date();
      const invalidated_at = new Date(currentTime.getTime() + expirationDurationMs);
      await internalTokenBlacklist.create({token, user_id,invalidated_at});
    } else if(req.user.userType === 'customer') {
      
      const userId = req.user.userId;
      const companyId = req.user.companyId; // Assuming you have the user ID stored in the request object (e.g., req.user)
      const expirationDurationMs = 60 * 60 * 1000; // Example: 1 hour expiration duration
      const currentTime = new Date();
      const invalidated_at = new Date(currentTime.getTime() + expirationDurationMs);
      // For external users, blacklist the token in their respective database
      // Assuming you have a TokenBlacklist model for external users in their database
      const { defineTokenBlacklistModelExternal } = require('../models/externalTokenBlacklist');
      const TokenBlacklistexternal = await defineTokenBlacklistModelExternal(companyId); // Pass the companyId here
      //console.log({ token, userId, invalidated_at, companyId});
      await TokenBlacklistexternal.create({token, userId, invalidated_at, companyId});
     console.log("Successfll!!!!");
    }
    
  

    // Respond with a success message
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'An error occurred while logging out user' });
  }
};
/*const logoutUser = async (req, res) => {
  // Assuming you're using JWT for authentication
  try {
    // Retrieve the token and user ID from the request
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the 'Authorization' header
    const user_id = req.user.userId; // Assuming you have the user ID stored in the request object (e.g., req.user)
    // Calculate the expiration timestamp (adjust based on your expiration duration)
    const expirationDurationMs = 60 * 60 * 1000; // Example: 1 hour expiration duration
    const currentTime = new Date();
    const invalidated_at = new Date(currentTime.getTime() + expirationDurationMs);
    console.log(user_id);
    // Create a new record in your database to store the revoked token
    await TokenBlacklist.create({ user_id, token, invalidated_at});

    // Respond with a success message
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'An error occurred while logging out user' });
  }
};
*/

// Export functions

module.exports = { login ,logoutUser };
