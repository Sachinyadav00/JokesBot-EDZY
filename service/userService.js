const User = require("../models/User");

async function findOrCreateUser(chatId) {
  let user = await User.findOne({ chatId });
  if (!user) {
    user = await User.create({ chatId });
  }
  return user;
}

async function updateUser(chatId, updates) {
  return User.findOneAndUpdate({ chatId }, updates, { new: true });
}

async function getEnabledUsers() {
  return User.find({ isEnabled: true });
}

module.exports = { findOrCreateUser, updateUser, getEnabledUsers };
