import React, {Component} from 'react'
import {Icon, Header} from 'semantic-ui-react'
import "../../styles/AuthPage.css"
import Login from '../Auth/LoginForm'
import Signup from '../Auth/SignupForm'


class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupVisible: false
        }
    }


    handleClick() {
        this.setState(prevState => ({
            signupVisible: !prevState.signupVisible
        }));
    }

    render() {
        // Hide overflow of body
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        return (
            <div className="loginScreen">
                <img className="loginScreenImage" src='blur.jpg' alt="Image of a notebook with code"/>
                <div className="pageName">
                    <Header icon textAlign='center'>
                        <Icon name='laptop' circular size='massive' color='blue' className="titleIcon"/>
                        <Header.Content>
                            <h1 className="pageNameTitle">localhorst:3000</h1>
                            <h3 className="pageNameSubtitle">Learn to code - even if your name in not Horst</h3>
                        </Header.Content>
                    </Header>
                </div>
                {
                    this.state.signupVisible
                        ? <Signup onClick={() => this.handleClick()}/>
                        : <Login onClick={() => this.handleClick()}/>
                }
            </div>
        )
    }
}

export default AuthPage