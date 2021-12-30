const db = require("./db").db;
async function getAddress(id) {
    let data = await db().collection("user").findOne({ id });
    return data;
}

module.exports = discordId => getAddress(discordId);