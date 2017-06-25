import React, {Component} from 'react'
import {Header} from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'


class TaskWorkspace extends Component {
    render() {
        return (
            <div className="taskContainer">
                <Header as='h3' content={"Workspace"}/>
            </div>
        )
    }
}

export default TaskWorkspace