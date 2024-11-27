const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

(async () => {
  try {
    const result = await bot.deleteWebhook();
    console.log("Webhook deleted:", result);
    bot.startPolling();
  } catch (error) {
    console.error("Error deleting webhook:", error);
  }
})();

module.exports = bot;
