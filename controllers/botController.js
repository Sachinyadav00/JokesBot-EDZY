const {findOrCreateUser, updateUser, getEnabledUsers} = require("../service/userService");
async function handleStart(bot, msg) {
  const chatId = msg.chat.id;
  await findOrCreateUser(chatId);

  bot.sendMessage(
    chatId,
    "👋 Hi! I’ll send you jokes every minute by default.\n\nCommands:\n" +
      "➡️ ENABLE → Resume jokes\n" +
      "➡️ DISABLE → Pause jokes\n" +
      "➡️ /setfrequency <minutes> → Change interval"
  );
}

async function handleEnable(bot, msg) {
  const chatId = msg.chat.id;
  await updateUser(chatId, { isEnabled: true });
  bot.sendMessage(chatId, "✅ Jokes enabled!");
}

async function handleDisable(bot, msg) {
  const chatId = msg.chat.id;
  await updateUser(chatId, { isEnabled: false });
  bot.sendMessage(chatId, "⛔ Jokes disabled.");
}

async function handleSetFrequency(bot, msg, match) {
  const chatId = msg.chat.id;
  const freq = parseInt(match[1], 10);

  if (freq < 1) {
    return bot.sendMessage(chatId, "❌ Frequency must be at least 1 minute.");
  }

  await updateUser(chatId, { frequency: freq });
  bot.sendMessage(
    chatId,
    `✅ Frequency updated! You’ll get jokes every ${freq} minutes.`
  );
}

module.exports = {
  handleStart,
  handleEnable,
  handleDisable,
  handleSetFrequency,
};
