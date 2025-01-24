const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/users.json');

exports.readUsers = () => {
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(data);
};

exports.writeUsers = (users) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
};
