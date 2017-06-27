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
                <TaskWrapper type="task"/>
            </TaskFrame>
        )
    }
}

export default Task