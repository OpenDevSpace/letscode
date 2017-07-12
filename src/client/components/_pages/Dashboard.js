import React, {Component} from 'react'
import DashboardFrame from "../Base/Frame";
import CoursesSegment from "../Courses/CoursesSegment"
import DiscoverCoursesSegment from "../Courses/DiscoverCoursesSegment"
import {Divider} from 'semantic-ui-react'


class Dashboard extends Component {
    render() {
        return (
            <DashboardFrame>
                <CoursesSegment courseNumber="2"/>
                {/*
                <Divider />
                <DiscoverCoursesSegment/>
                */}
            </DashboardFrame>
        )
    }
}

export default Dashboard