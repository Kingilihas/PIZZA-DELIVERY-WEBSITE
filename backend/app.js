const express = require('express');
const url = require('url');
const querystring = require('querystring');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
const db = 'mongodb+srv://ilihas:123@menu.m9ajxj1.mongodb.net/Menu?retryWrites=true&w=majority'

mongoose.connect(db).then(() => {
    console.log("connection established")
}).catch((err) => {
    console.log("connection error", err);
})



app.listen(5000, () => {
    console.log("app listening on port 5000")
});

app.use(express.json());


const kittySchema = new mongoose.Schema({
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

const doc1 = mongoose.model('NorthIndian', kittySchema);
const doc2 = mongoose.model('SouthIndian', kittySchema);
const doc3 = mongoose.model('PlacedOrder', placedSchema);
const doc4 = mongoose.model('Admin', AdminSchema);

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


// get all menu
const getNorthIndianMenu = async () => {

    const North = await doc1.find();


    return North

}


const getSouthIndianMenu = async () => {

    const South = await doc2.find();


    return South;

}

// get the menu but in specific page number only
app.get('/api/menu/north:pageNumber', cors(), async (req, res) => {


    const details = await getNorthIndianMenu();



    const str = req.params.pageNumber; // Extract page number from URL param

    let pageNumber = Number.parseInt(str.substring(1));
    console.log(pageNumber);
    const parpage = 10;

    const total = details.length;
    const totalPages = Math.ceil(total / parpage);

    if (totalPages < pageNumber) {
        pageNumber = pageNumber - 1;
    }


    // Calculate start and end indexes for pagination
    const startIndex = (pageNumber - 1) * parpage;
    const endIndex = pageNumber * parpage;

    // Slice the array based on pagination parameters
    const paginatedItems = details.slice(startIndex, endIndex);

    const obj = {
        currentPage: pageNumber,
        pageSize: pageNumber,
        totalItems: details.length,
        totalPages: Math.ceil(total / parpage),
        data: paginatedItems
    }

    const json = JSON.stringify(obj);



    console.log(startIndex, endIndex);

    res.send(json);
})


app.get('/api/menu/south:pageNumber', cors(), async (req, res) => {



    const details = await getSouthIndianMenu();
    const str = req.params.pageNumber; // Extract page number from URL param

    let pageNumber = Number.parseInt(str.substring(1));
    console.log(pageNumber);
    const parpage = 10;


    const total = details.length;
    const totalPages = Math.ceil(total / parpage);

    if (totalPages < pageNumber) {
        pageNumber = pageNumber - 1;
    }


    // Calculate start and end indexes for pagination
    const startIndex = (pageNumber - 1) * parpage;
    const endIndex = pageNumber * parpage;

    // Slice the array based on pagination parameters
    const paginatedItems = details.slice(startIndex, endIndex);



    res.json({
        currentPage: pageNumber,
        pageSize: pageNumber,
        totalItems: details.length,
        totalPages: Math.ceil(total / parpage),
        data: paginatedItems
    });



    console.log(startIndex, endIndex);





})


// This end point will send data to server via client of order placed
app.post('/api/order', async (req, res) => {


    try {



        const parseddata = req.body

        const newData = new doc3(parseddata);


        await newData.save();

        res.status(200).send("sucess")

    } catch (err) {

        console.log(err);
        res.status(500).send('Server Error');


    }

})


//This End point is used for admin Login
app.post('/api/admin', async (req, res) => {



    const uname = req.body.uname;
    const password = req.body.pass;

    const admins = await doc4.findOne({ UserName: uname })


    if (!admins)
        res.status(400).send({ found: false })
    else
        res.status(200).send({ found: true })


})

// This endpoint is used to get orders which are placed
app.get('/api/getorders', async (req, res) => {

    doc3.find().then((order) => {
        res.status(200).send(order);
    }).catch((err) => {
        res.status(400).send(order);
    })


})


app.delete('/api/collect', async (req, res) => {

    const { OrderId } = req.body;

    doc3.deleteOne({ OrderId: OrderId }).then((result) => {

        console.log("sucessfully deleted ");

        res.status(200).send(result);
    }).catch((err) => {
        console.log("Not able to delete ");
        res.status(404).send(err)
    })


})











