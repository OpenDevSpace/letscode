import React, {Component} from 'react'
import {Step, Icon, Segment, Header, Form}from 'semantic-ui-react'
import '../../../styles/TaskWrapper.css'
import TaskDefinition from "./TaskDefinition";
import TaskWorkspace from "./TaskWorkspace";

import $ from 'jquery'

class TaskWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: {},
            options: [],
            answerRight: false,
            answerWrong: false,
            nextTaskID: '',
            allTasks: []
        }


        this.handleNextTask = this.handleNextTask.bind(this);
        this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
        this.handleFetchedValues = this.handleFetchedValues.bind(this);
        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        $.get('http://localhost:8080/api/course/gettask/' + this.props.courseID + '/' + this.props.taskID)
            .done((data) => {
                this.handleFetchedValues(data.tasks);
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

    handleCheckAnswer(answers) {
        $.post('http://localhost:8080/api/course/checktask/' + this.props.courseID + "/" + this.state.currentTask._id, {
            answers: answers
        })
            .done((data) => {
                if (data.success) {
                    this.setState({
                        answerWrong: false,
                        answerRight: true
                    });
                } else {
                    this.setState({
                        answerRight: false,
                        answerWrong: true
                    });
                }
            });

    }

    handleFetchedValues(data) {
        let taskIndex = data.map((task, index) => {
            return task._id.toString();
        }).indexOf(this.props.taskID.toString());

        this.setState({
            allTasks: data,
            currentTask: data[taskIndex],
            options: this.shuffle(data[taskIndex].combinedTasks),
        })
    }

    handleNextTask() {
        let taskIndex = this.state.allTasks.map((task, index) => {
            return task._id.toString();
        }).indexOf(this.props.taskID.toString());

        if (taskIndex < this.state.allTasks.length - 1) {
            this.setState({
                answerWrong: false,
                answerRight: false,
                currentTask: this.state.allTasks[taskIndex + 1],
                options: this.shuffle(this.state.allTasks[taskIndex + 1].combinedTasks),
            })
        } else {
            console.log("All Tasks finished")
        }
    }

    render() {
        const {value} = this.state;

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
                                       answerRight={this.state.answerRight}
                                       answerWrong={this.state.answerWrong}
                                       loadNewTask={() => {
                                           this.handleNextTask()
                                       }}
                                       checkTheAnswer={(answers) => {
                                           this.handleCheckAnswer(answers)
                                       }}/>
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
                                        <label>Here you can see the code</label>
                                        <Form.TextArea readOnly/>
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