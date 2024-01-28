const mongoose = require('mongoose');

const db = 'mongodb+srv://ilihas:123@menu.m9ajxj1.mongodb.net/Menu?retryWrites=true&w=majority'

mongoose.connect(db).then(() => {
    console.log("connection established")
}).catch((err) => {
    console.log("connection error", err);
})




const kittySchema = new mongoose.Schema({
    name: String,
    orderno: Number,
    Phoneno: Number,
    address: String,
    pincode: Number,
    spiceslevel: Number,

});



const doc1 = mongoose.model('NorthIndian', kittySchema);

const doc2 = mongoose.model('SouthIndian', kittySchema);

const addMenu = (name, orderno, phoneno, address, pincode, spiceslevel, type, img, discount) => {

    if (type === 'North') {

        const col = new doc1({ name: name, orderno: orderno, Phoneno: phoneno, address: address, pincode: pincode, spiceslevel: spiceslevel, img: img, discount: discount });
        col.save().then(() => {
            console.log('Details saved to North ')
        })


    } else {

        const col = new doc2({ name: name, orderno: orderno, Phoneno: phoneno, address: address, pincode: pincode, spiceslevel: spiceslevel });
        col.save().then(() => {
            console.log('Details saved to south ')
        })

    }




}


const addOrder = (OrderId, Name, Price, Discount, FinalPrice, Address, CustomerName) => {

    const col = new doc1({ OrderId: OrderId, Name: Name, Price: Price, Discount: Discount, FinalPrice: FinalPrice, Address: CustomerName });
    col.save().then(() => {
        console.log("Order placed sucessfully your OrderId is ", OrderId);

    }).catch(err => {
        console.log("Not placed due to error: ", err);
    })



}


// addMenu("chennai-chinese", 560, 4832393020, "Goa", 89083, 34, "North");

// utility code : 


// const col2 = new doc({ name: 'Kashmirithanda', orderno: 1234234, Phoneno: 1903456989, address: "Oxford University", pincode: 115105 });
// col2.save().then(() => {
//     console.log('Details saved')
// })



// Collection - South Indian

// const col = new doc({ name: 'KeralaCoconut', orderno: 1134, Phoneno: 103456987, address: "Delhi University", pincode: 415105 });
// col.save().then(() => {
//     console.log('Details saved')
// })
// const col2 = new doc({ name: 'Hyderabadi', orderno: 2234234, Phoneno: 456786989, address: "IIT bombay", pincode: 135105 });
// col2.save().then(() => {
//     console.log('Details saved')
// })



const getNorthIndianMenu = async () => {

    const North = await doc1.find();


    return North

}


const getSouthIndianMenu = async () => {

    const South = await doc2.find();


    return South;

}

module.exports = { getSouthIndianMenu, getNorthIndianMenu, addOrder };