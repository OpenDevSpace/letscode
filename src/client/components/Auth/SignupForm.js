import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import "../../styles/SignupForm.css"
import $ from 'jquery'
var bcrypt = require('bcryptjs')
class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleFirstNameChange(evt) {
        this.setState({
            firstName: evt.target.value
        });
    }

    handleLastNameChange(evt) {
        this.setState({
            lastName: evt.target.value
        });
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    handleSignupAction(evt) {
        $.post("http://localhost:8080/auth/register", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }).done((data) => {
            console.log(data);
        });
    }

    render() {
        // Hide overflow of body
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        return (
            <div className="signupComponent">
                <div className="signupFormBar">
                    <Form className="signupForm" id="signupForm">
                        <h2>Create an Account</h2>
                        <Form.Input id="firstName" label="First name"  onChange={this.handleFirstNameChange} required/>
                        <Form.Input id="lastName" label="Last name" onChange={this.handleLastNameChange} required/>
                        <Form.Input id="emailInput" label='E-Mail' type="email" placeholder='your.name@mail.com' onChange={this.handleEmailChange}
                                    required/>
                        <Form.Input label='Enter Password' type='password' placeholder='s3cur3Pa55w0rd' onChange={this.handlePasswordChange} required/>
                        <Form.Input label='Repeat Password' type='password' placeholder='s3cur3Pa55w0rd' required/>
                        <Button animated='fade' color='green' type='submit' size='big' centered onClick={this.handleSignupAction.bind(this)}>
                            <Button.Content visible>
                                Ready?
                            </Button.Content>
                            <Button.Content hidden>
                                Let' go
                            </Button.Content>
                        </Button>
                    </Form>
                    <h2>Already registered?</h2>
                    <Button onClick={this.props.onClick} >Login</Button>
                </div>
            </div>
        )
    }
}

export default Signup