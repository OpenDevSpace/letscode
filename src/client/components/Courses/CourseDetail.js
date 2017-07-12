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
    Button,
    Message
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
                cloze: {
                    clozePart1: '',
                    clozeWord: '',
                    clozePart2: ''
                },
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
            cancelWarning: false,
            nextTasks: []
        };

        this.handleDone = this.handleDone.bind(this);
        this.dataFetched = this.dataFetched.bind(this);
        this.handleAddTasks = this.handleAddTasks.bind(this);
        this.clearCurrentTask = this.clearCurrentTask.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleLeaveCourse = this.handleLeaveCourse.bind(this);
        this.handleClozeChange = this.handleClozeChange.bind(this);
        this.handleInviteButton = this.handleInviteButton.bind(this);
        this.handleAddMoreTasks = this.handleAddMoreTasks.bind(this);
        this.handleEditTaskClick = this.handleEditTaskClick.bind(this);
        this.handleEnrollTOCourse = this.handleEnrollTOCourse.bind(this);
        this.handleTaskTagsChange = this.handleTaskTagsChange.bind(this);
        this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
        this.handleTaskQuestionChange = this.handleTaskQuestionChange.bind(this);
        this.handleTaskIntroductionChange = this.handleTaskIntroductionChange.bind(this);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });
        this.fetchData();
    }

    clearCurrentTask() {
        this.setState({
            newTask: {
                title: '',
                taskType: 'coding',
                introduction: '',
                question: '',
                sampleCode: '',
                cloze: {
                    clozePart1: '',
                    clozeWord: '',
                    clozePart2: ''
                },
                options: {
                    correctAnswers: [],
                    falseAnswers: []
                },
                tags: ''
            }
        })
    }

    dataFetched() {
        let courseIndex = this.state.attendedCourses.map((course, index) => {
            return course.courseID.toString();
        }).indexOf(this.props.courseID.toString());

        let completedTasks;

        if (courseIndex !== -1) {
            completedTasks = this.state.attendedCourses[courseIndex].taskID;
        } else {
            completedTasks = [];
        }


        let taskListIDs = this.state.course.task.map((value, index) => {
            return value._id
        });

        let tempTasks = [];

        for (let i = 0; i < taskListIDs.length; i++) {
            if (completedTasks.indexOf(taskListIDs[i]) === -1) {
                tempTasks.push(taskListIDs[i]);
            }
        }

        if (courseIndex !== -1) {
            this.setState({
                percent: ((this.state.attendedCourses[courseIndex].taskID.length) / (this.state.course.task.length)) * 100,
                enrolledToCourse: true,
                nextTask: tempTasks,
                retrievedData: true
            })
        } else {
            this.setState({
                retrievedData: true,
                nextTask: taskListIDs
            })
        }
    }

    fetchData() {
        $.get('http://localhost:8080/api/course/coursedetail/' + this.props.courseID)
            .done((course) => {
                this.setState({
                    course: course,
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
        } else if (this.state.newTask.taskType === 'qanda') {
            if ($('#rightAnswerOption1').val()
                !== this.state.newTask.options.correctAnswers[0]) {
                answer.push($('#rightAnswerOption1').val());
            }
            ;
            if ($('#rightAnswerOption2').val().length > 0
                && $('#rightAnswerOption2').val() !== this.state.newTask.options.correctAnswers[1]) {
                answer.push($('#rightAnswerOption2').val())
            }
            ;
            if ($('#rightAnswerOption3').val().length > 0
                && $('#rightAnswerOption2').val() !== this.state.newTask.options.correctAnswers[2]) {
                answer.push($('#rightAnswerOption3').val())
            }
            ;

            if ($('#answerOption1').val()
                !== this.state.newTask.options.falseAnswers[0]) {
                options.push($('#answerOption1').val())
            }
            ;
            if ($('#answerOption2').val().length > 0
                && $('#answerOption2').val() !== this.state.newTask.options.falseAnswers[1]) {
                options.push($('#answerOption2').val())
            }
            ;
            if ($('#answerOption3').val().length > 0
                && $('#answerOption3').val() !== this.state.newTask.options.falseAnswers[2]) {
                options.push($('#answerOption3').val())
            }
            ;
        }

        this.setState({
            correctAnswers: answer,
            falseAnswers: options
        });

        if ($('#createTaskForm')[0].checkValidity()) {
            if (this.state.isTaskEdited) {
                $.post("http://localhost:8080/api/course/updatetask/" + this.state.course._id + "/" + this.state.taskToEdit, {
                    task: this.state.newTask
                })
                    .done((data) => {
                        $("#createTaskForm")[0].reset();
                        this.clearCurrentTask();
                    })
            } else {
                $.post("http://localhost:8080/api/course/addtask/" + this.state.course._id, {
                    _id: this.state.course._id,
                    task: this.state.newTask
                })
                    .done((data) => {
                        console.log("done");
                        $("#createTaskForm")[0].reset();
                        //$("#createTaskForm").trigger("reset");
                        this.clearCurrentTask()
                    });
                this.fetchData();
            }
        } else {
            console.log("not valid");
        }
    }

    updateNewTask(currentInput, value) {
        let tempTask = this.state.newTask;

        if (currentInput === 'clozePart1' || currentInput === 'clozeWord' || currentInput === 'clozePart2') {
            tempTask.cloze[currentInput] = value;

        } else {
            tempTask[currentInput] = value;
        }

        this.setState({
            newTask: tempTask
        });
    }

    handleAddTasks(evt) {
        this.setState(prevState => ({
            editMode: !prevState.editMode
        }));
    }

    handleEditTaskClick(evt, task) {

        if (this.state.editMode) {
            $("#createTaskForm")[0].reset();
        }
        this.clearCurrentTask();

        console.log(this.state.newTask);
        //console.log(task.value);

        let taskIndex = this.state.course.task.map((task, index) => {
            return task._id.toString();
        }).indexOf(task.value);

        console.log(taskIndex);

        if (taskIndex !== -1) {
            this.setState({
                newTask: this.state.course.task[taskIndex],
                radioTaskType: this.state.course.task[taskIndex].taskType,
                taskType: this.state.course.task[taskIndex].taskType,
                editMode: true,
                isTaskEdited: true,
                taskToEdit: this.state.course.task[taskIndex]._id
            })
            console.log(this.state.newTask);
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

    handleTaskTagsChange(evt, tags) {
        this.updateNewTask('tags', tags.value);
    }

    handleClozeChange(evt, target) {
        this.updateNewTask(target.id, target.value);
    }

    handleDone(evt) {
        if (!$('#createTaskForm')[0].checkValidity()) {
            this.setState({
                editMode: false,
            })
        }
    }

    handleEnrollTOCourse() {
        $.post('http://localhost:8080/api/user/update/' + this.state.userID, {
            courses: this.state.course._id
        })
            .done((data) => {
                let tempCourse = {
                    courseID: this.state.course._id,
                    taskID: []
                };
                let tempAttendedCourses = this.state.attendedCourses;
                tempAttendedCourses.push(tempCourse);
                this.setState({
                    attendedCourses: tempAttendedCourses
                });
                this.fetchData();
            });
    }

    handleLeaveCourse() {
        $.get('http://localhost:8080/api/user/unenroll/' + this.props.courseID)
            .done((data) => {
                console.log(data);
            });
    }

    handleInviteButton() {
        window.prompt("Invite a Friend to the course: \n Copy to clipboard: Ctrl+C, Enter", window.location.href);
    }

    render() {
        const {radioTaskType} = this.state;

        let taskListItem;

        if (this.state.retrievedData) {
            let completedTasks = [];
            let courseIndex = this.state.attendedCourses.map((course, index) => {
                return course.courseID.toString();
            }).indexOf(this.props.courseID.toString());

            let taskListIDs = this.state.course.task.map((value, index) => {
                return value._id
            });

            if (courseIndex !== -1) {
                completedTasks = this.state.attendedCourses[courseIndex].taskID;
            }
            taskListItem = this.state.course.task.map((value) => {
                return <TaskList task={value}
                                 courseID={this.state.course._id}
                                 userRole={this.state.userRole}
                                 completedTasks={completedTasks}
                                 taskListIDs={taskListIDs}
                                 onClick={this.handleEditTaskClick}/>
            });
        }

        return (
            <Segment className="courseDetailSegment">
                <Segment vertical>
                    <Header as='h2'>
                        <Button color='green' icon='mail'
                                label={{basic: true, color: 'green', pointing: 'left', content: 'Invite a Friend'}}
                                floated='right' onClick={this.handleInviteButton}/>
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
                            (this.state.userRole === 'Admin' || this.state.userRole === 'Moderator')
                                ? <div>
                                {
                                    !this.state.editMode
                                        ? <Button color='orange' icon='plus'
                                                  label={{
                                                      basic: true,
                                                      color: 'orange',
                                                      pointing: 'left',
                                                      content: 'Add Tasks'
                                                  }}
                                                  floated='right' onClick={this.handleAddTasks}
                                    />
                                        : <Button color='orange' icon='remove' floated='right'
                                                  label={{
                                                      basic: true,
                                                      color: 'orange',
                                                      pointing: 'left',
                                                      content: 'Exit'
                                                  }}
                                                  onClick={this.handleAddTasks}
                                    />
                                }
                            </div>
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
                                            return null
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
                                    ? <div>{taskListItem}</div>
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
                                <Form id="createTaskForm" warning={this.state.cancelWarning}>
                                    <Form.Input label='Task Title' defaultValue={this.state.newTask.title} required
                                                onChange={this.handleTaskTitleChange} width={6}/>
                                    <Form.Group grouped required>
                                        <label>Task Type</label>
                                        <Form.Radio label='Coding' value='coding' checked={radioTaskType === 'coding'}
                                                    onChange={this.handleTypeChange}/>
                                        <Form.Radio label='Question & Answer' value='qanda'
                                                    checked={radioTaskType === 'qanda'}
                                                    onChange={this.handleTypeChange}/>
                                        <Form.Radio label='Fill-in-the-blank' value='cloze'
                                                    checked={radioTaskType === 'cloze'}
                                                    onChange={this.handleTypeChange}/>
                                    </Form.Group>
                                    <Form.TextArea label='Introduction' defaultValue={this.state.newTask.introduction}
                                                   placeholder='What is this task for?'
                                                   onChange={this.handleTaskIntroductionChange}/>
                                    <Form.TextArea label='Question' defaultValue={this.state.newTask.question}
                                                   placeholder='What is the user supposed to do?'
                                                   required onChange={this.handleTaskQuestionChange}/>
                                    {
                                        (this.state.radioTaskType === "coding" || this.state.radioTaskType === "cloze")
                                            ? <span>
                                                {
                                                    this.state.radioTaskType === "coding"
                                                        ? <Form.Group required widths={2}>
                                                        <Form.TextArea id="answerOptionCode" label='Sample code'
                                                                       placeholder='Provide some sample code...'
                                                                       defaultValue={this.state.newTask.sampleCode}
                                                                       required/>
                                                        <Form.TextArea id="rightAnswerCode" label='Answer'
                                                                       placeholder='What is the right answer?'
                                                                       defaultValue={this.state.newTask.options.correctAnswers[0]}
                                                                       required/>
                                                    </Form.Group>
                                                        :
                                                        <Form.Group required widths={3}>
                                                            <Form.Input id="clozePart1" label='First part'
                                                                        defaultValue={this.state.newTask.cloze.clozePart1}
                                                                        onChange={this.handleClozeChange}/>
                                                            <Form.Input id="clozeWord" label='Cloze word'
                                                                        defaultValue={this.state.newTask.cloze.clozeWord}
                                                                        onChange={this.handleClozeChange}/>
                                                            <Form.Input id="clozePart2" label='Second part'
                                                                        defaultValue={this.state.newTask.cloze.clozePart2}
                                                                        onChange={this.handleClozeChange}/>
                                                        </Form.Group>
                                                }
                                            </span>

                                            :
                                            <Form.Group grouped widths='equal'>
                                                <Form.Input id="rightAnswerOption1" label='Right Answer 1' required
                                                            defaultValue={this.state.newTask.options.correctAnswers[0]}
                                                            width={6}/>
                                                <Form.Input id="rightAnswerOption2" label='Right Answer 2'
                                                            defaultValue={this.state.newTask.options.correctAnswers[1]}
                                                            width={6}/>
                                                <Form.Input id="rightAnswerOption3" label='Right Answer 3'
                                                            defaultValue={this.state.newTask.options.correctAnswers[2]}
                                                            width={6}/>
                                                <Divider/>
                                                <Form.Input id="answerOption1" label='Wrong Answer 1' required
                                                            defaultValue={this.state.newTask.options.falseAnswers[0]}
                                                            width={6}/>
                                                <Form.Input id="answerOption2" label='Wrong Answer 2'
                                                            defaultValue={this.state.newTask.options.falseAnswers[1]}
                                                            width={6}/>
                                                <Form.Input id="answerOption3" label='Wrong Answer 3'
                                                            defaultValue={this.state.newTask.options.falseAnswers[2]}
                                                            width={6}/>
                                            </Form.Group>
                                    }
                                    <Form.Input label='Tags' inline onChange={this.handleTaskTagsChange}/>
                                    <Form.Button positive onClick={this.handleAddMoreTasks}>Add more tasks</Form.Button>
                                    <Message
                                        warning
                                        header="Do you want to leave, without saving? Use the close edit button"
                                    />
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
                    {
                        this.state.retrievedData
                        ?<Container textAlign='center'>
                            {
                                (this.state.userRole === 'Admin' || this.state.userRole === 'Moderator') && this.state.editMode
                                    ? <Button type='submit' positive icon='checkmark' labelPosition='right'
                                              content="Done" onClick={this.handleDone}/>
                                    : <span>
                            {
                                this.state.attendedCourses.map((e) => {
                                    return e.courseID
                                }).indexOf(this.props.courseID) !== -1 && this.state.retrievedData
                                    ?
                                    <Link to={"/course/" +
                                    this.props.courseID + "/" + this.state.nextTask[0] + "/process"}>
                                        <Label content='Continue with next task.' icon='terminal' color={"green"}
                                               size={"big"}/>
                                    </Link>
                                    : <Button positive icon='checkmark' labelPosition='right' content="Enroll course"
                                              onClick={this.handleEnrollTOCourse}/>
                            }
                        </span>
                            }
                        </Container>
                            : null
                    }

                </Segment>
            </Segment>
        )

    }

}

export default CourseDetails