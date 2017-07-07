import React, {Component} from 'react'
import TaskStep from './TaskStep'
import {Step, Icon, Segment, Header, Form, Checkbox, Radio, Button}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'
import taskData from '../../data/Tasks'
import TaskDefinition from "./TaskDefinition";
import TaskWorkspace from "./TaskWorkspace";

import $ from 'jquery'


class TaskWrapper extends Component {
    constructor(props) {
        super(props);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        $.get('http://localhost:8080/api/course/gettask/'+this.props.courseID+'/'+this.props.taskID)
            .done((data) => {
            console.log(data);
            });

        console.log(this.props);
    }
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        let counter = 1
        let taskInfo = taskData.map((task, index) => {
            return <TaskStep task={task}/>;
        });
        return (
            <div className="taskWrapper">
                <Step.Group fluid={true}>
                    <Step className="taskColumn">
                        <TaskDefinition currentTask={taskData[counter]}/>
                    </Step>
                    <Step className="taskColumn">
                        <TaskWorkspace currentTask={taskData[counter]}/>
                    </Step>
                    {
                        (taskData[counter].type === "coding")
                            ? (
                            <Step className="taskColumn">
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
                                    <Button basic color='green' onClick={[].forEach.call(document.querySelectorAll('.myCheckbox:checked'), function (cb) {
                                    })} >Click me</Button>
                                </Segment>
                            </Step>
                        ) : null
                    }
                </Step.Group>
            </div>
        )
    }
}

export default TaskWrapper