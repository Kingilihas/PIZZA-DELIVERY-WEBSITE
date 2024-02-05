const { doc1, doc2, doc3, doc4, doc5 } = require('../models/models')

const placeOrders = async (req, res) => {


    try {



        const parseddata = req.body

        const newData = new doc3(parseddata);


        await newData.save();

        res.status(200).send("sucess")

    } catch (err) {

        console.log(err);
        res.status(500).send('Server Error');


    }

}

const adminLogin = async (req, res) => {

    try {

        const uname = req.body.uname;
        const password = req.body.pass;

        const admin = await doc4.findOne({ username: uname, password: password })

        if (!admin) {
            res.status(400).send({ found: false })

        } else
            res.status(200).send({ found: true })



    } catch (err) {

        res.status(400).send("Unauthorized acess ")
    }

}


const getorders = async (req, res) => {
    doc3.find().then((order) => {
        res.status(200).send(order);
    }).catch((err) => {
        res.status(400).send(err);
    })
}

const collectOrder = async (req, res) => {
    const { OrderId } = req.body;

    doc3.deleteOne({ OrderId: OrderId }).then((result) => {

        console.log("sucessfully deleted ");

        res.status(200).send(result);
    }).catch((err) => {
        console.log("Not able to delete ");
        res.status(404).send(err)
    })
}

const userLogin = async (req, res) => {

    try {

        const username = req.body.username;
        const password = req.body.password;

        const user = await doc5.findOne({ username: username, password: password })

        if (!user) {
            res.status(404).send({ found: false })

        } else
            res.status(200).send({ found: true })



    } catch (err) {
        res.status(400).send("Bad request")
    }

}

const getNorthIndianmenu = async (req, res) => {


    const details = await doc1.find();



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
}

const getSouthIndianmenu = async (req, res) => {

    const details = await await doc2.find();
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
}

module.exports = { placeOrders, adminLogin, getorders, collectOrder, userLogin, getNorthIndianmenu, getSouthIndianmenu };