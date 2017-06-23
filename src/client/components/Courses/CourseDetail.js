import React, {Component} from 'react'
import {Segment, Progress} from 'semantic-ui-react'
import courseData from '../../data/Courses'
import '../../styles/CourseDetail.css'


class CourseDetails extends Component {
    state = {percent: 43}

    increment = () => this.setState({
        percent: this.state.percent >= 100 ? 0 : this.state.percent + 20,
    })

    render() {
        let selectedCourse = this.props.courseID;

        return (
            <Segment raised className="courseDetailSegment">
                <Segment vertical>
                    <h2>{courseData[selectedCourse].name}</h2>
                    {courseData[selectedCourse].description}
                </Segment>
                <Segment vertical>
                    <h3>Next Task</h3>
                </Segment>
                <Segment vertical>
                    <h3>Your Progress</h3>
                    <Progress className="courseProgress" percent={this.state.percent} indicating/>
                </Segment>
            </Segment>
        )
    }
}

export default CourseDetails