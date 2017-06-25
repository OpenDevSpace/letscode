import React, {Component} from 'react'
import TaskStep from './TaskStep'
import {Step, Icon, Segment, Header, Checkbox, List, Button}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'
import taskData from '../../data/Tasks'


class TaskWrapper extends Component {
    render() {
        let counter = 0
        let taskInfo = taskData.map((task, index) => {
            return <TaskStep task={task}/>;
        });
        return (
            <div className="taskWrapper">
                <Step.Group fluid={true}>
                    <Step className="taskColumn">
                        <Segment vertical basic={true} color={"red"} className="taskSegment">
                            <Header as='h3'>
                                <Icon name='tasks' />
                                <Header.Content>
                                    {taskData[counter].title}
                                    <Header.Subheader>
                                        Some tasks
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <p className="taskText">
                                {taskData[counter].description}
                            </p>
                        </Segment>
                    </Step>

                    <Step className="taskColumn" color={"grey"}>
                        <Segment vertical basic={true} color={"orange"} className="taskSegment">
                            <Header as='h3'>
                                <Icon name="code"/>
                                <Header.Content>
                                    Whats the answer?
                                    <Header.Subheader>
                                        Mark right answers
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <List divided relaxed>
                                <List.Item>
                                    <Checkbox label={taskData[counter].option1} />
                                </List.Item>
                                <List.Item>
                                    <Checkbox label={taskData[counter].option2} />
                                </List.Item>
                                <List.Item>
                                    <Checkbox label={taskData[counter].option3} />
                                </List.Item>
                                <List.Item>
                                    <Checkbox label={taskData[counter].option4} />
                                </List.Item>
                            </List>
                        </Segment>
                    </Step>
                    <Step className="taskColumn" color={"grey"}>
                        <Segment vertical basic={true} color={"yellow"} className="taskSegment">
                            <Header as='h3'>
                                <Icon name='code'/>
                                <Header.Content>
                                    See if that was right
                                    <Header.Subheader>
                                        Check it!
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Button basic color='green' >Click me</Button>
                        </Segment>
                    </Step>
                </Step.Group>
            </div>
        )
    }
}

export default TaskWrapper