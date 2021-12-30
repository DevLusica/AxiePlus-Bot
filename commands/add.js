const Discord = require('discord.js');
const profile = require("../modules/profile");
const getAddress = require("../modules/getAddress");
const addAddress = require("../modules/addAddress");
const db = require("../modules/db").db;
module.exports = {
    name: 'add',
    run: async (client, message, args) => {
        let userAddress = await getAddress(message.author.id);
        if (userAddress === null) {
            let profiles = await profile(args[1]);
            if (profiles.last_claimed_item_at !== undefined && args[1].startsWith("ronin:")) {
                await addAddress(message.author.id, args[1])
                await db().collection("user").findOneAndUpdate(
                    { id: message.author.id },
                    {
                        $set: { todayslp: profiles.claimed },
                    }
                );
                const embed = new Discord.MessageEmbed()
                    .setColor("#dd85ff")
                    .addFields({
                        name: "**Added complete!**",
                        value: "`=axie`",
                    });
                message.channel.send(embed);
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor("#dd85ff")
                    .addFields({
                        name: "**There is error**",
                        value: "Check <Ronin Address>!",
                    });
                message.channel.send(embed);
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#dd85ff")
                .addFields({
                    name: "**Already added!**",
                    value: "`=modify <Ronin Address>`",
                });
            message.channel.send(embed);
        }
    }
}