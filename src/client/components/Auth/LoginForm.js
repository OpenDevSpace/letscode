import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import "../../styles/LoginForm.css"


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange (evt) {
        this.setState({
            user: evt.target.value
        });
    }

    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    login(evt) {

        $.post("http://localhost:8080/auth/login", {
            user: this.state.user,
            password: this.state.password
        }).done((data) => {
            console.log(data);
        });

        console.log("Login request");
        console.log(this.state.user);
    }

    render() {
        // Hide overflow of body
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        return (
            <div className="loginComponent">
                <div className="loginFormBar">
                    <Form className="loginForm">
                        <h2>Sign in</h2>
                        <Form.Input id="emailInput" label='E-Mail' type="email" placeholder='your.name@mail.com' onChange={this.handleEmailChange} required autoFocus/>
                        <Form.Input label='Enter Password' type='password' placeholder='s3cur3Pa55w0rd' onChange={this.handlePasswordChange} required/>
                        <Button type='submit' onClick={this.login.bind(this)}>Login</Button><Link to="/dashboard" id="forgotPassword">Forgot Password?</Link>
                    </Form>
                    <h2>Not registered?</h2>
                    <Button onClick={this.props.onClick}>Sign Up</Button>
                </div>
            </div>
        )
    }
}

export default LoginForm