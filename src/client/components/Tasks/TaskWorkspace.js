import React, {Component} from 'react'
import {Button, Icon, Segment, Header, Form, Message, Radio, Checkbox, Input}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'
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
        //console.log(this.props.options[$('input[name=radioName]:checked').val()]);
        //console.log(this.props.currentTask.options.correctAnswers);
        let answers = [];
        $("#qandaForm input:checkbox:checked").each(function() {
            answers.push($(this).next("label").text());
        });
        this.props.checkTheAnswer(
           answers
        );

        /*
            this.setState({
                answerRight: true,
                answerWrong: false
            });
            $.post('http://localhost:8080/api/user/update/' + this.props.userID, {
                courses: this.props.courseID,
                taskID: this.props.currentTask._id
            })
                .done((data) => {
                    console.log("done");
                });

        } else {
            this.setState({
                answerWrong: true,
                answerRight: false,
                rightAnswer: this.props.currentTask.options.correctAnswers[0]
            })
            */
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
                        <Form.TextArea defaultValue={this.props.currentTask.sampleCode} />
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
                                header='Wrong. The right answer is:  '
                                content={this.state.rightAnswer}
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
                        <Form inverted>
                            <Form.Field inline>
                                <Header as={'h4'}>
                                {this.props.currentTask.cloze.clozePart1}
                                <Input placeholder='Fill in the missing word' autoFocus/>
                                    {this.props.currentTask.cloze.clozePart2}
                                </Header>
                            </Form.Field>
                            <Button basic color='green'
                                    onClick={this.handleCheckAnswer}>Check answer</Button>
                        </Form>
                    </div>
                        : null
                }

            </Segment>
        )
    }
}

export default TaskWorkspace