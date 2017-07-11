import React, {Component} from 'react'
import TaskStep from './TaskStep'
import {Step, Icon, Segment, Header, Form, Checkbox, Radio, Button}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'
import TaskDefinition from "./TaskDefinition";
import TaskWorkspace from "./TaskWorkspace";

import $ from 'jquery'

class TaskWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: {},
            options: []
        }

        this.handleGetNextTask = this.handleGetNextTask.bind(this);
        this.handleFetchedValues = this.handleFetchedValues.bind(this);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        $.get('http://localhost:8080/api/course/gettask/'+this.props.courseID+'/'+this.props.taskID)
            .done((data) => {
                this.handleFetchedValues(data)
            });
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    handleGetNextTask(){
        $.get('http://localhost:8080/api/course/getnexttask/'+this.props.courseID+'/'+this.props.taskID)
            .done((data) => {
                this.handleFetchedValues(data)
            });
    }

    handleFetchedValues(data){
        let options = this.state.options;

        if(data.data.taskType === 'coding'){
            for (let i = 0; i < data.data.options.falseAnswers.length; i++){
                options.push(data.data.options.falseAnswers[i]);
            }
        } else {
            for (let i = 0; i < data.data.options.falseAnswers.length; i++){
                options.push(data.data.options.falseAnswers[i]);
            }
            for (let i = 0; i < data.data.options.correctAnswers.length; i++){
                options.push(data.data.options.correctAnswers[i]);
            }
        }

        this.setState({
            currentTask: data.data,
            options: this.shuffle(options)
        })
    }

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state;

        return (
            <div className="taskWrapper">
                <Step.Group fluid={true}>
                    <Step className="taskColumn">
                        <TaskDefinition currentTask={this.state.currentTask}/>
                    </Step>
                    <Step className="taskColumn">
                        <TaskWorkspace currentTask={this.state.currentTask}
                                       options={this.state.options}
                                       userID={this.props._id}
                                       courseID={this.props.courseID}
                                       onClick={this.handleGetNextTask} />
                    </Step>
                    {
                        (this.state.currentTask.taskType === "coding")
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
                                    <Form >
                                        <Form.TextArea />
                                        <Button basic fluid color='green' onClick={[].forEach.call(document.querySelectorAll('.myCheckbox:checked'), function (cb) {
                                    })} >Check answer</Button>
                                    </Form>
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