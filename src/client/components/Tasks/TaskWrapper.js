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
            options: [],
            answerRight: false,
            answerWrong: false,
        }

        this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
        this.handleFetchedValues = this.handleFetchedValues.bind(this);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        $.get('http://localhost:8080/api/course/gettask/' + this.props.courseID + '/' + this.props.taskID)
            .done((data) => {
                console.log(data.tasks)
                /*
                 let fetchedTasks = data.map((task, index) => {
                 return task
                 });

                 for(let i = 0; i < fetchedTasks.length; i++){
                 let tempAnswers = []

                 if (fetchedTasks[i].taskType === 'qanda') {
                 for(let j = 0; j < fetchedTasks[i].options.falseAnswers.length; j++) {
                 tempAnswers.push(fetchedTasks[i].options.falseAnswers[j]);
                 }
                 for(let j = 0; j < fetchedTasks[i].options.correctAnswers.length; j++) {
                 tempAnswers.push(fetchedTasks[i].options.correctAnswers[j]);
                 }
                 } else if (fetchedTasks[i].taskType === 'cloze') {
                 tempAnswers.push(fetchedTasks[i].cloze.clozeWord[0]);
                 } else {
                 tempAnswers.push(fetchedTasks[i].options.falseAnswers[0]);
                 }
                 fetchedTasks[i].options = tempAnswers;
                 }
                 */
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
        console.log("check answer");
        console.log(answers);

        /*
        if (answers.length === 1) {
            console.log("answer right");
            this.setState({
                    answerRight: true
                },
                console.log("state set"));
        }
        */

        $.post('http://localhost:8080/api/course/checktask/' + this.props.courseID + "/" + this.props.taskID, {
            answers: answers
        })
            .done((data) => {
            if(data === "right"){
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
            currentTask: data[taskIndex],
            options: this.shuffle(data[taskIndex].combinedTasks)
        })
    }

    handleChange = (e, {value}) => this.setState({value})

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
                                        <Button basic fluid color='green'
                                                onClick={[].forEach.call(document.querySelectorAll('.myCheckbox:checked'), function (cb) {
                                                })}>Check answer</Button>
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