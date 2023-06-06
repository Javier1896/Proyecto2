const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUser = require('./getUser');
const getOwnUser = require('../../db/queries/users/getOwnUser');
module.exports = {
    newUser,
    loginUser,
    getUser,
    getOwnUser,
};