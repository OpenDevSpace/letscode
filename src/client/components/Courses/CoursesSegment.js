import React, {Component} from 'react'
import Card from './CourseCard'
import ShowMore from './ShowMoreCard'
import {Segment, Container, Header} from 'semantic-ui-react'
import courseData from '../../data/Courses'
import '../../styles/CoursesSegment.css'


class AttendedCourses extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let courseInfo = courseData.map((course, index) => {
            let n = Number(this.props.courseNumber)
            if(index < n){
                return <Card course={course}/>
            } else if(index === n){
                return <ShowMore/>
            }
        });
        return <Container fluid className="CoursesSegment">
                <Segment>
                    <h2>Your Courses</h2>
                    {courseInfo}
                </Segment>
        </Container>
    }
}

export default AttendedCourses