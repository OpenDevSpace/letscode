import React, {Component} from 'react'
import Card from './CourseCard'
import {Segment, Grid} from 'semantic-ui-react'
import courseData from '../../data/Courses'

class DiscoverCourses extends Component {
    render() {
        let courseInfo = courseData.map((course, index) => {
            return <Card course={course}/>;
        });
        return <div className="attendedCourses">
            <Segment raised>
                <h2>Discover new Courses</h2>
                <Grid>
                    {courseInfo}
                </Grid>
            </Segment>
        </div>
    }
}

export default DiscoverCourses