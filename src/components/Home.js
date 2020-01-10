import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { CustomButton, MainSection, Title } from '../StyledComponents/MainComponents'; 
import mapAgeCleaner from "map-age-cleaner";
import { heading, locationCard, locationCardButton, locationRow } from '../styles/OtherStyles'
import NextBackNavigation from './NextBackNavigation';
import { Link } from 'react-router-dom';



import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';



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
            <NextBackNavigation back={() => props.history.goBack()} next={() => props.history.goForward()} />
            <Title>Welcome to the Market!!!</Title>
                <div className="login-form">
                    <form> 
                    {buttonLog}
                    {buttonRegister}
                    </form>
                </div>

            <div>
                <h2>Locations You can Sell in!</h2>
                <Row style={locationRow}>
                    {locations.map(location => {
                        return(
                        // <div key={location.id}> {location.country} </div>
                        <Col  key={location.id} sm="3">
                            <Card style={locationCard} body>
                            <CardTitle style={heading}>{location.country}</CardTitle>
                            <CardText></CardText>
                            <Link to={`/location-items/${location.id}`}>
                            <Button style={locationCardButton}>See Products</Button>
                            </Link>
                            </Card>
                        </Col>
                        )
                    })}
                </Row>
            </div>
            
        </MainSection>
    );
}
export default Home;