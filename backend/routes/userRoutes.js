const express = require('express');
const {
  login,
  getProfile,
  changePassword,
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.get('/profile/:customerId', getProfile);
router.post('/change-password', changePassword);

module.exports = router;
