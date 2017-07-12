import React, {Component} from 'react'
import {Container} from 'semantic-ui-react'
import Card from './CourseCard'

import $ from 'jquery'



class CoursePane extends Component {
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
            let n = Number(this.props.level);
            if(course.level === n){
                return <Card course={course}/>
            } else if (n === 0){
                return <Card course={course}/>
            }
        });
        return (
            <Container fluid className="CoursesSegment">
                    {courseInfo}
            </Container>
        )
    }
}

export default CoursePane