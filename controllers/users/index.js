const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUser = require('./getUser');
const getOwnUser = require('./getOwnUser');
const editUser = require('./editUser');
const editUserAvatar = require('./editUserAvatar');
const editUserPass = require('./editUserPass');

module.exports = {
  newUser,
  loginUser,
  editUserPass,
  getUser,
  getOwnUser,
  editUser,
  editUserAvatar,
};
