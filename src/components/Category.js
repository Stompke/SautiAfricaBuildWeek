import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import NextBackNavigation from './NextBackNavigation';
import {MainSection, Title } from '../StyledComponents/MainComponents';

const Category = (props) => {
    const [category, setCategory] = useState({
    });
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const id = props.match.params.id;
        console.log(id);
        axiosWithAuth()
        .get(`https://build-week-africanmarketplace.herokuapp.com/api/category/${id}`)
        .then(res => {
            setCategory(res.data);
        })
        .catch(err => console.log(err));
        axiosWithAuth()
        .get(`https://build-week-africanmarketplace.herokuapp.com/api/category/${id}/items`)
        .then(res => {
            console.log(res.data);
            setItems(res.data);
        })
        .catch(err => console.log(err));
    }, []);
    
    return (
        <MainSection>
            <NextBackNavigation back={() => props.history.goBack()} next={() => props.history.goForward()} />
            <Title>Prices List</Title>  
            <div>
                <img src={category.imgUrl} width="128" height="128" />
                <h3>{category.category}</h3>  
                        {items.map(item => (
                            <div className="category">
                                <h3>Name: {item.item_name}</h3>       
                                <h3>Description: {item.item_description}</h3>       
                                <h3>Price: {item.item_price}</h3>       
                            </div>
                        ))}  
            </div>
        </MainSection>   
    );

}

export default Category;