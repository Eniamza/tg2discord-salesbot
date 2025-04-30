
/**
 * Discord Embed JSON Builder for DooggieCoin
 * @param {string} priceWETH 
 * @param {string} priceUSD 
 * @param {string} bought 
 * @param {string} marketCap 
 * @param {string} buyerLink 
 * @param {string} transaction 
 * @returns {JSON} discordEmbed
 */

 function discordEmbedJSONBuilder (priceWETH, priceUSD, bought, marketCap, buyerLink, transaction) {
    const timeString = new Date().toISOString();
    const discordEmbed = {
        "embeds": [
            {
                "color": 4321431,
                "timestamp": timeString,
                "url": "http://dooggies.com/",
                "author": {
                    "name": "$DOOG SALES BUDDY",
                    "url": "https://basescan.org/address/0x7f4db3a7268ba32446696d12204fdddc7b3bd97a",
                    "icon_url": "https://i.ibb.co.com/GvhqFf3f/Dooggie-Coin.jpg"
                },
                "fields": [
                    {
                        "name": "PRICE",
                        "value": `**${priceWETH} WETH**` + " (`"+`$${priceUSD}`+"`)",
                        "inline": false
                    },
                    {
                        "name": "Bought",
                        "value": `**${bought}**`+"`$DOOG`",
                        "inline": false
                    },
                    {
                        "name": "Market Cap",
                        "value": `**${marketCap}**`,
                        "inline": false
                    },
                    {
                        "name": "Buyer",
                        "value": `[BaseScan Profile](${buyerLink})`,
                        "inline": true
                    },
                    {
                        "name": "Transaction",
                        "value": `[BaseScan](${transaction})`,
                        "inline": true
                    },
                    {
                        "name": "$DOOG IT:",
                        "value": "- [Buy $DOOG](https://app.uniswap.org/swap?&chain=base&use=v2&outputCurrency=0x34b2adb3bd4aef3af0b4541735c47b6364d88d1e)\n- [DexScreener](https://dexscreener.com/base/0x34b2adb3bd4aef3af0b4541735c47b6364d88d1e)\n- [Twitter](https://twitter.com/DooggiesNFT)\n- [Website](https://dooggies.com/)\n- [Telegram](https://t.me/DooggieCoin)",
                        "inline": false
                    }
                ],
                "title": "DooggieCoin [$DOOG] BUY",
                "thumbnail": {
                    "url": "https://i.ibb.co.com/GvhqFf3f/Dooggie-Coin.jpg"
                }
            }
        ]
    }

    return discordEmbed
}

module.exports = { discordEmbedJSONBuilder };

