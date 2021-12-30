const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://lusica:dlsc2020@cluster0.pvona.mongodb.net/test";
const dbName = "AxiePlusBot";
const dbclient = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
let db;

module.exports = {
    connect: () => {
        dbclient.connect(function (err) {
            console.log("Connected successfully to server");
            db = dbclient.db(dbName);
            //console.log(db);
        });
    },
    db: () => db,
};
