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
import TaskList from "./TaskList";
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
            userRole: this.props.role,
            userID: this.props._id,
            attendedCourses: this.props.course,
            radioTaskType: 'coding',
            answerRadio: 1,
            newTask: {
                title: '',
                taskType: 'coding',
                introduction: '',
                question: '',
                sampleCode: '',
                answer: '',
                tags: ''
            },
            retrievedData: false,
            editMode: true
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAddMoreTasks = this.handleAddMoreTasks.bind(this);
        this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
        this.handleTaskIntroductionChange = this.handleTaskIntroductionChange.bind(this);
        this.handleTaskQuestionChange = this.handleTaskQuestionChange.bind(this);
        this.handleTaskSampleChange = this.handleTaskSampleChange.bind(this);
        this.handleTaskCodeAnswerChange = this.handleTaskCodeAnswerChange.bind(this);
        this.handleTaskTagsChange = this.handleTaskTagsChange.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleEnrollTOCourse = this.handleEnrollTOCourse.bind(this)

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        this.fetchData();
        $.get("http://localhost:8080/api/user/afterlogin")
            .fail(() => {
                console.log("Failure!");
            })
            .done((data) => {
                this.setState({
                    userRole: data.role,
                    userID: data._id,
                    attendedCourses: data.courses
                })
            });
    }


    fetchData(){
        $.get('http://localhost:8080/api/course/coursedetail/' + this.props.courseID)
            .done((course) => {
                this.setState({
                    course: course,
                    retrievedData: true
                });
            });

    }

    handleAddMoreTasks(evt) {
        if ($('#createTaskForm')[0].checkValidity()) {
            $.post("http://localhost:8080/api/course/addtask/" + this.state.course._id, {
                _id: this.state.course._id,
                task: this.state.newTask
            })
                .done((data) => {
                    console.log("done");
                });
            this.setState({
                newTask: {}
            });
            this.fetchData();
            $("#createTaskForm")[0].reset();
        } else {
            console.log("not valid");
        }
    }

    updateNewTask(currentInput, value) {
        let tempTask = this.state.newTask;

        tempTask[currentInput] = value;

        this.setState({
            newTask: tempTask
        });
    }


    handleTypeChange(evt, type) {
        this.updateNewTask('taskType', type.value);
        this.setState({
            radioTaskType: type.value
        });
    };

    /* ToDo: write text of selected answer in answer and wrong answers in sampleCode */


    handleTaskTitleChange(evt, title) {
        this.updateNewTask('title', title.value);
    }

    handleTaskIntroductionChange(evt, introduction) {
        this.updateNewTask('introduction', introduction.value);
    }

    handleTaskQuestionChange(evt, question) {
        this.updateNewTask('question', question.value);
    }

    handleTaskSampleChange(evt, sampleCode) {
        this.updateNewTask('sampleCode', sampleCode.value);
    }

    handleTaskCodeAnswerChange(evt, answer) {
        this.updateNewTask('answer', answer.value);
    }

    handleTaskTagsChange(evt, tags) {
        this.updateNewTask('tags', tags.value);
    }

    handleDone(evt){
        this.setState({
            editMode: false
        })
    }

    handleEnrollTOCourse() {
        $.post('http://localhost:8080/api/user/update/' + this.state.userID, this.state.course._id)
            .done((data) => {
                console.log("done");
            });
    }

    increment = () => this.setState({
        percent: this.state.percent >= 100 ? 0 : this.state.percent + 20,
    })

    render() {
        let taskInfo;

        if(this.state.retrievedData){
            taskInfo = this.state.course.task.map((value) => {
                return <TaskList task={value}/>
            });
        }


        const {radioTaskType, answerRadio} = this.state;
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
                            {
                                (this.state.retrievedData)
                                ? <div>{taskInfo}</div>
                                : null
                            }

                        </Accordion.Content>
                    </Accordion>
                    <Divider/>

                    {
                        (this.state.userRole === 'Admin' || this.state.userRole === 'Moderator') && this.state.editMode
                            ?
                            <div>
                                <Header as={'h2'}>
                                    Add a task
                                </Header>
                                <Form id="createTaskForm">
                                    <Form.Input label='Task Title' required onChange={this.handleTaskTitleChange}/>
                                    <Form.Group grouped required>
                                        <label>Task Type</label>
                                        <Form.Radio label='Coding' value='coding' checked={radioTaskType === 'coding'}
                                                    onChange={this.handleTypeChange}/>
                                        <Form.Radio label='Question & Answer' value='qanda'
                                                    checked={radioTaskType === 'qanda'}
                                                    onChange={this.handleTypeChange}/>
                                    </Form.Group>
                                    <Form.TextArea label='Introduction' placeholder='What is this task for?'
                                                   onChange={this.handleTaskIntroductionChange}/>
                                    <Form.TextArea label='Question' placeholder='What is the user supposed to do?'
                                                   required onChange={this.handleTaskQuestionChange}/>
                                    {
                                        (this.state.radioTaskType === "coding")
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
                                                <Form.Input label='Right Answer' required
                                                            onChange={this.handleTaskCodeAnswerChange}/>
                                                <Form.Input label='Wrong Answer 1' required
                                                            onChange={this.handleTaskSampleChange}/>
                                                <Form.Input label='Wrong Answer 2' required
                                                            onChange={this.handleTaskSampleChange}/>
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
                            (this.state.userRole === 'Admin' || this.state.userRole === 'Moderator') && this.state.editMode
                                ? <Button type='submit' positive icon='checkmark' labelPosition='right'
                                          content="Done" centered onClick={this.handleDone}/>
                                : <span>
                            {
                                this.props._id.indexOf(this.state.attendedCourses) !== -1
                                    ? <Button positive icon='checkmark' labelPosition='right' content="Enroll course"
                                              centered
                                onClick={this.handleEnrollTOCourse}/>
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