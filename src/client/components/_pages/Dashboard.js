import React, {Component} from 'react'
import DashboardFrame from "../Base/Frame";
import CoursesSegment from "../Courses/CoursesSegment"
import DiscoverCourses from "../Courses/DiscoverCoursesSegment"
import {Divider} from 'semantic-ui-react'

import $ from 'jquery'


class Dashboard extends Component {

    constructor(props) {
        super(props);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
        }
        });

        $.get("http://localhost:8080/api/user/list")
            .fail(() => {
            console.log("Failure!");
            })
            .done((data) => {
            console.log(data);
            });
    }
    render() {
        return (
            <DashboardFrame>
                <CoursesSegment courseNumber="2"/>
                <Divider />
                <DiscoverCourses/>
            </DashboardFrame>
        )
    }
}

export default Dashboard