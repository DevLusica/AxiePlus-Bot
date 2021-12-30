const db = require("./db").db;

async function modifyAddress(id, address) {
    await db().collection("user").findOneAndUpdate(
        { id: id },
        {
            $set: {
                address: address,
            },
        }
    );
}

module.exports = (discordId, roninAddress) => modifyAddress(discordId, roninAddress);