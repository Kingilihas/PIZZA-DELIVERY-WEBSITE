import React from 'react'
import '../CSS/Orders.css'
const Placedorders = (props) => {

    const { element, setorders } = props;

    const handleClick = async (e) => {
        e.preventDefault();

        const data = element.OrderId;

        const obj = {

            OrderId: data
        }

        const parseddata = await JSON.stringify(obj);

        fetch('http://localhost:5000/api/collect', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                origin: 'https://localhost:5000'
            },
            body: parseddata
        }).then(async () => {

            const response = await fetch('http://localhost:5000/api/getorders');
            const details = await response.json();


            setorders(details)
        })



    }

    return (

        <div className="col-md-3 order  " style={{ cursor: "pointer", marginTop: "0" }}>


            <div className="card p-2" style={{ border: "2px solid black" }}>

                <div className="card-body" >

                    <p className="card-text">Order Id: {element.OrderId} </p>
                    <p className="card-text">Order Name :{element.Name} </p>
                    <p className="card-text">Address : {element.Address} </p>
                    <p className="card-text">Customer Name : {element.CustomerName} </p>
                    <p className="card-text">Price : {element.Price} </p>
                    <p className="card-text">Discount :{element.Discount} </p>
                    <p className="card-text">FinalPrice: {element.FinalPrice} </p>


                    <button onClick={handleClick}>Collect Now !! </button>

                </div>
            </div>
        </div>

    )
}

export default Placedorders
