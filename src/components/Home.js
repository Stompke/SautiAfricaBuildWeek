import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { CustomButton, MainSection } from '../StyledComponents/MainComponents'; 



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
        buttonLog = <CustomButton onClick={goTologin} className="postButton">Log in</CustomButton>
        buttonRegister = <CustomButton onClick={goToSignUp} className="postButton">Register</CustomButton>
    }
 
    return (
        <MainSection>
            <h1>Welcome to the Market!!!</h1>
                <div className="login-form">
                    <form> 
                    {buttonLog}
                    {buttonRegister}
                    </form>
                </div>
        </MainSection>
    );
}
export default Home;