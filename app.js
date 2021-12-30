process.env.TZ = "utc";
const configs = require("./configs/configs");
const Discord = require("discord.js");
const { Collection } = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const axios = require("axios");

const schedule = require('node-schedule');
const db = require("./modules/db").db;
const profile = require("./modules/profile");
client.commands = new Collection();

require("./modules/db").connect();

axios.interceptors.response.use(res => res, err => err.response);

fs.readdir('./commands/', (err, list) => {
    for (let file of list) {
            let pull = require(`./commands/${file}`);
                client.commands.set(pull.name, pull);
    }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("=help | Axie.plus", { type: "PLAYING" });
});

client.on("message", async (message) => {
    const prefix = message.content.substring(0, 1);
    const args = message.content
        .substring(1, message.content.length)
        .split(" ")
        .filter((str) => str !== "");
    if (message.author.bot) return;
    if (prefix === "=") {
        if (client.commands.get(args[0])) {
            client.commands.get(args[0]).run(client, message, args);
        }
    }
});

client.login(configs.token);


async function userlist() {
    let data = await db().collection("user").find().toArray();
    return data;
}
schedule.scheduleJob("* 9 * * *", async () => {
    const arr = await userlist();
    const looptime = arr.length;
    for (var i = 0; i < looptime; i++) {
        let profiles = await profile(arr[i].address);
        await db().collection("user").findOneAndUpdate(
            { id: arr[i].id },
            {
                $set: { todayslp: profiles.claimed },
            }
        );
    }
});