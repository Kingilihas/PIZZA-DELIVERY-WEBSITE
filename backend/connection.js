const mongoose = require('mongoose');

/* Database connection */
const connectMongo = async (url) => {

    return mongoose.connect(url);
}





module.exports = { connectMongo }