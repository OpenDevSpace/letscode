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

        if (this.props.type === "task") {
            this.state.isToggleOn = false
        }

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
            $('.dashboardContent').animate({
                'padding': '5rem 1rem 1rem 7rem'
            }, "fast")
        }
        else {
            $('.sidebar').animate({
                'padding-right': '1.5rem',
            }, "fast")
            $('.dashboardContent').animate({
                'padding': '5rem 1rem 1rem 15rem'
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
                                        ? <Button className="sidebarButtonText" color='blue'>Dashboard</Button>
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
                                        ? <Button className="sidebarButtonText" color='blue'>All Courses</Button>
                                        : null
                                }
                            </Button.Group>
                        </Link>
                    </List.Item>
                    {
                        this.props.userRole === 'Admin' || this.props.userRole === 'Moderator'
                            ? <List.Item>
                            <Link to="/admin/courselist">
                                <Button.Group>
                                    <Button icon='bars' basic color='orange'/>
                                    {
                                        this.state.isToggleOn
                                            ? <Button className="sidebarButtonText" color='orange'>Courses</Button>
                                            : null
                                    }
                                </Button.Group>
                            </Link>
                        </List.Item>
                            : null
                    }
                    {
                        this.props.userRole === 'Admin'
                            ? <List.Item>
                            <Link to="/admin/userlist">
                                <Button.Group>
                                    <Button icon='users' basic color='orange'/>
                                    {
                                        this.state.isToggleOn
                                            ? <Button className="sidebarButtonText" color='orange'>Manage Users</Button>
                                            : null
                                    }
                                </Button.Group>
                            </Link>
                        </List.Item>
                            : null
                    }
                </List>

                <List divided relaxed className="bottomList">
                    <List.Item>
                        <Link to="/settings">
                            <Button.Group>
                                <Button icon='setting' basic color='blue'/>
                                {
                                    this.state.isToggleOn
                                        ? <Button className="sidebarButtonText" color='blue'>Settings</Button>
                                        : null
                                }
                            </Button.Group>
                        </Link>
                    </List.Item>
                    <List.Item >
                        <Link to="/">
                            <Button.Group onClick={() => {localStorage.removeItem("odslearncode")}}>
                                <Button icon='sign out' basic color='blue' />
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
