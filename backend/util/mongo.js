const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

client.connect()
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Failed to connect to DB"));

module.exports = client;