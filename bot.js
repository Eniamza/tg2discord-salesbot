require("dotenv").config();
const { Api,TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events");
const { MessageEntityTextUrl, MessageEntityUrl } = require("telegram/tl/custom/message");
const { parseMessage } = require('./modules/parseMessage.js')

const { Client, Events, GatewayIntentBits } = require('discord.js')
const disClient = new Client({ intents: [GatewayIntentBits.Guilds] });
const apiID = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;
const session = new StringSession(process.env.LOGIN_STRING); 
const client = new TelegramClient(session, apiID, apiHash, {});


// client.once(Events.ClientReady, readyClient => {
// 	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
// });

// bot.on(message('text'), async (ctx) => {
//     let text = ctx.message.text
//     let entities = ctx.message.entities

//     // console.log(JSON.stringify(ctx.message, null, 2))

//     let chatId = ctx.message.chat.id
//     let userId = ctx.message.from.id
//     let isBot = ctx.message.from.is_bot
//     let userName = ctx.message.from.username

//     console.log(`Chat ID: ${chatId}, User ID: ${userId}, Is Bot: ${isBot}, User Name: ${userName}`)

//     if ( chatId != process.env.CHAT_ID || userId != process.env.USER_ID || isBot == false ) {
//         console.log("Not the right chat or user")
//         return
//     }

//     let disEmbed = await parseMessage(text, entities)

//     if (!disEmbed) {
//         console.log("No embed found")
//     }

//   //   let config = {
//   //     method: "POST",
//   //     url: process.env.WEBHOOK_URL,
//   //     headers: { "Content-Type": "application/json" },
//   //     data: disEmbed,
//   //  };

//   //  axios(config)
//   //  .then((response) => {
//   //     console.log("Sales delivered successfully");
//   //     return response;
//   //  })
//   //  .catch((error) => {
//   //    console.log(error);
//   //    return error;
//   //  });

//   const channel = client.channels.cache.get('932730922049110029');
//   channel.send({ embeds: disEmbed.embeds })
    
//   })

// bot.launch()

async function main() {
    await client.connect()
    console.log(await client.checkAuthorization())

    disClient.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    })

    client.addEventHandler(async (event) => {
        const message = event.message;
        if (message.chatId == Number(process.env.CHAT_ID) && message.fromId.userId == Number(process.env.USER_ID)) { //message.fromId.userId == 5386442585
            if (message.message.includes("DooggieCoin [$DOOG]") && message.message.includes("Market Cap")) {
                let text = message.message
                let entities = message.entities

                let disEmbed = await parseMessage(text, entities)

                if (!disEmbed) {
                    console.log("No embed found")
                }

                const channel = disClient.channels.cache.get('932730922049110029');
                channel.send({ embeds: disEmbed.embeds })
            }
            else {
                console.log("Not the right message")
            }

        }
        else {
            console.log("Not the right chat or user")
        }
      }, new NewMessage({ chats: [-1002607514205] }));

}

main()

disClient.login(process.env.TOKEN);

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))