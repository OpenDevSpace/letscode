import React, {Component} from 'react'
import Card from './CourseCard'
import {Segment, Container} from 'semantic-ui-react'

import $ from 'jquery'


class DiscoverCoursesSegment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });
        $.get('http://localhost:8080/api/course/listactive')
            .done((courses) => {
                this.setState({
                    courses: courses.data
                });
            });
    }

    render() {
        let courseInfo = this.state.courses.map((course, index) => {
            return <Card course={course}/>
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