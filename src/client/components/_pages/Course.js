import React, {Component} from 'react'
import CourseFrame from "../Base/Frame";
import CourseDetails from "../Courses/CourseDetail";

class Course extends Component {
    render() {
        return (
            <CourseFrame>
                <CourseDetails courseID={this.props.match.params.number}/>
            </CourseFrame>
        )
    }
}

export default Course