import React, {Component} from 'react'
import Card from './CourseCard'
import {Segment, Container} from 'semantic-ui-react'
import courseData from '../../data/Courses'

class DiscoverCoursesSegment extends Component {
    render() {
        let courseInfo = courseData.map((course, index) => {
            return <Card course={course}/>;
        });
        return <Container fluid className="attendedCourses">
            <Segment stacked={true}>
                <h2>Discover new Courses</h2>
                {courseInfo}
            </Segment>
        </Container>
    }
}

export default DiscoverCoursesSegment