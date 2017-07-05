import React, {Component} from 'react'
import {
    Segment,
    Progress,
    Label,
    Accordion,
    Icon,
    Header,
    Divider,
    Image,
    Container,
    Form,
    Button
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../styles/CourseDetail.css'
import CreateTask from "./TaskList";
import HTML5 from '../Icons/HTML5'
import JavaScript from '../Icons/JavaScript'
import CSS3 from '../Icons/CSS3'
import Java from "../Icons/Java";
import Python from "../Icons/Python";
import C from "../Icons/C";
import Web from "../Icons/WEB";

import $ from 'jquery'

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 43,
            course: {},
            userRole: '',
            attendedCourses: [],
            taskType: 'coding',
            answerRadio: 1,
            title: '',
            introduction: '',
            question: '',
            sampleCode: '',
            answer: '',
            tags: '',
            belongsTo: this.props.courseID
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAddMoreTasks = this.handleAddMoreTasks.bind(this);
        this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
        this.handleTaskIntroductionChange = this.handleTaskIntroductionChange.bind(this);
        this.handleTaskQuestionChange = this.handleTaskQuestionChange.bind(this);
        this.handleTaskSampleChange = this.handleTaskSampleChange.bind(this);
        this.handleTaskCodeAnswerChange = this.handleTaskCodeAnswerChange.bind(this);
        this.handleTaskTagsChange = this.handleTaskTagsChange.bind(this);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });
        $.get('http://localhost:8080/api/course/coursedetail/' + this.props.courseID)
            .done((course) => {
                this.setState({
                    course: course
                });
            });

        $.get("http://localhost:8080/api/user/afterlogin")
            .fail(() => {
                console.log("Failure!");
            })
            .done((data) => {
                this.setState({
                    userRole: data.role,
                    attendedCourses: data.courses,

                })
            });
    }


    handleAddMoreTasks(evt) {
        if ($('#createTaskForm')[0].checkValidity()) {
            $.post("http://localhost:8080/api/task/new",  {
                title: this.state.title,
                taskType: this.state.taskType,
                introduction: this.state.introduction,
                question: this.state.question,
                sampleCode: this.state.sampleCode,
                answer: this.state.answer,
                tags: this.state.tags,
                belongsTo: this.state.belongsTo
            }).done((data) => {
                console.log(data);
            });
        } else {
            console.log("not valid");
        }
    }


    handleTypeChange(evt, type) {
        this.setState({
            taskType: type.value
        });
    }
    ;

    handleAnswerChange(evt, type) {
        this.setState({
            answerRadio: type.value
        });
    }
    ;

    handleTaskTitleChange(evt, title) {
        this.setState({
            title: title.value
        });
    }

    handleTaskIntroductionChange(evt, introduction) {
        this.setState({
            introduction: introduction.value
        });
    }

    handleTaskQuestionChange(evt, question) {
        this.setState({
            question: question.value
        });
    }

    handleTaskSampleChange(evt, sampleCode) {
        this.setState({
            sampleCode: sampleCode.value
        });
    }

    handleTaskCodeAnswerChange(evt, answer) {
        this.setState({
            answer: answer.value
        });
    }

    handleTaskTagsChange(evt, tags) {
        this.setState({
            answer: tags.value
        });
    }

    increment = () => this.setState({
        percent: this.state.percent >= 100 ? 0 : this.state.percent + 20,
    })

    render() {
        const {taskType, answerRadio} = this.state;
        return (
            <Segment className="courseDetailSegment">
                <Segment vertical>
                    <Header as='h2'>
                        <Image id="courseHeaderIcon">
                            {(() => {
                                switch (this.state.course.language) {
                                    case 'HTML5':
                                        return <HTML5 />
                                    case 'CSS3':
                                        return <CSS3 />
                                    case 'JavaScript':
                                        return <JavaScript />
                                    case 'java':
                                        return <Java />
                                    case 'python':
                                        return <Python/>
                                    case 'c':
                                        return <C />
                                    case 'web':
                                        return <Web/>
                                    default :
                                        return <HTML5 />
                                }
                            })()}
                        </Image>
                        <Header.Content>
                            {this.state.course.title}
                            <Header.Subheader>
                                {this.state.course.language} | <span>
                                {(() => {
                                    switch (this.state.course.level) {
                                        case 1:
                                            return "Easy"
                                        case 2:
                                            return "Medium"
                                        case 3:
                                            return "Advanced"
                                        default :
                                            null
                                    }
                                })()}
                            </span>
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Container fluid textAlign='justified'>
                        {this.state.course.description}
                    </Container>
                </Segment>
                <Segment vertical>
                    <Accordion exclusive={false} defaultActiveIndex={1}>
                        <Accordion.Title className="inverted">
                            <Header as='h3' color='blue'>
                                <Icon name='dropdown'/>
                                Tasks
                            </Header>
                        </Accordion.Title>
                        <Accordion.Content>
                            /* ToDO Render Task List */
                            <CreateTask/>
                        </Accordion.Content>
                    </Accordion>
                    <Divider/>

                    {
                        this.state.userRole === 'Admin' || this.state.userRole === 'Moderator'
                            ?
                            <div>
                                <Header as={'h2'}>
                                    Add a task
                                </Header>
                                <Form id="createTaskForm">
                                    <Form.Input label='Task Title' required onChange={this.handleTaskTitleChange}/>
                                    <Form.Group grouped required>
                                        <label>Task Type</label>
                                        <Form.Radio label='Coding' value='coding' checked={taskType === 'coding'}
                                                    onChange={this.handleTypeChange}/>
                                        <Form.Radio label='Question & Answer' value='qanda'
                                                    checked={taskType === 'qanda'}
                                                    onChange={this.handleTypeChange}/>
                                    </Form.Group>
                                    <Form.TextArea label='Introduction' placeholder='What is this task for?'
                                                   onChange={this.handleTaskIntroductionChange}/>
                                    <Form.TextArea label='Question' placeholder='What is the user supposed to do?'
                                                   required onChange={this.handleTaskQuestionChange}/>
                                    {
                                        (this.state.taskType === "coding")
                                            ?
                                            <Form.Group required widths={2}>
                                                <Form.TextArea label='Sample code'
                                                               placeholder='Provide some sample code...' required
                                                               onChange={this.handleTaskSampleChange}/>
                                                <Form.TextArea label='Answer' placeholder='What is the right answer?'
                                                               required
                                                               onChange={this.handleTaskCodeAnswerChange}/>
                                            </Form.Group>
                                            :
                                            <Form.Group required grouped>
                                                <label>Enter tree options and mark the correct one.</label>
                                                <Form.Group>
                                                    <Form.Radio value={1}
                                                                checked={answerRadio === 1}
                                                                onChange={this.handleAnswerChange}/>
                                                    <Form.Input placeholder="Answer 1" required/>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Radio value={2}
                                                                checked={answerRadio === 2}
                                                                onChange={this.handleAnswerChange}/>
                                                    <Form.Input placeholder="Answer 2" required/>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Radio value={3}
                                                                checked={answerRadio === 3}
                                                                onChange={this.handleAnswerChange}/>
                                                    <Form.Input placeholder="Answer 3" required/>
                                                </Form.Group>
                                            </Form.Group>
                                    }

                                    <Form.Input label='Tags' inline onChange={this.handleTaskTagsChange}/>
                                    <Form.Button positive onClick={this.handleAddMoreTasks}>Add more tasks</Form.Button>
                                </Form>
                            </div>
                            : <Progress percent={this.state.percent} active indicating>
                            Your Progess
                        </Progress>

                    }
                    <Divider/>
                    <Container textAlign='center'>
                        {
                            this.state.userRole === 'Admin' || this.state.userRole === 'Moderator'
                                ? <Button type='submit' positive icon='checkmark' labelPosition='right'
                                          content="Done" centered/>
                                : <span>
                            {
                                this.props.courseID.indexOf(this.state.attendedCourses) !== -1
                                    ? <Button positive icon='checkmark' labelPosition='right' content="Enroll course"
                                              centered/>
                                    : <Link to={"/course/" + this.props.courseID + "/edit"}>
                                    <Label content='Continue with next task.' icon='terminal' color={"green"}
                                           size={"big"}/>
                                </Link>
                            }
                        </span>
                        }
                    </Container>
                </Segment>
            </Segment>
        )
    }
}

export default CourseDetails