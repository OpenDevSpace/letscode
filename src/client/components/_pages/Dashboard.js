import React, {Component} from 'react'
import DashboardFrame from "../Base/Frame";
import CoursesSegment from "../Courses/CoursesSegment"
import DiscoverCourses from "../Courses/DiscoverCoursesSegment"
import {Divider} from 'semantic-ui-react'


class Dashboard extends Component {
    render() {
        return (
            <DashboardFrame>
                <CoursesSegment/>
                <Divider />
                <DiscoverCourses/>
            </DashboardFrame>
        )
    }
}

export default Dashboard