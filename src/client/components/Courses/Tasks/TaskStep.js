import React, {Component} from 'react'
import {Step, Icon, Segment, Header}from 'semantic-ui-react'
import '../../../styles/TaskWrapper.css'


class TaskStep extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Step className="taskColumn">
                <Segment vertical basic={true} color={"red"} className="taskSegment">
                    <Header as='h3'>
                        <Icon name='tasks' />
                        <Header.Content>
                            {this.props.currentTask.title}
                            <Header.Subheader>
                                Some tasks
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <p className="taskText">
                        {this.props.currentTask.description}
                    </p>
                </Segment>
            </Step>
        )
    }
}

export default TaskStep