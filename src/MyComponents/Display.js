import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../CSS/menu.css'



const Display = (props) => {
    const host = "http://localhost:5000"
    const { element } = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlechange = (e) => {
        e.preventDefault();
    }
    const placeorder = async () => {



        const obj = {
            "Name": element.name,
            "OrderId": element._id,
            "Price": element.orderno,
            "Discount": element.discount,
            "FinalPrice": element.orderno - (element.orderno * (element.discount / 100)),
            "Address": document.getElementById('address').value.toString(),
            "CustomerName": document.getElementById('custname').value.toString()

        }

        const newobj = await JSON.stringify(obj)


        await fetch('http://localhost:5000/api/order', {

            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                origin: 'https://localhost:5000'
            },
            body: newobj
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

            })
            .then(data => {
                console.log('Data successfully sent:', data);

            })
            .catch(error => {

                console.error('There was a problem with the fetch operation:', error);

            });


    }

    return (
        <>
            <div className="col-md-3 my-2 menu" style={{ cursor: "pointer" }} >

                <div className="card p-2" >
                    <img className="card-img-top" src={element.img} alt="Card image cap" style={{ maxHeight: "30vh" }} />
                    <div className="card-body">
                        <h5 className="card-title">{element.name}</h5>
                        <p className="card-text">{element.orderno} rs</p>
                        <Button variant="primary" onClick={handleShow}>
                            Order Now !!
                        </Button>


                    </div>
                </div>
            </div>




            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{element.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="my-3 text-center" controlId="exampleForm.ControlInput1">
                            <Form.Label ><img className="card-img-top" src={element.img} alt="Card image cap" style={{ maxHeight: "30vh" }} /></Form.Label>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Order Id : {element._id.slice(0, 8)}</Form.Label>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name:  {element.name}</Form.Label>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price : {element.orderno}</Form.Label>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Discount: {element.discount} % </Form.Label>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Final Price: {element.orderno - (element.orderno * (element.discount / 100))}</Form.Label>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>address: <input type="text" className="form-control" id="address" /></Form.Label>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>CustomerName: <input type="text" className="form-control" id="custname" onChange={handlechange} /></Form.Label>

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={placeorder}>
                        Place Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Display
