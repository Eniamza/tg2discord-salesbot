import 'dotenv/config'

import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { parseMessage } from './modules/parseMessage.js'
import axios from 'axios'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on(message('text'), async (ctx) => {
    let text = ctx.message.text
    let entities = ctx.message.entities

    let chatId = ctx.message.chat.id
    let userId = ctx.message.from.id
    let isBot = ctx.message.from.is_bot

    if ( chatId != process.env.CHAT_ID || userId != process.env.USER_ID || isBot == false ) {
        console.log("Not the right chat or user")
        return
    }

    let disEmbed = await parseMessage(text, entities)

    if (!disEmbed) {
        console.log("No embed found")
    }

    let config = {
      method: "POST",
      url: process.env.WEBHOOK_URL,
      headers: { "Content-Type": "application/json" },
      data: disEmbed,
   };

   axios(config)
   .then((response) => {
      console.log("Sales delivered successfully");
      return response;
   })
   .catch((error) => {
     console.log(error);
     return error;
   });
    
  })

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))