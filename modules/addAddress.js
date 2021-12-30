const db = require("./db").db;
async function addAddress(id, address) {
    await db().collection("user").insertOne({
        id: id,
        address: address,
    });
}

module.exports = (discordId, roninAddress) => addAddress(discordId, roninAddress);