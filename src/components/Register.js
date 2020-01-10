import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { inputStyle, formStyle, labelStyle} from '../styles/FormStyles';
import { MainSection, FormContainer, CustomButton} from '../StyledComponents/MainComponents';
import NextBackNavigation from './NextBackNavigation';
import { connect } from 'react-redux';





import axios from 'axios';

const Register = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
    })


    const {
        errors,
        touched,
    } = props;

    // const handleChange = e => {
    //     e.preventDefault();
    //     setCredentials({
    //         ...credentials,
    //         [e.target.name]: e.target.value
    //     });
    // };

    // const register = e => {
    //     e.preventDefault();
    //     let name = credentials.username;
    //     axiosWithAuth()    
    //         .post(`https://build-week-africanmarketplace.herokuapp.com/api/auth/register`,
    //             credentials,
    //         )
    //         .then(res => {
    //             axiosWithAuth()
    //                 .get('https://build-week-africanmarketplace.herokuapp.com/api/users')
    //                 .then(res => {
    //                     console.log(name);
    //                     var found = res.data.find(function (element) {
    //                         return element.username === name;
    //                     });
    //                     this.props.dispatch({ type: 'USERNAME', username: found.id });
    //                 })
    //                 .catch(err => console.log(err)); 
    //             localStorage.setItem('token', res.data.token);
    //             props.history.push('/market-price');
    //         })
    //         .catch(err => {
    //             console.log(err.response);
                // alert("Wrong user or password");
    //         });
    // }

    return (
        <MainSection >
            <NextBackNavigation back={() => props.history.goBack()} next={() => props.history.goForward()} />

            <div className="image-container"></div>

            <FormContainer>
                <Form style={formStyle}>

                    <h2 style={labelStyle}>YOUR INFORMATION</h2>

                    <Field style={inputStyle} type="text" name="username"  placeholder="USERNAME" />

                    <Field  style={inputStyle} type="email" name="email"  placeholder="EMAIL" />

                    <Field  style={inputStyle} type="password" name="password" placeholder="PASSWORD" />

                    <CustomButton  type='submit'>Sign Up</CustomButton>
                    {touched.username && errors.username && <p>{errors.username}</p>}
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </Form>
            </FormContainer>
        </MainSection>
    );
}

const FormikRegister = withFormik({
    mapPropsToValues({username, password, email}) {
        return {
            username: '',
            password: '',
            email: ''
        };
    },
    handleSubmit(values, {props, setStatues, resetForm}) {
        console.group('submitting...', values);
        let name = values.username;
        axiosWithAuth()
            .post("https://build-week-africanmarketplace.herokuapp.com/api/auth/register", values)
            .then(res => {
                axiosWithAuth()
                    .get('https://build-week-africanmarketplace.herokuapp.com/api/users')
                    .then(res => {
                        console.log(name);
                        var found = res.data.find(function (element) {
                            return element.username === name;
                        });
                        // console.log(this.props);
                        console.log(props);
                        props.dispatch({ type: 'USERNAME', username: found.id });

                    })
                    .catch(err => console.log(err)); 
                localStorage.setItem('token', res.data.token);
                props.history.push('/market-price');
            })
            .catch(err => {
                console.log(err.response);
                alert("Wrong user or password");
            })
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required("Username is a required field"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is a required field"),
        email: Yup.string()
            .email('Invalid Email')
            .required("email is a required field")
    }),

})(Register);

// export default FormikRegister;
export default connect()(FormikRegister);

