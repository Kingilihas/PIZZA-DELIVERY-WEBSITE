const express = require('express');
const router = express.Router();
const { placeOrders, adminLogin, getorders, collectOrder, userLogin, getNorthIndianmenu, getSouthIndianmenu } = require('../Controllers/Controller')



// get the menu but in specific page number only
router.get('/menu/north:pageNumber', getNorthIndianmenu)

//  get the menu but in specific page number only
router.get('/menu/south:pageNumber', getSouthIndianmenu)


// This end point will send data to server via client of order placed
router.post('/order', placeOrders)


//This End point is used for admin Login
router.post('/admin', adminLogin)

// This endpoint is used to get orders which are placed
router.get('/getorders', getorders)

// endpoint for collecting order
router.delete('/collect', collectOrder)

//endpoint for user login
router.post('/login', userLogin)



module.exports = { router }






