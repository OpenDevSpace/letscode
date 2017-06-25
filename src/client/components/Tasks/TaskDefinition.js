import React, {Component} from 'react'
import {Header} from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'


class TaskDefinition extends Component {
    render() {
        return (
            <div className="taskContainer">
                <Header as='h3' content={"Task Definition"}/>

            </div>
        )
    }
}

export default TaskDefinition