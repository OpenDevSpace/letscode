import React, {Component} from 'react'
import {Form, Button, Dimmer, Loader, Modal, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import "../../styles/LoginForm.css"


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: '',
            requestActive: false,
            open: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(evt) {
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

        this.setState(prevState => ({
            requestActive: !prevState.requestActive
        }));

        $.post("http://localhost:8080/auth/login", {
            user: this.state.user,
            password: this.state.password
        })
            .done((data) => {
                localStorage.setItem("odslearncode", data.token);
                window.location.replace('/dashboard');
            })
            .fail(
                this.show('blurring')
            );
    }

    show = (dimmer) => () => this.setState({dimmer, open: true})
    close = () => this.setState({open: false, requestActive: false})

    render() {
        const {open, dimmer} = this.state
        // Hide overflow of body
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        return (
            <div className="loginComponent">
                <div className="loginFormBar">
                    <Dimmer active={this.state.requestActive}>
                        <Loader/>
                    </Dimmer>
                    <Form className="loginForm">
						<img src="./LetsCode2.svg"/>

                        <h2>Sign in</h2>
                        <Form.Input id="emailInput" label='E-Mail' type="email" placeholder='your.name@mail.com'
                                    onChange={this.handleEmailChange} required autoFocus/>
                        <Form.Input label='Enter Password' type='password' placeholder='s3cur3Pa55w0rd'
                                    onChange={this.handlePasswordChange} required/>
                        <Button type='submit' onClick={this.login.bind(this)}>Login</Button><Link to="/"
                                                                                                  id="forgotPassword">Forgot
                        Password?</Link>
                    </Form>
                    <h2>Not registered?</h2>
                    <Button onClick={this.props.onClick}>Sign Up</Button>
                </div>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Login failed</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>The entered password or e-mail was incorrect. Please try again.</Header>
                            <p>Don't have an account? Go to signup.</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark' labelPosition='right' content="Try again"
                                onClick={this.close}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default LoginForm
