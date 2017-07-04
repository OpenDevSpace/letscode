import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import DiscoverCoursesSegment from '../Courses/DiscoverCoursesSegment'
import CoursesSegment from '../Courses/CoursesSegment'
import Sidebar from './Sidebar'
import '../../styles/Frame.css'
import $ from 'jquery'


class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };
        this.state = {
            firstName: '',
            courses: [],
            role: ''
        };

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        $.get("http://localhost:8080/api/user/afterlogin")
            .fail(() => {
                console.log("Failure!");
            })
            .done((data) => {
                this.setState({
                    firstName: data.firstName,
                    courses: data.courses,
                    role: data.role
                })
            });
    }

    renderChildren(props) {
        return React.Children.map(props.children, child => {
            console.log(child.type);
            if(child.type === CoursesSegment || child.type === DiscoverCoursesSegment) {
                return React.cloneElement(child, {
                    firstName: this.state.firstName,
                    courses: this.state.courses,
                    role: this.state.role
                })
            } else {
                return child;
            }
        })
    }



    render() {
        return (
            <div className="mainContainer">
                <Header/>
                <div className="bodyDiv">
                    <div className="sidebarDiv" >
                        <Sidebar userRole={this.state.role} type={this.props.type}/>
                    </div>
                    <div className="dashboardContent">
                        {this.renderChildren(this.props)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Frame
