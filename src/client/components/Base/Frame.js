import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Sidebar from './Sidebar'
import CoursesSegment from '../Courses/CoursesSegment'
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



    render() {
        const children = this.props.children
        return (
            <div className="mainContainer">
                <Header/>
                <div className="bodyDiv">
                    <div className="sidebarDiv" >
                        <Sidebar userRole={this.state.role} type={this.props.type}/>
                    </div>
                    <div className="dashboardContent">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

Frame.propTypes = {
    children: PropTypes.element.isRequired
}
export default Frame
