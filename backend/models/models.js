const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    usernames: String,
    password: String,
    firt_name: String,
    last_name: String,
    Dob: String,
    age: Number
})


const orderSchema = new mongoose.Schema({
    name: String,
    orderno: Number,
    Phoneno: Number,
    address: String,
    pincode: Number,
    spiceslevel: Number,

});


const placedSchema = new mongoose.Schema({
    OrderId: String,
    Name: String,
    Price: Number,
    Discount: Number,
    FinalPrice: Number,
    Address: String,
    CustomerName: String
})

const AdminSchema = new mongoose.Schema({
    UserName: String,
    Password: String
})



const doc1 = mongoose.model('NorthIndian', orderSchema);
const doc2 = mongoose.model('SouthIndian', orderSchema);
const doc3 = mongoose.model('PlacedOrder', placedSchema);
const doc4 = mongoose.model('Admin', AdminSchema);
const doc5 = mongoose.model('Users', userSchema);



module.exports = { doc1, doc2, doc3, doc4, doc5 }