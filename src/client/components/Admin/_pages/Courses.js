import React, {Component} from 'react'
import ListFrame from "../../Base/Frame";
import CourseOverview from "../Courses/CourseList";

class AdminCourseList extends Component {
    render() {
        return (
            <ListFrame>
                <CourseOverview/>
            </ListFrame>
        )
    }
}

export default AdminCourseList