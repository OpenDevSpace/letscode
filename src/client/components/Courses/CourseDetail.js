import React, {Component} from 'react'
import {Segment, Progress, Label, Accordion, Icon, Header, Divider, Image, Container, Form, Button, Dropdown} from 'semantic-ui-react'
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

const options = [
    { key: 'None', text: 'None', value: 'None' }
    ]

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            course: {},
            userRole: '',
            userID: '',
            attendedCourses: [],
            radioTaskType: 'coding',
            answerRadio: 1,
            newTask: {
                title: '',
                taskType: 'coding',
                introduction: '',
                question: '',
                sampleCode: '',
                options: {
                    correctAnswers: [],
                    falseAnswers: []
                },
                tags: ''
            },
            retrievedData: false,
            editMode: false,
            enrolledToCourse: false,
            isTaskEdited: false,
            taskToEdit: '',
            options
        };

        this.handleDone = this.handleDone.bind(this);
        this.dataFetched = this.dataFetched.bind(this);
        this.handleAddTasks = this.handleAddTasks.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleLeaveCourse = this.handleLeaveCourse.bind(this);
        this.handleAddMoreTasks = this.handleAddMoreTasks.bind(this);
        this.handleEditTaskClick = this.handleEditTaskClick.bind(this);
        this.handleEnrollTOCourse = this.handleEnrollTOCourse.bind(this);
        this.handleTaskTagsChange = this.handleTaskTagsChange.bind(this);
        this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
        this.handleTaskSampleChange = this.handleTaskSampleChange.bind(this);
        this.handleTaskQuestionChange = this.handleTaskQuestionChange.bind(this);
        this.handleTaskIntroductionChange = this.handleTaskIntroductionChange.bind(this);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });
        this.fetchData();
    }

    dataFetched() {
        let courseIndex = this.state.attendedCourses.map((course, index) => {
            return course.courseID.toString();
        }).indexOf(this.props.courseID.toString());

        if (courseIndex !== -1) {
            this.setState({
                percent: ((this.state.attendedCourses[courseIndex].taskID.length) / (this.state.course.task.length)) * 100,
                enrolledToCourse: true
            })
        }
    }

    fetchData() {
        $.get('http://localhost:8080/api/course/coursedetail/' + this.props.courseID)
            .done((course) => {
                this.setState({
                    course: course,
                    retrievedData: true,
                    userRole: this.props.role,
                    userID: this.props._id,
                    attendedCourses: this.props.courses
                });
                this.dataFetched();
            });
    }

    handleAddMoreTasks(evt) {
        let answer = this.state.newTask.options.correctAnswers;
        let options = this.state.newTask.options.falseAnswers;

        if (this.state.radioTaskType === "coding") {
            answer.push($('#rightAnswerCode').val());
            options.push($('#answerOptionCode').val());
        } else {
            if($('#rightAnswerOption1').val()
                !== this.state.newTask.options.correctAnswers[0]){
                answer.push($('#rightAnswerOption1').val());
            };
            if($('#rightAnswerOption2').val().length > 0
                && $('#rightAnswerOption2').val() !== this.state.newTask.options.correctAnswers[1]) {
                answer.push($('#rightAnswerOption2').val())
            };
            if($('#rightAnswerOption3').val().length > 0
                && $('#rightAnswerOption2').val() !== this.state.newTask.options.correctAnswers[2]) {
                answer.push($('#rightAnswerOption3').val())
            };

            if($('#answerOption1').val()
                !== this.state.newTask.options.falseAnswers[0]){
            options.push($('#answerOption1').val())
            };
            if($('#answerOption2').val().length > 0
                && $('#answerOption2').val() !== this.state.newTask.options.falseAnswers[1]) {
                options.push($('#answerOption2').val())
            };
            if($('#answerOption3').val().length > 0
                && $('#answerOption3').val() !== this.state.newTask.options.falseAnswers[2]) {
                options.push($('#answerOption3').val())
            };
        }

        this.setState({
            correctAnswers: answer,
            falseAnswers: options
        });

        if ($('#createTaskForm')[0].checkValidity()) {
            if(this.state.isTaskEdited){
                console.log(this.state.newTask);
                $.post("http://localhost:8080/api/course/updatetask/" + this.state.course._id + "/" + this.state.taskToEdit, {
                    task: this.state.newTask
                })
            } else {
                $.post("http://localhost:8080/api/course/addtask/" + this.state.course._id, {
                    _id: this.state.course._id,
                    task: this.state.newTask
                })
                    .done((data) => {
                        console.log("done");
                    });
                this.fetchData();
                $("#createTaskForm")[0].reset();
            }
        } else {
            console.log("not valid");
        }
    }

    updateNewTask(currentInput, value) {
        let tempTask = this.state.newTask;

        if (currentInput === 'answer' || currentInput === 'options') {

        } else {
            tempTask[currentInput] = value;
        }

        this.setState({
            newTask: tempTask
        });
    }

    handleAddTasks(evt) {
        this.setState({
            editMode: true
        })
    }

    handleEditTaskClick(evt, task) {
        let taskIndex = this.state.course.task.map((task, index) => {
            return task._id.toString();
        }).indexOf(task.value);

        if (taskIndex !== -1) {
            console.log(this.state.course.task[taskIndex]);
            this.setState({
                newTask: this.state.course.task[taskIndex],
                radioTaskType: this.state.course.task[taskIndex].taskType,
                taskType: this.state.course.task[taskIndex].taskType,
                editMode: true,
                isTaskEdited: true,
                taskToEdit: this.state.course.task[taskIndex]._id
            })
        }
    }

    handleTypeChange(evt, type) {
        this.updateNewTask('taskType', type.value);
        this.setState({
            radioTaskType: type.value
        });
    };

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

    handleTaskTagsChange(evt, tags) {
        this.updateNewTask('tags', tags.value);
    }

    handleDone(evt) {
        this.setState({
            editMode: false
        })
    }

    handleEnrollTOCourse() {
        $.post('http://localhost:8080/api/user/update/' + this.state.userID, {
            courses: this.state.course._id
        })
            .done((data) => {
                console.log("done");
                let newCourseList = this.state.attendedCourses;
                newCourseList.push(this.state.course._id);
                this.setState({
                    attendedCourses: newCourseList
                })
                console.log(this.state.attendedCourses);
            });
    }

    handleLeaveCourse() {
        console.log("Course Leave Clicked");
        console.log(this.props);
        $.get('http://localhost:8080/api/user/unenroll/' + this.props.courseID)
            .done((data) => {
                console.log(data);
            });
    }

    handleAddition = (e, { value }) => {
        this.setState({
            options: [{ text: value, value }, ...this.state.options],
        })

        console.log(this.state.options);
    }

    handleChange = (e, { value }) => {
        this.setState({ currentValues: value })
        console.log(this.state.options);
    }

    render() {
        const { currentValues } = this.state;
        const {radioTaskType, answerRadio} = this.state;

        let taskList;
        let taskIDs;
        let nextCourse;

        if (this.state.retrievedData) {
            let completedTasks = [];
            let courseIndex = this.state.attendedCourses.map((course, index) => {
                return course.courseID.toString();
            }).indexOf(this.props.courseID.toString());


            if (courseIndex !== -1) {
                completedTasks.push(this.state.attendedCourses[courseIndex].taskID);

                taskList = this.state.course.task.map((value) => {
                    return <TaskList task={value}
                                     courseID={this.state.course._id}
                                     userRole={this.state.userRole}
                                     completedTasks={completedTasks}
                                     onClick={this.handleEditTaskClick}/>
                });

                taskIDs = this.state.course.task.map((e) => {
                    return e._id
                });

                for (let i = 0; i < taskIDs.length; i++) {
                    if (!(taskIDs[i].indexOf(this.props.courseID) !== -1)) {
                        nextCourse = taskIDs[i];
                        i = taskIDs.length;
                    }
                }
            }
        }

        return (
            <Segment className="courseDetailSegment">
                <Segment vertical>
                    <Header as='h2'>
                        {
                            this.state.attendedCourses.map((e) => {
                                return e.courseID
                            }).indexOf(this.props.courseID) !== -1
                                ? <Button color='red' icon='delete'
                                          label={{basic: true, color: 'red', pointing: 'left', content: 'Leave Course'}}
                                          floated='right' onClick={this.handleLeaveCourse}/>
                                : null
                        }
                        {
                            (this.state.userRole === 'Admin' || this.state.userRole === 'Moderator') && !this.state.editMode
                                ? <Button color='orange' icon='plus'
                                          label={{basic: true, color: 'orange', pointing: 'left', content: 'Add Tasks'}}
                                          floated='right' onClick={this.handleAddTasks}
                            />
                                : null
                        }
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
                                    ? <div>{taskList}</div>
                                    : null
                            }

                        </Accordion.Content>
                    </Accordion>
                    <br/>
                    {
                        (this.state.userRole === 'Admin' || this.state.userRole === 'Moderator') && this.state.editMode
                            ?
                            <div>
                                <Divider/>
                                <Header as={'h2'}>
                                    Add a task
                                </Header>
                                <Form id="createTaskForm">
                                    <Form.Input label='Task Title' defaultValue={this.state.newTask.title} required onChange={this.handleTaskTitleChange} width={6}/>
                                    <Form.Group grouped required>
                                        <label>Task Type</label>
                                        <Form.Radio label='Coding' value='coding' checked={radioTaskType === 'coding'}
                                                    onChange={this.handleTypeChange}/>
                                        <Form.Radio label='Question & Answer' value='qanda'
                                                    checked={radioTaskType === 'qanda'}
                                                    onChange={this.handleTypeChange}/>
                                    </Form.Group>
                                    <Form.TextArea label='Introduction' defaultValue={this.state.newTask.introduction} placeholder='What is this task for?'
                                                   onChange={this.handleTaskIntroductionChange}/>
                                    <Form.TextArea label='Question' defaultValue={this.state.newTask.question} placeholder='What is the user supposed to do?'
                                                   required onChange={this.handleTaskQuestionChange}/>
                                    {
                                        (this.state.radioTaskType === "coding" || this.state.radioTaskType === "cloze")
                                            ?
                                            <Form.Group required widths={2}>
                                                <Form.TextArea id="answerOptionCode" label='Sample code'
                                                               placeholder='Provide some sample code...' required
                                                               defaultValue={this.state.newTask.sampleCode}
                                                               onChange={this.handleTaskSampleChange}/>
                                                <Form.TextArea id="rightAnswerCode" label='Answer'
                                                               placeholder='What is the right answer?'
                                                               defaultValue={this.state.newTask.options.correctAnswers[0]}
                                                               required/>
                                            </Form.Group>
                                            :
                                            <Form.Group grouped widths='equal'>
                                                <Form.Input id="rightAnswerOption1" label='Right Answer 1' required
                                                            defaultValue={this.state.newTask.options.correctAnswers[0]} width={6}/>
                                                <Form.Input id="rightAnswerOption2" label='Right Answer 2'
                                                            defaultValue={this.state.newTask.options.correctAnswers[1]} width={6}/>
                                                <Form.Input id="rightAnswerOption3" label='Right Answer 3'
                                                            defaultValue={this.state.newTask.options.correctAnswers[2]} width={6}/>
                                            <Divider/>
                                                <Form.Input id="answerOption1" label='Wrong Answer 1' required
                                                            defaultValue={this.state.newTask.options.falseAnswers[0]} width={6}/>
                                                <Form.Input id="answerOption2" label='Wrong Answer 2'
                                                            defaultValue={this.state.newTask.options.falseAnswers[1]} width={6}/>
                                                <Form.Input id="answerOption3" label='Wrong Answer 3'
                                                            defaultValue={this.state.newTask.options.falseAnswers[2]} width={6}/>
                                                </Form.Group>
                                    }
                                    <Form.Input label='Tags' inline onChange={this.handleTaskTagsChange}/>
                                    <Form.Button positive onClick={this.handleAddMoreTasks}>Add more tasks</Form.Button>
                                </Form>
                            </div>
                            : <span>
                            {
                                this.state.enrolledToCourse
                                    ? <Progress percent={this.state.percent} active indicating>
                                    Your Progess
                                </Progress>
                                    : null
                            }
                                </span>
                    }
                    <Divider/>
                    <Container textAlign='center'>
                        {
                            (this.state.userRole === 'Admin' || this.state.userRole === 'Moderator') && this.state.editMode
                                ? <Button type='submit' positive icon='checkmark' labelPosition='right'
                                          content="Done" onClick={this.handleDone}/>
                                : <span>
                            {
                                this.state.attendedCourses.map((e) => {
                                    return e.courseID
                                }).indexOf(this.props.courseID) !== -1
                                    ? <Link to={"/course/" +
                                this.props.courseID + "/" + nextCourse + "/process"}>
                                    <Label content='Continue with next task.' icon='terminal' color={"green"}
                                           size={"big"}/>
                                </Link>
                                    : <Button positive icon='checkmark' labelPosition='right' content="Enroll course"
                                              onClick={this.handleEnrollTOCourse}/>
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