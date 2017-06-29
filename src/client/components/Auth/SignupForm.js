import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import "../../styles/SignupForm.css"
import $ from 'jquery'

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    signupSubmit(){
        // Attach a submit handler to the form
        $( "#signupForm" ).submit(function( event ) {

            // Stop form from submitting normally
            event.preventDefault();

            // Get some values from elements on the page:
            var $form = $( this ),
                firstName = $form.find( "input[id='firstName']" ).val(),
                lastName = $form.find( "input[id='lastName']" ).val(),
                emailInput = $form.find( "input[id='emailInput']" ).val(),
                password = $form.find( "input[type='password']" ).val(),
                url = $form.attr( "localhost:8080/api/auth/register" );

            // Send the data using post
            var posting = $.post( url, {
                firstName: firstName,
                lastName: lastName,
                emailInput: emailInput,
                password: password,
            } )
                .done((data) => {
                    console.log(data);
                });
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
                        <Form.Input id="firstName" label="First name" required/>
                        <Form.Input id="lastName" label="Last name" required/>
                        <Form.Input id="emailInput" label='E-Mail' type="email" placeholder='your.name@mail.com'
                                    required/>
                        <Form.Input label='Enter Password' type='password' placeholder='s3cur3Pa55w0rd' required/>
                        <Form.Input label='Repeat Password' type='password' placeholder='s3cur3Pa55w0rd' required/>
                        <Button animated='fade' color='green' type='submit' size='big' centered onClick={ () => this.signupSubmit()}>
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