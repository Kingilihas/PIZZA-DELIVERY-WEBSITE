import React from 'react'
import '../CSS/Admin.css'
const Login = () => {

    const handleClick = () => {

    }
    return (

        <div className="Container">

            <div className="LoginBox">

                <h1>User Login</h1>

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

export default Login
