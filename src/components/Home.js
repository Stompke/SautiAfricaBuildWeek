import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { CustomButton, MainSection } from '../StyledComponents/MainComponents'; 
import mapAgeCleaner from "map-age-cleaner";



const Home = (props) => {

    const [isLoggedIn, setLogged] = useState(false);

    const [locations, setLocations] = useState([]);

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

    useEffect(() => {
        axios
        .get('https://build-week-africanmarketplace.herokuapp.com/api/location')
        .then(res => {
            setLocations(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
 
    return (
        <MainSection>
            <h1>Welcome to the Market!!!</h1>
                <div className="login-form">
                    <form> 
                    {buttonLog}
                    {buttonRegister}
                    </form>
                </div>

            <div>
                <h2>Locations You can Sell in!</h2>

                {locations.map(location => {
                    return(
                    <div key={location.id}> {location.country} </div>
                    )
                })}
            </div>
            
        </MainSection>
    );
}
export default Home;