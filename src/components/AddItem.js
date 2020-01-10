import React from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';
import axios from 'axios';
import { MainSection, Title, FormContainer} from '../StyledComponents/MainComponents';
import NextBackNavigation from './NextBackNavigation';
import { inputStyle, formStyle, labelStyle} from '../styles/FormStyles';


let userId;

class AddItem extends React.Component {
    state = {
        credentials: {
            item_name: '',
            item_description: '',
            item_price: 0.0,
            l_id: 1,
            c_id: 1
        },
        userId: '',
    };
    
    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };
    
    add = e => {      
        e.preventDefault();
        const id = this.props.userId;
        axiosWithAuth()
        .post(`https://build-week-africanmarketplace.herokuapp.com/api/users/${id}/items`, this.state.credentials)
        .then(res => {
            this.props.history.push('/set-price');
        })
        .catch(err => console.log(err.response));
    };
    
    render() {
        return (
            <MainSection>
                <NextBackNavigation back={() => this.props.history.goBack()} next={() => this.props.history.goForward()} />
                <Title>Add Item</Title>

                    <FormContainer>
                        <form style={formStyle} onSubmit={this.add} >
                            <div>
                                <label style={labelStyle} htmlFor="item_name">Name:</label>
                                <input style={inputStyle}
                                    type="text"
                                    name="item_name"
                                    value={this.state.credentials.item_name}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label style={labelStyle} htmlFor="item_price">Price:</label>
                                <input style={inputStyle}
                                    type="number"
                                    name="item_price"
                                    value={this.state.credentials.item_price}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label style={labelStyle} htmlFor="item_description">Description:</label>
                                <input style={inputStyle}
                                    type="text"
                                    name="item_description"
                                    value={this.state.credentials.item_description}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button className="postButton">Add</button>
                        </form>
                    </FormContainer>
            </MainSection>
        );
    }
}

const mapStateToProps = state => {
    console.log('SSS ' + state.userId);
    return {
        userId: state.userId
    }
};

export default connect(
    mapStateToProps
)(AddItem);

