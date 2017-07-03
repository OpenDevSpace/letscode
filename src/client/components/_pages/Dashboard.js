import React, {Component} from 'react'
import DashboardFrame from "../Base/Frame";
import CoursesSegment from "../Courses/CoursesSegment"
import DiscoverCourses from "../Courses/DiscoverCoursesSegment"
import {Divider} from 'semantic-ui-react'

import $ from 'jquery'


class Dashboard extends Component {
    constructor(props) {
        super(props);

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