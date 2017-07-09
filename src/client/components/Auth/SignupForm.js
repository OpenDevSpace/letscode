import React, {Component} from 'react'
import {Form, Button, Modal, Header, Dimmer, Loader, Message} from 'semantic-ui-react'
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
            password: '',
            requestActive: false,
            open: false,
            wrongPassword: false,
            passwordMatch: false,
            errorMessage: '',
            passwordWarning: false
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
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
        if ($('#password').val().length < 6) {
            this.setState({
                errorMessage: 'The entered password is too short.',
                passwordWarning: true
            })
        } else if ($('#password').val().length > 71) {
            this.setState({
                errorMessage: 'The entered password is too long, sorry.',
                passwordWarning: true
            })
        } else if ($('#password').val().search(/\d/) === -1) {
            this.setState({
                errorMessage: 'Please use numbers as well.',
                passwordWarning: true
            })
        } else if ($('#password').val().search(/[a-zA-Z]/) === -1) {
            this.setState({
                errorMessage: 'Please use letters as well.',
                passwordWarning: true
            })
        } else {
            this.setState({
                password: evt.target.value,
                passwordWarning: false
            });
        }
    }

    handleRepeatPasswordChange(evt) {
        if (($('#password').val().length === $('#repeatPassword').val().length) && ($('#password').val() !== $('#repeatPassword').val())) {
            this.setState({
                passwordMatch: false,
                wrongPassword: true
            })
        } else if (($('#password').val().length === $('#repeatPassword').val().length) && ($('#password').val() === $('#repeatPassword').val())) {
            this.setState({
                wrongPassword: false,
                passwordMatch: true
            })
        }
        else {
            this.setState({
                passwordMatch: false,
                wrongPassword: false
            })
        }
    }

    handleSignupAction(evt) {


        if(!this.state.errorMessage && !this.state.wrongPassword && !this.state.passwordMatch && $('#signupForm')[0].checkValidity()){
            this.setState(prevState => ({
                requestActive: !prevState.requestActive
            }));

            $.post("http://localhost:8080/auth/register", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }).done((data) => {
                this.show('blurring');
                window.location.replace('/');
            });
        }


    }

    show = (dimmer) => () => this.setState({dimmer, open: true})
    close = () => {
        this.setState({open: false, requestActive: false});
        window.location.replace('/');
    }

    render() {
        const {open, dimmer} = this.state;
        // Hide overflow of body
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        return (
            <div className="signupComponent">
                <div className="signupFormBar">
                    <Dimmer active={this.state.requestActive}>
                        <Loader />
                    </Dimmer>
                    <Form className="signupForm" id="signupForm" error={this.state.wrongPassword}
                          success={this.state.passwordMatch} warning={this.state.passwordWarning}>
                        <h2>Create an Account</h2>
                        <Form.Input id="firstName" label="First name" onChange={this.handleFirstNameChange} required/>
                        <Form.Input id="lastName" label="Last name" onChange={this.handleLastNameChange} required/>
                        <Form.Input id="emailInput" label='E-Mail' type="email" placeholder='your.name@mail.com'
                                    onChange={this.handleEmailChange}
                                    required/>
                        <Form.Input id="password" label='Enter Password' type='password' placeholder='s3cur3Pa55w0rd'
                                    onChange={this.handlePasswordChange} required error={this.state.wrongPassword}
                                    success={this.state.passwordMatch}/>
                        <Message
                            warning
                            header={this.state.errorMessage}
                        />
                        <Form.Input id="repeatPassword" label='Repeat Password' type='password'
                                    placeholder='s3cur3Pa55w0rd' onChange={this.handleRepeatPasswordChange} required
                                    error={this.state.wrongPassword} success={this.state.passwordMatch}/>
                        <Message
                            success
                            header='Form Completed'
                        />
                        <Message
                            error
                            header='Passwords don`t match'
                            content='Please check your passwords'
                        />
                        <Button animated='fade' color='green' type='submit' size='big'
                                onClick={this.handleSignupAction.bind(this)}>
                            <Button.Content visible>
                                Ready?
                            </Button.Content>
                            <Button.Content hidden>
                                Let' go
                            </Button.Content>
                        </Button>
                    </Form>
                    <h2>Already registered?</h2>
                    <Button onClick={this.props.onClick}>Login</Button>
                </div>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Success!</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>Great, your account was created. Now you can log in.</Header>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark' labelPosition='right' content="Ok" onClick={this.close}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Signup


/** TODO: Password check and success message on register (check your mails) **/