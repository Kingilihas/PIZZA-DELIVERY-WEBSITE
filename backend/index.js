const express = require('express');
const app = express();
const { connectMongo } = require('./connection')
const { handleCors, AutheticateAdmin } = require('./middleWare')
const { router } = require('./Routes/Routes')

const url = 'mongodb+srv://ilihas:123@menu.m9ajxj1.mongodb.net/Menu?retryWrites=true&w=majority'

connectMongo(url).then(() => {
    console.log('connection established');

})

/* Middlewares */

app.use(handleCors())
app.use(express.json());

//Middleware for the admin login 
app.use('/api/admin', async (req, res, next) => {

    AutheticateAdmin(req, res, next);
})

app.use('/api', router)

/* server */

app.listen(5000, () => {
    console.log("app listening on port 5000")
});