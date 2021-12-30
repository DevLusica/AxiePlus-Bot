const axios = require("axios");
const db = require("./db").db;
const config = {
    headers: {
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
    },
};

function roninToAddress(roninAddress) {
    let address = "0x" + roninAddress.substring(6);
    return address;
}
async function roninProfile(address) {
    let data = await Promise.all([
        axios.get(`https://game-api.skymavis.com/game-api/clients/${address}/items/1`, config),
        axios.get(`https://game-api.skymavis.com/game-api/leaderboard?client_id=${address}&offset=0&limit=0`, config),
    ]).then(ret => ret.map(obj => obj.data));
    let roninaddress = "ronin:" + address.substring(2);
    let datas = await db().collection("user").findOne({ address: roninaddress });
    let profile = {};
    if (data[0].last_claimed_item_at !== 0) {
        profile.address = roninaddress
        profile.today = data[0].total - data[0].claimable_total - (datas?.todayslp || 0)
        profile.total = data[0].total;
        profile.claimed = data[0].total - data[0].claimable_total
        profile.claimable = data[0].claimable_total
        profile.last_claimed_item_at = new Date(data[0].last_claimed_item_at  * 1000).toLocaleString()
        profile.lastclaimday = Math.floor((new Date() - new Date(data[0].last_claimed_item_at * 1000)) / 1000 / 60 / 60 / 24) + 1
        profile.daily = Math.round((data[0].total - data[0].claimable_total) / Math.floor((new Date() - new Date(data[0].last_claimed_item_at * 1000)) / 1000 / 60 / 60 / 24) + 1);
        if (data[1].success) {
            profile.name = data[1].items[1].name;
            profile.win = data[1].items[1].win_total;
            profile.draw = data[1].items[1].draw_total;
            profile.lose = data[1].items[1].lose_total;
            profile.elo = data[1].items[1].elo;
            profile.rank = data[1].items[1].rank;
        }
    }
    return profile;
}

module.exports = roninAddress => roninProfile(roninToAddress(roninAddress));

