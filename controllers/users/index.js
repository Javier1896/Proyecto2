const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUser = require('./getUser');
const getOwnUser = require('../../db/queries/users/getOwnUser');
const editUserAvatar = require('./editUserAvatar');

module.exports = {
  newUser,
  loginUser,
  getUser,
  getOwnUser,
  editUserAvatar,
};
