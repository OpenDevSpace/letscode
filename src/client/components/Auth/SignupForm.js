import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import "../../styles/SignupForm.css"

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Hide overflow of body
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        return (
            <div className="signupComponent">
                <div className="signupFormBar">
                    <Form className="signupForm">
                        <h2>Create an Account</h2>
                        <Form.Input id="firstName" label="First name" required/>
                        <Form.Input id="lastName" label="Last name" required/>
                        <Form.Input id="emailInput" label='E-Mail' type="email" placeholder='your.name@mail.com'
                                    required/>
                        <Form.Input label='Enter Password' type='password' placeholder='s3cur3Pa55w0rd' required/>
                        <Form.Input label='Repeat Password' type='password' placeholder='s3cur3Pa55w0rd' required/>
                        <Button animated='fade' color='green' type='submit' size='big' centered>
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