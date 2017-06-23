import React, {Component} from 'react'
import {List, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../styles/Sidebar.css'
import $ from "jquery"


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));

        if (this.state.isToggleOn) {
            $('.sidebar').animate({
                'padding-right': '1rem',
            }, "fast")
        }
        else {
            $('.sidebar').animate({
                'padding-right': '1.5rem',
            }, "fast")
        }
    }

    render() {
        return (
            <div className="sidebar">
                <Button color='blue'
                        icon={this.state.isToggleOn ? 'chevron left' : 'chevron right'} onClick={this.handleClick}>
                </Button>
                <List divided relaxed className="topList">
                    <List.Item >
                        <Link to="/dashboard">
                            <Button.Group>
                                <Button icon='home' basic color='blue'/>
                                {
                                    this.state.isToggleOn
                                        ? <Button className="sidebarButtonText" color='blue'>My Profile</Button>
                                        : null
                                }
                            </Button.Group>
                        </Link>
                    </List.Item>
                    <List.Item>
                        <Link to="/courselist">
                            <Button.Group>
                                <Button icon='code' basic color='blue'/>
                                {
                                    this.state.isToggleOn
                                        ? <Button className="sidebarButtonText" color='blue'>My Courses</Button>
                                        : null
                                }
                            </Button.Group>
                        </Link>
                    </List.Item>
                </List>

                <List divided relaxed className="bottomList">
                    <List.Item>
                        <Button.Group>
                            <Button icon='setting' basic color='blue'/>
                            {
                                this.state.isToggleOn
                                    ? <Button className="sidebarButtonText" color='blue'>Settings</Button>
                                    : null
                            }
                        </Button.Group>
                    </List.Item>
                    <List.Item >
                        <Link to="/">
                            <Button.Group>
                                <Button icon='sign out' basic color='blue'/>
                                {
                                    this.state.isToggleOn
                                        ? <Button className="sidebarButtonText" color='blue'>Logout</Button>
                                        : null
                                }
                            </Button.Group>
                        </Link>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default Sidebar
