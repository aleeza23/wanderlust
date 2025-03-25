require('dotenv').config();
const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing')

const dbUrl = process.env.ATLASDB_URL

//SETUP MONGOOSE
main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log("Data was added! ");
}
initDB();
