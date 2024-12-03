# Movie Info Telegram Bot
<p align="center">
  <img height="150" src="logo.png">
</p>
<p align="center">
  <strong>Find information about movies 🎬</strong>
</p>

<p align="center">
  <a href="https://core.telegram.org/bots/api" target="_blank">
  <img src="https://img.shields.io/badge/Telegram%20Bot%20API-Documentation-blue?style=flat-square&logo=telegram" alt="Telegram Bot API Documentation">
</a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-Latest-green?style=flat-square&logo=node.js" alt="Node.js">
  </a>
  <a href="https://github.com/yagop/node-telegram-bot-api" target="_blank">
  <img src="https://img.shields.io/badge/node--telegram--bot--api-Documentation-blue?style=flat-square&logo=npm" alt="node-telegram-bot-api Documentation">
</a>
</p>

Looking for movie information on the go?

Meet [@movie_info2_bot](http://telegram.me/movie_info2_bot), a [Telegram](https://telegram.org/) bot that helps you quickly check basic movie information, such as IMDB rating, release date, genre, plot, images and videos!



## Tech Stack 🛠
The bot is built with [Node.js](https://nodejs.org) and [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) a module to interact with the official Telegram Bot Api.

## Features 🚀
- **Search Functionality**: Search movies by name.
- **Detailed Information**: The bot provides comprehensive details about each movie, including plot summaries, ratings from IMDB, release date, genre, plot.

## Project Structure 📁
The project structure is organized as follows:
- `src/`: Contains the source code of the bot.
- `src/api/movies.api.js`: API integration logic used to fetch movie data, including details, trailers, and posters, from external movie databases like TMDB.
- `src/config/constants.js`: Contains application-wide constants, base URLs, or other reusable configurations.
- `src/config/languages.js`: Includes language-related mappings, such as ISO codes to language names
- `src/controller/bot.controller.js`: This file initializes and exports the Telegram bot instance using the node-telegram-bot-api package. The bot is set to polling mode to receive updates in real-time. It acts as the core interface for handling messages and commands sent to the Telegram bot.`
- `src/controller/movie.controller.js`: This file contains the logic for handling movie-related commands and responses
<span style="margin-left: 30px"> `handleCommands`: Processes user queries, fetches movie data using the movies.api module, and sends appropriate responses based on the results (e.g., list of movies or specific movie details).</span><br />
<span style="margin-left: 30px">`sendMovieDetails`: Sends detailed information about a specific movie, including the poster and formatted details such as title, rating, and genres.</span>
- `utils/movie.utils.js`: This file contains utility functions for the Telegram bot, which help structure and format the data received from the API into user-friendly responses.

## Setup Instructions 🛠️
To deploy the Bot on your Telegram account, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:
```bash
$ git clone https://github.com/amitpatil321/telegram-imdb-rating-bot
```

2. **Install Dependencies**: Navigate to the cloned directory and install the necessary dependencies by running:
```bash
$ npm install
```
3. **Telegram Bot Token**: Obtain a Telegram Bot API token by following the instructions in the [Telegram Bot documentation](https://core.telegram.org/bots#botfather).

4. **Configuration**: Create a `.env` file in the root directory and add your Telegram Bot API token:
```bash
TELEGRAM_TOKEN=<TELEGRAM_BOT_TOKEN>
```

5. Similarly create your [TMDB api key](https://developer.themoviedb.org/docs/getting-started)
```bash
TMDB_API_KEY=<TMDB_API_KEY>
```
6. Create your bot on telegram using [@BotFather](https://t.me/botfather), Read more detailed [instructions](https://core.telegram.org/bots/tutorial) here

7. **Run the Bot**: Execute the main script to start the bot:
```bash
$ npm run start
```


## Contribution Guidelines 🤝
Contributions to the project are welcome and encouraged. If you'd like to contribute, please follow these guidelines:

- **Fork the Repository**: Fork this repository to your GitHub account.
- **Create a Branch**: Create a new branch for your contribution and switch to it.
- **Make Changes**: Make your desired changes to the codebase.
- **Test Your Changes**: Ensure that your changes work as expected and do not introduce any errors.
- **Submit a Pull Request**: Once you're satisfied with your changes, submit a pull request explaining the purpose of your contribution.

## Support 🤔
For any questions, issues, or feedback related to the Movie Info Bot, please [open an issue](https://github.com/amitpatil321/telegram-imdb-rating-bot/issues) on GitHub. I'll do my best to address your concerns promptly.

## License 📝
This project is licensed under the [MIT License](https://github.com/amitpatil321/telegram-imdb-rating-bot/blob/main/LICENSE.txt).
