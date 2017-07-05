import React, {Component} from 'react'
import { Tab } from 'semantic-ui-react'
import CoursePane from '../Courses/CoursePane'
import CourseFrame from "../Base/Frame"

const panes = [
    { menuItem: 'All', render: () => <Tab.Pane><CoursePane level='0'/></Tab.Pane>, level: 0 },
    { menuItem: 'Easy', render: () => <Tab.Pane><CoursePane level='1'/></Tab.Pane>, level: 1 },
    { menuItem: 'Medium', render: () => <Tab.Pane><CoursePane level='2'/></Tab.Pane>, level: 2  },
    { menuItem: 'Advanced', render: () => <Tab.Pane><CoursePane level='3'/></Tab.Pane>, level: 3  },
]

class AllCourses extends Component {
    render() {
        return (
            <CourseFrame>
                <Tab panes={panes} />
            </CourseFrame>
        )
    }
}

export default AllCourses