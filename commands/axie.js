const Discord = require('discord.js');
const profile = require("../modules/profile");
const getAddress = require("../modules/getAddress");
// const qs = require("querystring")
// const axios = require("axios");
module.exports = {
    name: 'axie',
    run: async (client, message, args) => {
        if (args.length === 1)  {
            let userAddress = await getAddress(message.author.id);
            if (userAddress === null) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#dd85ff")
                    .addFields({
                        name: "**You are not added!**",
                        value: "`=add <Ronin Address>`",
                    })
                    .setFooter(message.author.tag);
                message.channel.send(embed);
            } else {
                let profiles = await profile(userAddress.address);
                // let cost = (await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?' + qs.encode({
                //     'symbol' : 'SLP',
                //     'convert': 'KRW'
                // }),  {
                //     headers: {
                //         'X-CMC_PRO_API_KEY': '3a0a7b27-2f98-465c-9e47-80b6cf14f609'
                //     },
                // })).data.data.SLP.quote.KRW.price
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(profiles.name)
                    .setDescription(profiles.address)
                    .addFields({
                            name: `**Total SLP**`,
                            value: profiles.total + "<:slp:858587291608809472>",
                            inline: true,
                        },{
                            name: `**Unclaimed SLP**`,
                            value: profiles.claimed + "<:slp:858587291608809472>",
                            inline: true,
                        },{
                            name: `**Daily SLP**`,
                            value: profiles.daily + "<:slp:858587291608809472>",
                            inline: true,
                        },{
                            name: `**Today SLP**`,
                            value: profiles.today + "<:slp:858587291608809472>",
                            inline: true,
                        },{
                            name: `**MMR**`,
                            value: ":crossed_swords: " + profiles.elo,
                            inline: true,
                        },{
                            name: `**Rank**`,
                            value: ":trophy: " + profiles.rank,
                            inline: true,
                        },
                        // {
                        //     name: '**Win Rate**',
                        //     value: (profiles.win / (profiles.win + profiles.lose) * 100).toFixed(2) + "%",
                        //     inline: true,
                        // },{
                        //     name: `**Wins**`,
                        //     value: profiles.win,
                        //     inline: true,
                        // },{
                        //     name: `**Draws**`,
                        //     value: profiles.draw,
                        //     inline: true,
                        // },{
                        //     name: `**Loses**`,
                        //     value: profiles.lose,
                        //     inline: true,
                        // },
                        )
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp()
                message.channel.send(embed);
            }
        } else {
        let profiles = await profile(args[1]);
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(profiles.name)
                .setDescription(profiles.address)
                .addFields({
                    name: `**Total  SLP**`,
                    value: profiles.total + "<:slp:858587291608809472>",
                    inline: true,
                    },{
                        name: `**Daily SLP**`,
                        value: profiles.daily + "<:slp:858587291608809472>",
                        inline: true,
                    },{
                        name: `**Last Claimed**`,
                        value: profiles.lastclaimday+" days ago",
                        inline: true,
                    },{
                    name: `**Rank**`,
                    value: profiles.rank,
                    inline: true,
                },{
                    name: `**MMR**`,
                    value: profiles.elo,
                    inline: true,
                },
                //     {
                //         name: '**Win Rate**',
                //         value: (profiles.win / (profiles.win + profiles.lose) * 100).toFixed(2) + "%",
                //         inline: true,
                //     },{
                //     name: `**Wins**`,
                //     value: profiles.win,
                //     inline: true,
                // },{
                //     name: `**Draws**`,
                //     value: profiles.draw,
                //     inline: true,
                // },{
                //     name: `**Loses**`,
                //     value: profiles.lose,
                //     inline: true,
                //     },
                    )
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed);
        }
    }
}