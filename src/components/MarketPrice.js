import React, { useState, useEffect, useContext, Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { UserContext } from '../contexts/UserContext';
import { MainSection, Title} from '../StyledComponents/MainComponents';
import NextBackNavigation from './NextBackNavigation';




const initialCategories = [
    {
        id: 1,
        loc_id: 1,
        category: ""
    }
];

const MarketPrice = (props) => {
    const [categories, setCategories] = useState(initialCategories);
    useEffect(() => {
        axiosWithAuth()
            .get('https://build-week-africanmarketplace.herokuapp.com/api/category')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <MainSection>
            <NextBackNavigation back={() => props.history.goBack()} next={() => props.history.goForward()} />
            <Title>Market Price</Title>
            <div className="market-price">
                {categories.map(category => (
                    <Link to={`/market-price/${category.id}`}>
                        <div>
                            <img src={category.imgUrl}  width="128" height="128" />
                            <h3>{category.category}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </MainSection>
    );
};

export default MarketPrice;
