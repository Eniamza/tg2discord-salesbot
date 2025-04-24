import { discordEmbedJSONBuilder } from './disEmbed.js';

async  function parseMessage(text,entities){
    const startIndexWeth = text.indexOf("|")+1
    const endIndexWeth = startIndexWeth+6
    const startIndexUSD = text.indexOf("$",startIndexWeth)+1
    const endIndexUSD = startIndexUSD+5
    const startIndexGOT = text.indexOf("Got:",endIndexUSD)+5
    const endIndexGOT = text.indexOf("$",startIndexGOT)
    const startIndexMarketCap = text.indexOf("$",endIndexGOT+1)
    const endIndexMarketCap = text.indexOf("\n",startIndexMarketCap)
    let buyerLink = ""
    let transactionLink = ""

    entities.forEach(element => {
        let word = text.substring(element.offset,element.offset+element.length)

        if (element.type == "text_link" && word == "Buyer") {
            buyerLink = element.url
        }
        if (element.type == "text_link" && word == "Txn") {
            transactionLink = element.url
        }

    });

    const priceWETH = text.substring(startIndexWeth,endIndexWeth).trim()
    const priceUSD = text.substring(startIndexUSD,endIndexUSD).trim()
    const bought = text.substring(startIndexGOT,endIndexGOT).trim()
    const marketCap = text.substring(startIndexMarketCap,endIndexMarketCap).trim()

    console.log("Logged Transaction Link: ", transactionLink)

    const discordEmbed = discordEmbedJSONBuilder(priceWETH, priceUSD, bought, marketCap, buyerLink, transactionLink)

    return discordEmbed
}

export { parseMessage }

