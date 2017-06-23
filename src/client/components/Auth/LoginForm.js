import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import "../../styles/LoginForm.css"


class LoginForm extends Component {
    render() {
        // Hide overflow of body
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        return (
            <div className="loginComponent">
                <div className="loginFormBar">
                    <Form className="loginForm">
                        <h2>Sign in</h2>
                        <Form.Input id="emailInput" label='E-Mail' type="email" placeholder='your.name@mail.com' required autoFocus/>
                        <Form.Input label='Enter Password' type='password' placeholder='s3cur3Pa55w0rd' required/>
                        <Button type='submit'>Login</Button><Link to="/dashboard" id="forgotPassword">Forgot Password?</Link>
                    </Form>
                    <h2>Not registered?</h2>
                    <Button onClick={this.props.onClick}>Sign Up</Button>
                </div>
            </div>
        )
    }
}

export default LoginForm