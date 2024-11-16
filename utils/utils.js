const telegramApi = require("../api/telegram.api");

module.exports = {
  async sendMessage(messageObject, messageText, options = []) {
    return telegramApi.get("sendMessage", {
      chat_id: messageObject.chat.id,
      text: messageText,
      ...options,
    });
  },

  async sendPhoto(messageObj, photoUrl) {
    const chatId = messageObj.chat.id;
    return telegramApi.post("sendPhoto", {
      chat_id: chatId,
      photo: photoUrl,
    });
  },

  async sendDetails(messageObj, movie) {
    if (messageObj) {
      let messageText =
        `*Title:* ${movie?.original_title}\n` +
        `*IMDb Rating:* ${movie?.vote_average.toFixed(1) || "NA"}\n` +
        `*Release Date:* ${movie.release_date.split("-")[0]}\n` +
        `*Genres:* ${movie?.genres?.map((each) => each?.name).join(", ")}`;

      await this.sendMessage(messageObj, messageText, {
        parse_mode: "Markdown",
      });

      if (movie?.poster_path) {
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        await this.sendPhoto(messageObj, posterUrl);
      }
    } else {
      await this.sendMessage(messageObj, `Unexpected error!`);
    }
  },
};
