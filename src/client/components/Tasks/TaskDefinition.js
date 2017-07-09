import React, {Component} from 'react'
import {Icon, Segment, Header}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'


class TaskDefinition extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Segment vertical basic={true} color={"red"} className="taskSegment">
                <Header as='h3'>
                    <Icon name='tasks' />
                    <Header.Content>
                        {this.props.currentTask.title}
                        <Header.Subheader>
                            Answer the task
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <p className="taskText">
                    {this.props.currentTask.introduction}
                </p>
                <br/>
            </Segment>
        )
    }
}

export default TaskDefinition