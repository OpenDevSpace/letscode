import React, {Component} from 'react'
import TaskFrame from "../Base/Frame"
import TaskWrapper from '../Tasks/TaskWrapper'

class Task extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TaskFrame type="task">
                <TaskWrapper type="task" courseID={this.props.match.params.courseString} taskID={this.props.match.params.taskString}/>
            </TaskFrame>
        )
    }
}

export default Task