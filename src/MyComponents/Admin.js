import React, { useState, useEffect } from 'react'
import Placedorders from './Placedorders';

import '../CSS/Orders.css'

const Admin = () => {

    const [orders, setorders] = useState([]);

    const getOrder = async () => {

        const response = await fetch('http://localhost:5000/api/getorders');
        const parseddata = await response.json();

        // console.log(parseddata)
        setorders(parseddata)
        console.log(orders);

    }

    useEffect(() => {

        getOrder();

    }, [])

    return (
        <>
            <h1 className="my-3">Today Placed Orders</h1>
            <div className="orders">

                {

                    orders.map(ele => {
                        return <Placedorders key={ele._id} element={ele} setorders={setorders} />
                    })

                }



            </div>
        </>
    )
}

export default Admin
