import React, {Component} from 'react'
import TaskFrame from "../Base/Frame"
import TaskWrapper from '../Tasks/TaskWrapper'

class Task extends Component {
    render() {
        return (
            <TaskFrame>
                <TaskWrapper/>
            </TaskFrame>
        )
    }
}

export default Task