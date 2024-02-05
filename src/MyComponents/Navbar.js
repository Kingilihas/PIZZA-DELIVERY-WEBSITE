import React from 'react'
import '../Stylesheets/Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Navbar = (props) => {

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/signup')
    }

    const location = useLocation();
    const { pathname } = location;

    console.log(pathname)

    const { addbutton } = props;
    console.log(addbutton)
    return (


        <nav className="navbar navbar-expand-lg bg-black  ">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="#">Pizza Website</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/About">About-us </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/Admin">Admin</Link>
                        </li>



                    </ul>
                    {pathname !== '/Admin' ? <form className="d-flex" role="search">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        {pathname !== '/login' && <button className="btn btn-outline-success" onClick={handleLogin}> Login </button>}
                        {pathname !== '/signup' && <button className="btn btn-outline-danger mx-2" onClick={handleSignup}> Sign Up </button>}
                    </form> : ""}
                </div>
            </div >
        </nav >





    )
}

export default Navbar
