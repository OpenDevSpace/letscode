import React, {Component} from 'react'
import {Button, Table, Modal, Menu, Form, Input, Dropdown} from 'semantic-ui-react'
import CourseListItem from './CourseListItem'
import '../../../styles/CourseList.css'
import $ from 'jquery'

const language = [
    {key: 'web', text: 'web', value: 'web'},
    {key: 'java', text: 'java', value: 'java'},
    {key: 'c', text: 'c', value: 'c'},
    {key: 'python', text: 'python', value: 'python'}
]
const level = [
    {key: '1', text: 'easy', value: '1'},
    {key: '2', text: 'medium', value: '2'},
    {key: '3', text: 'advanced', value: '3'}
]


class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            open: false,
            newcourse: {
                title: '',
                description: '',
                language: '',
                tags: [],
                level: ''
            }
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleLangSelection = this.handleLangSelection.bind(this);
        this.handleLevelSelection = this.handleLevelSelection.bind(this);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        this.fetchCourses();
    }

    updateNewCourse(currentInput, evt){
        var tempCourse = this.state.newcourse;

        if(currentInput === "language" || currentInput === "level") {
            tempCourse[currentInput] = evt.value;
        } else {
            tempCourse[currentInput] = evt.target.value;
        }
        this.setState({
            newcourse: tempCourse
        });
    }

    handleTitleChange(evt){
        this.updateNewCourse("title", evt);
    }

    handleDescChange(evt){
        this.updateNewCourse("description", evt);
    }

    handleLangSelection(evt, lang){
        this.updateNewCourse("language", lang);
    }

    handleLevelSelection(evt, level){
        this.updateNewCourse("level", level);
    }

    handleCreateCourse(evt){
        console.log(this.state.newcourse);
            $.post("http://localhost:8080/api/course/new", this.state.newcourse)
                .done((data) => {
                    this.fetchCourses();
                    this.close();
                })
    }

    fetchCourses(){
        $.get('http://localhost:8080/api/course/listall')
            .done((courses) => {
                this.setState({
                    courses: courses.data
                });
            });
    }

    show = (dimmer) => () => this.setState({dimmer, open: true});
    close = () => this.setState({open: false});

    render() {
        const {open, dimmer} = this.state;

        let courseData = this.state.courses.map((course, index) => {
            return <CourseListItem course={course} />
        });

        return (
            <div>
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell>Tags</Table.HeaderCell>
                            <Table.HeaderCell>Timestamp</Table.HeaderCell>
                            <Table.HeaderCell>Created by</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                            <Table.HeaderCell/>
                            <Table.HeaderCell  colSpan='3'>
                                <Button color='blue' icon='plus'
                                        label={{basic: true, color: 'blue', pointing: 'left', content: 'Add Course'}}
                                        onClick={this.show('blurring')}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {courseData}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                                {
                                    this.state.courses.length > 5
                                    ?  <Table.HeaderCell  colSpan='3'><Button color='blue' icon='plus'
                                    label={{basic: true, color: 'blue', pointing: 'left', content: 'Add Course'}}
                                    onClick={this.show('blurring')}
                                    />
                                    </Table.HeaderCell>
                                        : <Table.HeaderCell />

                                }
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <Modal dimmer={dimmer} open={open} onClose={this.close} closeOnDimmerClick={false}>
                    <Modal.Header>Create a new course</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form className="loginForm">
                                <Form.Input id="courseName" label='Enter course Name' type="string" required autoFocus onChange={this.handleTitleChange}/>
                                <Form.Input id="courseDesc" label='Please describe the course' type="string" required onChange={this.handleDescChange} />
                                <Menu compact>
                                    <Dropdown placeholder="Select Language..." selection search options={language} onChange={this.handleLangSelection}/>
                                    <Dropdown placeholder="Select Level..." selection search options={level} onChange={this.handleLevelSelection}/>
                                </Menu>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        <Button type='submit' positive icon='checkmark' labelPosition='right'
                                content="Create new course" onClick={this.handleCreateCourse.bind(this)}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default CourseList