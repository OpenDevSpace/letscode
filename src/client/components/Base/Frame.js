import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import DiscoverCoursesSegment from '../Courses/DiscoverCoursesSegment'
import CoursesSegment from '../Courses/CoursesSegment'
import AccountSettings from '../Settings/AccountSettings'
import TaskWrapper from '../Tasks/TaskWrapper'
import Sidebar from './Sidebar'
import CourseDetail from '../Courses/CourseDetail'
import '../../styles/Frame.css'
import $ from 'jquery'



class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };
        this.state = {
            _id: '',
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
                    _id: data._id,
                    firstName: data.firstName,
                    courses: data.courses,
                    role: data.role
                })
            });
    }

    renderChildren(props) {
        return React.Children.map(props.children, child => {
            if(child.type === CoursesSegment || child.type === DiscoverCoursesSegment
                || child.type === AccountSettings || child.type === CourseDetail || child.type === TaskWrapper)  {
                return React.cloneElement(child, {
                    _id: this.state._id,
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
