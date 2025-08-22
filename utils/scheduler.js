const { getEnabledUsers, updateUser } = require("../service/userService");
const { fetchJoke } = require("../service/jokeService");

function startScheduler(bot) {
  setInterval(async () => {
    const now = new Date();
    const users = await getEnabledUsers();

    for (const user of users) {
      const due =
        !user.lastSentAt || (now - user.lastSentAt) / 60000 >= user.frequency;

      if (due) {
        const joke = await fetchJoke();
        bot.sendMessage(user.chatId, joke);

        await updateUser(user.chatId, { lastSentAt: now });
      }
    }
  }, 60 * 1000); // check every 1 min
}

module.exports = { startScheduler };
