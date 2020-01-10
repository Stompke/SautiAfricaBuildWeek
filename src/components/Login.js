import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        let name = this.state.credentials.username;
        axiosWithAuth()
            .post('https://build-week-africanmarketplace.herokuapp.com/api/auth/login', this.state.credentials)
            .then(res => {
                axiosWithAuth()
                    .get('https://build-week-africanmarketplace.herokuapp.com/api/users')
                    .then(res => {
                        console.log(name);
                        var found = res.data.find(function (element) {
                            return element.username === name;
                        });
                        console.log('BBB');
                        console.log(found.id);
                        this.props.dispatch({ type: 'USER', userId: found.id });
                    })
                    .catch(err => console.log(err)); 
                localStorage.setItem('token', res.data.token);                
                this.props.history.push('/market-price');
            })
            .catch(err => {
                console.log(err.response);
                alert("Wrong user or password");
            });  
    };

    render() {
        return (
            <div className="home-page">
                <h1>Please Log in:</h1>
                <div className="addFormStyles">
                    <form onSubmit={this.login} className="regFormStyles">
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input className="titleStyles"
                                type="text"
                                name="username"
                                value={this.state.credentials.username}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input className="titleStyles2"
                                type="password"
                                name="password"
                                value={this.state.credentials.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <button className="postButton">Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Login);
