const { discordEmbedJSONBuilder } = require('./disEmbed.js');

async  function parseMessage(text,entities){
    const startIndexWeth = text.indexOf("|")+1
    const endIndexWeth = startIndexWeth+6
    const startIndexUSD = text.indexOf("$",startIndexWeth)+1
    const endIndexUSD = startIndexUSD+5
    const startIndexGOT = text.indexOf("Got:",endIndexUSD)+5
    const endIndexGOT = text.indexOf("$",startIndexGOT)
    const startIndexMarketCap = text.indexOf("$",endIndexGOT+2)
    const endIndexMarketCap = text.indexOf("\n",startIndexMarketCap+1)
    // console.log(`StartMarketCap: ${startIndexMarketCap}`)
    // console.log(`startMarketCapWord: ${text.substring(startIndexMarketCap,startIndexMarketCap+5)}`)
    // console.log(`EndMarketCap: ${endIndexMarketCap}`)
    let buyerLink = ""
    let transactionLink = ""

    entities.forEach(element => {
        let word = text.substring(element.offset,element.offset+element.length)
        if (element.className == "MessageEntityTextUrl" && word == "Buyer") {
            buyerLink = element.url
        }
        if (element.className == "MessageEntityTextUrl" && word == "Txn") {
            transactionLink = element.url
        }

    });

    const priceWETH = text.substring(startIndexWeth,endIndexWeth).trim()
    const priceUSD = text.substring(startIndexUSD,endIndexUSD).trim()
    const bought = text.substring(startIndexGOT,endIndexGOT).trim()
    const marketCap = text.substring(startIndexMarketCap,endIndexMarketCap).trim()

    console.log(`Price WETH: ${priceWETH}`)
    console.log(`Price USD: ${priceUSD}`)
    console.log(`Bought: ${bought}`)
    console.log(`Market Cap: ${marketCap}`)
    console.log(`Buyer Link: ${buyerLink}`)
    console.log(`Transaction Link: ${transactionLink}`)


    const discordEmbed = discordEmbedJSONBuilder(priceWETH, priceUSD, bought, marketCap, buyerLink, transactionLink)

    return discordEmbed
}

module.exports = { parseMessage };

