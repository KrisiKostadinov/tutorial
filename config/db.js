const mongoose = require('mongoose');

const connect = async () => {
    const connection = await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to DB");
}

module.exports = connect();
