import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';



function Header(props) {
    const [isLoggedIn, setLogged] = useState(false);

    const LogOut = () => {
        console.log(localStorage);
        localStorage.removeItem("token");
        console.log(localStorage);
        props.history.push("/");
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    });
    

    return (
        <div class="topnav">
            <Link to="/">Home</Link>
            <Link to="/market-price">{isLoggedIn ? "Market Price" : ""}</Link>
            <Link to="/set-price">{isLoggedIn ? "Set Price" : ""}</Link>
            <Link to="/add-item">{isLoggedIn ? "Add Item" : ""}</Link>
            <a onClick={() => LogOut()} className="log-out">{isLoggedIn ? "Log Out" : ""}</a>
        </div>
    );
}

export default Header;