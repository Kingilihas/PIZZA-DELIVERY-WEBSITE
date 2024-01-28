import React from 'react'
import '../CSS/Admin.css'

import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    let navigate = useNavigate();

    const handleClick = async () => {

        const uname = await document.getElementById('uname').value.toString();
        const pass = await document.getElementById('pass').value.toString();

        const newobj = {
            uname: uname,
            pass: pass
        }


        const jsonobj = JSON.stringify(newobj);

        try {
            const response = await fetch('http://localhost:5000/api/admin', {

                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    origin: 'http://localhost:5000/'
                },
                body: jsonobj

            })

            const parsed = await response.json();

            if (parsed.found) {
                navigate('/actualadmin');
            }
            else {

                alert('Invalid User')
            }


        } catch (err) {
            console.log("The Error is ", err)
        }




    }
    return (
        <div className="Container">

            <div className="LoginBox">

                <h1>Admin Login</h1>

                <div className="details">
                    <label htmlFor="uname">Username</label>
                    <input type="text" id="uname" placeholder="Enter the username" />
                    <br></br>
                    <label htmlFor="pass">Password</label>
                    <input type="text" id="pass" placeholder="Enter the username" />
                    <br></br>
                    <button onClick={handleClick}>Submit</button>
                </div>



            </div>





        </div>
    )
}

export default AdminLogin
