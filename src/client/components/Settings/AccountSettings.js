import React, {Component} from 'react'
import {Accordion, Icon, Header, Form, Button, Message} from 'semantic-ui-react'
import $ from 'jquery'

class AccountSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updatePassword: {
                oldPassword: '',
                newPassword: '',
                confirm: '',
                wrongPassword: false,
                passwordMatch: false,
                errorMessage: '',
                passwordWarning: false
            },
            email: ''
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailPasswordChange = this.handleEmailPasswordChange.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    handleEmailPasswordChange(evt) {
        this.setState({
            password: evt.target.value
        });

    }

    updateEmail(evt) {
        $.post('http://localhost:8080/api/user/update/' + this.props._id, {
            _id: this.props._id,
            email: this.state.email,
            password: this.state.password,
            userSettingsUpdate: true
        })
            .done((data) => {
                console.log(data);
            });
    }

    passwordChange(field, evt) {
        var temp = this.state.updatePassword;
        temp[field] = evt.target.value;
        this.setState({
            updatePassword: temp
        });
    }

    handleOldPasswordChange(evt) {
        this.passwordChange('oldPassword', evt);
    }

    handleNewPasswordChange(evt) {
        this.passwordChange('newPassword', evt);
        this.handlePasswordChange(evt);
    }

    handleConfirmPasswordChange(evt) {
        this.passwordChange('confirm', evt);
        this.handleRepeatPasswordChange(evt);
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

    updatePassword(evt) {
        $.post('http://localhost:8080/api/user/update/' + this.props._id, {
            _id: this.props._id,
            data: this.state.updatePassword
        })
            .done((data) => {
                console.log(data);
            });
    }

    render() {
        return (
            <Accordion styled exclusive={false} defaultActiveIndex={1} fluid={true} className="settings">
                <Accordion.Title className="inverted">
                    <Header as='h3' color='blue'>
                        <Icon name='dropdown'/>
                        Account Details
                    </Header>
                </Accordion.Title>
                <Accordion.Content>
                    <p>
                        <Form>
                            <Form.Input label="Update your email" placeholder="my@fancymail.com"
                                        onChange={this.handleEmailChange}/>
                            <Form.Input label="Enter your password" type="password" placeholder="s3cur3Pa55w0rd"
                                        onChange={this.handleEmailPasswordChange}/>
                            <Button positive content="Update Email" onClick={this.updateEmail.bind(this)}/>
                        </Form>
                    </p>
                </Accordion.Content>
                <Accordion.Title>
                    <Header as='h3' color='blue'>
                        <Icon name='dropdown'/>
                        Security
                    </Header>
                </Accordion.Title>
                <Accordion.Content>
                    <p>
                        <Form id="changePasswordForm" error={this.state.wrongPassword}
                              success={this.state.passwordMatch} warning={this.state.passwordWarning}>
                            <Form.Input type="password" label="Old password" placeholder="s3cur3Pa55w0rd"
                                        onChange={this.handleOldPasswordChange}/>


                            <Form.Input id="password" type="password" label="New password" placeholder="s3cur3Pa55w0rd"
                                        onChange={this.handleNewPasswordChange}
                                        error={this.state.wrongPassword}
                                        success={this.state.passwordMatch}/>
                            <Message
                                warning
                                header={this.state.errorMessage}
                            />

                            <Form.Input id="repeatPassword" type="password" label="Confirm password"
                                        placeholder="s3cur3Pa55w0rd" onChange={this.handleConfirmPasswordChange}
                                        error={this.state.wrongPassword}
                                        success={this.state.passwordMatch}/>

                            <Message
                                success
                                header='Form Completed'
                            />
                            <Message
                                error
                                header='Passwords don`t match'
                                content='Please check your passwords'
                            />
                            <Button positive content="Update Password" onClick={this.updatePassword.bind(this)}/>
                        </Form>
                    </p>
                </Accordion.Content>
                <Accordion.Title>
                    <Header as='h3' color='blue'>
                        <Icon name='dropdown'/>
                        Notifications
                    </Header>
                </Accordion.Title>
                <Accordion.Content>
                    <p>
                        Here you can change notification settings
                    </p>
                </Accordion.Content>
            </Accordion>
        )
    }
}

export default AccountSettings