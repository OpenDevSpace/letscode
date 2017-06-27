import React, {Component} from 'react'
import {Container} from 'semantic-ui-react'
import courseData from '../../data/Courses'
import Card from './CourseCard'



class CoursePane extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let courseInfo = courseData.map((course, index) => {
            let n = Number(this.props.level)
            if(courseData[index].level === n){
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