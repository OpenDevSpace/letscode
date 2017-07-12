import React, {Component} from 'react'
import {Button, Icon, Segment, Header, Form, Message, Radio, Checkbox, Input}from 'semantic-ui-react'
import '../../../styles/TaskWrapper.css'
import $ from 'jquery'


class TaskWorkspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightAnswer: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
    }


    handleChange = (e, {value}) => {
        this.setState({value});
    }

    handleCheckAnswer(evt){
        let answers = [];
        if(this.props.currentTask.taskType === "cloze"){
            answers.push($("#clozeWord").val());
        } else if (this.props.currentTask.taskType === "qanda"){
            $("#qandaForm input:checkbox:checked").each(function() {
                answers.push($(this).next("label").text());
            });
        } else {
            answers.push($("#codeInput").val());
        }

        this.props.checkTheAnswer(
           answers
        );
    }

    render() {

        const {value} = this.state;

        let myItem = this.props.options.map((option, index) => {
            if (option.length <= 1) {
                return (
                    <Form.Field name="radioName" control={Radio} label={option} value={index}
                                checked={this.state.value === index}
                                onChange={this.handleChange}>
                        <br/>
                    </Form.Field>
                )
            } else {
                return (
                    <Form.Field name="radioName" control={Checkbox} label={option} value={index} >
                        <br/>
                    </Form.Field>
                )
            }
        });

        return (
            <Segment vertical basic={true} color={"orange"} className="taskSegment">
                <Header as='h3'>
                    <Icon name="code"/>
                    <Header.Content>
                        Whats the answer?
                    </Header.Content>
                    <Header.Subheader>
                        Complete the code
                    </Header.Subheader>
                </Header>
                {
                    (this.props.currentTask.taskType === "coding")
                        ? <Form >
                        <label>{this.props.currentTask.question}</label>
                        <Form.TextArea id="codeInput" defaultValue={this.props.currentTask.sampleCode} />
                        <Button basic color='green'
                                onClick={this.handleCheckAnswer}>Check answer</Button>

                    </Form>
                        : null
                }
                {
                    (this.props.currentTask.taskType === "qanda")
                        ?  <Form id="qandaForm" success={this.props.answerRight} error={this.props.answerWrong} required>
                        <Form.Group id="radioGroup" grouped>
                            <label>{this.props.currentTask.question}</label>
                            {myItem}
                            <Message
                                success
                                header='That`s right'
                            />
                            <Message
                                error
                                header='Sorry, thats wrong.'
                            />
                            <Button basic color='green'
                                    onClick={this.handleCheckAnswer}>Check answer</Button>
                        </Form.Group>
                    </Form>
                        : null
                }
                {
                    (this.props.currentTask.taskType === "cloze")
                        ?  <div>
                        <Header as={'h3'} content={this.props.currentTask.question}/>
                        <Form inverted  success={this.props.answerRight} error={this.props.answerWrong} >
                            <Form.Field inline>
                                <Header as={'h4'}>
                                {this.props.currentTask.cloze.clozePart1}
                                <Input id="clozeWord" placeholder='Fill in the missing word' autoFocus/>
                                    {this.props.currentTask.cloze.clozePart2}
                                </Header>
                            </Form.Field>
                            <Message
                                success
                                header='That`s right'
                            />
                            <Message
                                error
                                header='Sorry, thats wrong.'
                            />
                            <Button basic color='green'
                                    onClick={this.handleCheckAnswer}>Check answer</Button>
                        </Form>
                    </div>
                        : null
                }

                {
                    this.props.answerRight
                    ? <Button floated='right' positive onClick={this.props.loadNewTask}>Next Task</Button>
                        : null
                }
            </Segment>
        )
    }
}

export default TaskWorkspace