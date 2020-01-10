import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Edit = (props) => {
    console.log('aste ' + props.userId);
    const [item, setItem] = useState([]);
    const userId = props.userId;

    useEffect(() => {
        const id = props.match.params.id;
        axiosWithAuth()
            .get(`https://build-week-africanmarketplace.herokuapp.com/api/users/${userId}/items/${id}`)
            .then(res => {
                console.log(res.data);
                setItem(res.data);
            })
            .catch(err => console.log(err.response));
    }, []);

    const handleChange = e => {
        e.preventDefault();
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    const saveEdit = e => {
        const id = props.match.params.id;
        console.log(item);
        axiosWithAuth()
            .put(`https://build-week-africanmarketplace.herokuapp.com/api/users/${userId}/items/${id}`, item)
            .then(res => {
                console.log(res);
                props.history.push('/set-price');
            })
            .catch(err => console.log(err.response));
    };

    const deleteItem = item => {
        const id = props.match.params.id;
        axiosWithAuth()
            .delete(`https://build-week-africanmarketplace.herokuapp.com/api/users/1/items/${id}`)
            .then(res => {
                console.log(res);
                props.history.push('/set-price');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h3>Edit Item</h3>
            <div>
                <img src='data:image/jpeg;base64,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' width="128" height="128" />
                    <div>
                        <h3>Name: {item.item_name}</h3>
                        <h3>Description: {item.item_description}</h3>
                        <div>
                           <label htmlFor="item_price">Price:</label>
                           <input className="titleStyles"
                                type="number"
                                name="item_price"
                                value={item.item_price}
                                onChange={handleChange}
                             />
                        </div>
                        <button onClick={e => { deleteItem({item})}}>Delete</button>
                        <button onClick={e => { saveEdit({ item }) }}>Save</button>
                    </div>
            </div>
        </div>
    );

}

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
};

export default connect(
    mapStateToProps
)(Edit);