import 'dotenv/config'

import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { parseMessage } from './modules/parseMessage.js'
import axios from 'axios'
import { Client, Events, GatewayIntentBits } from 'discord.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const bot = new Telegraf(process.env.BOT_TOKEN)

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

bot.on(message('text'), async (ctx) => {
    let text = ctx.message.text
    let entities = ctx.message.entities

    // console.log(JSON.stringify(ctx.message, null, 2))

    let chatId = ctx.message.chat.id
    let userId = ctx.message.from.id
    let isBot = ctx.message.from.is_bot
    let userName = ctx.message.from.username

    console.log(`Chat ID: ${chatId}, User ID: ${userId}, Is Bot: ${isBot}, User Name: ${userName}`)

    if ( chatId != process.env.CHAT_ID || userId != process.env.USER_ID || isBot == false ) {
        console.log("Not the right chat or user")
        return
    }

    let disEmbed = await parseMessage(text, entities)

    if (!disEmbed) {
        console.log("No embed found")
    }

  //   let config = {
  //     method: "POST",
  //     url: process.env.WEBHOOK_URL,
  //     headers: { "Content-Type": "application/json" },
  //     data: disEmbed,
  //  };

  //  axios(config)
  //  .then((response) => {
  //     console.log("Sales delivered successfully");
  //     return response;
  //  })
  //  .catch((error) => {
  //    console.log(error);
  //    return error;
  //  });

  const channel = client.channels.cache.get('932730922049110029');
  channel.send({ embeds: disEmbed.embeds })
    
  })

bot.launch()
client.login(process.env.TOKEN);

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))