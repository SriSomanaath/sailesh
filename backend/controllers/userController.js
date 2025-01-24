const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/users.json');

function readUsers() {
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
}

exports.login = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(200).json({
    message: 'Login successful',
    customerId: user.customerId,
    username: user.username,
    email: user.email,
    accountNo: user.accountNo,
  });
};

exports.getProfile = (req, res) => {
  const { customerId } = req.params;
  const users = readUsers();
  const user = users.find(u => u.customerId === customerId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({
    customerId: user.customerId,
    username: user.username,
    email: user.email,
    accountNo: user.accountNo,
  });
};

exports.changePassword = (req, res) => {
  const { customerId, oldPassword, newPassword } = req.body;
  const users = readUsers();
  const userIndex = users.findIndex(u => u.customerId === customerId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = users[userIndex];
  if (!bcrypt.compareSync(oldPassword, user.password)) {
    return res.status(401).json({ error: 'Invalid old password' });
  }

  users[userIndex].password = bcrypt.hashSync(newPassword, 10);
  writeUsers(users);

  res.status(200).json({ message: 'Password changed successfully' });
};
