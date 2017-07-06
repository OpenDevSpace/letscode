import React, {Component} from 'react'
import {Accordion, Icon, Header, Form, Button} from 'semantic-ui-react'
import $ from 'jquery'

class AccountSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updatePassword: {
                oldPassword: '',
                newPassword: '',
                confirm: ''
            },
            email: ''
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    updateEmail(evt) {
        $.post('http://localhost:8080/api/user/update/'+this.state._id, {
            _id: this.props._id,
            email: this.state.email
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
    }

    handleConfirmPasswordChange(evt) {
        this.passwordChange('confirm', evt);
    }

    updatePassword(evt) {
        $.post('http://localhost:8080/api/user/update/'+this.state._id, {
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
                            <Form.Input label="Update your email" placeholder="my@fancymail.com" onChange={this.handleEmailChange} />
                            <Button label="Update Email" onClick={this.updateEmail.bind(this)} />
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
                        <Form id="changePasswordForm">
                            <Form.Input type="password" label="Old password" placeholder="s3cur3Pa55w0rd" onChange={this.handleOldPasswordChange} />
                            <Form.Input type="password" label="New password" placeholder="s3cur3Pa55w0rd" onChange={this.handleNewPasswordChange} />
                            <Form.Input type="password" label="Confirm password" placeholder="s3cur3Pa55w0rd" onChange={this.handleConfirmPasswordChange} />
                            <Button label="Update Password" onClick={this.updatePassword.bind(this)} />
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