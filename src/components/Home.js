import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const Home = (props) => {

    const [isLoggedIn, setLogged] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    });

    const goTologin = e => {
        e.preventDefault();
        props.history.push("/login");
    }

    const goToSignUp = e => {
        e.preventDefault();
        props.history.push("/register");
    }
    let buttonLog;
    let buttonRegister;
    
    if (!isLoggedIn) {
        buttonLog = <button onClick={goTologin} className="postButton">Log in</button>
        buttonRegister = <button onClick={goToSignUp} className="postButton">Register</button>
    }
 
    return (
        <div className="home-page">
            <h1>Welcome to the Market!!!</h1>
                <div className="login-form">
                    <form> 
                    {buttonLog}
                    {buttonRegister}
                    </form>
                </div>
        </div>
    );
}
export default Home;