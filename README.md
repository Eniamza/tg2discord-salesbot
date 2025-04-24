# Telegram to Discord Sales Bot

A Node.js bot that monitors Telegram sales notifications and forwards them to Discord using formatted embeds.

## Features

- 🤖 Monitors specific Telegram chat for sales messages
- 📊 Parses sale information including:
  - Price (WETH and USD)
  - Amount purchased
  - Market capitalization
  - Buyer details
  - Transaction links
- 💬 Creates beautiful Discord embeds
- ⚡ Real-time message forwarding

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/tg2discord-salesbot.git
cd tg2discord-salesbot
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables by creating a `.env` file:
```env
BOT_TOKEN=your_telegram_bot_token
WEBHOOK_URL=your_discord_webhook_url
CHAT_ID=telegram_chat_id_to_monitor
USER_ID=telegram_user_id_to_monitor
TOKEN=discord_bot_token
```

4. Start the bot
```bash
node bot.js
```

## Dependencies

- [`discord.js`](https://www.npmjs.com/package/discord.js) - Discord API client
- [`telegraf`](https://www.npmjs.com/package/telegraf) - Modern Telegram Bot framework
- [`axios`](https://www.npmjs.com/package/axios) - Promise based HTTP client
- [`dotenv`](https://www.npmjs.com/package/dotenv) - Environment configuration

## Configuration

The bot only processes messages that match:
- Specific Telegram chat ID
- Specific user ID
- Non-bot messages

Messages are transformed into Discord embeds containing:
- Transaction details
- Price information
- Market statistics
- Relevant links

## Security

- Bot tokens and IDs are stored in environment variables
- Message source verification prevents unauthorized forwarding
- Only processes messages from whitelisted sources

## License

MIT License - See [LICENSE](LICENSE) for details