const TelegramBot = require("node-telegram-bot-api");
const {
  handleStart,
  handleEnable,
  handleDisable,
  handleSetFrequency,
} = require("./controllers/botController");
const { startScheduler } = require("./utils/scheduler");

function initBot() {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true,
  });

  // Command handlers
  bot.onText(/\/start/, (msg) => handleStart(bot, msg));
  bot.onText(/ENABLE/i, (msg) => handleEnable(bot, msg));
  bot.onText(/DISABLE/i, (msg) => handleDisable(bot, msg));
  bot.onText(/\/setfrequency (\d+)/, (msg, match) =>
    handleSetFrequency(bot, msg, match)
  );

  // Start scheduler
  startScheduler(bot);

  return bot;
}

module.exports = initBot;
