import React, {Component} from 'react'
import {Button, Icon, Segment, Header, Form, Message, Radio}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'
import $ from 'jquery'


class TaskWorkspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerRight: false,
            answerWrong: false,
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

        if(this.props.options[$('input[name=radioName]:checked').val()] === this.props.currentTask.options.correctAnswers[0]){
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
        }
    }

    render() {

        const {value} = this.state;

        let myItem = this.props.options.map((option, index) => {
            return <Form.Field name="radioName" control={Radio} label={option} value={index} checked={this.state.value === index}
                               onChange={this.handleChange}>
                <br/>
            </Form.Field>
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
                        :
                        <Form success={this.state.answerRight} error={this.state.answerWrong}>
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
                }

            </Segment>
        )
    }
}

export default TaskWorkspace