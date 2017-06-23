import React, {Component} from 'react'
import Card from './CourseCard'
import {Segment, Container} from 'semantic-ui-react'
import courseData from '../../data/Courses'
import '../../styles/CoursesSegment.css'
import {Button} from "semantic-ui-react"


class AttendedCourses extends Component {
    render() {
        let courseInfo = courseData.map((course, index) => {
            return <Card course={course}/>;
        });
        return <Container fluid className="CoursesSegment">
                <Segment stacked={true}>
                    <h2>Your Courses</h2>
                    {courseInfo}
                </Segment>
        </Container>
    }
}

export default AttendedCourses