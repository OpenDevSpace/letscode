import React, {Component} from 'react'
import {Button, Table, Modal, Menu, Form, Input, Dropdown} from 'semantic-ui-react'
import CourseOverviewItem from './CourseListItem'
import '../../../styles/CourseList.css'
import $ from 'jquery'

const options = [
    {key: 'web', text: 'web', value: 'web'},
    {key: 'java', text: 'java', value: 'java'},
    {key: 'c', text: 'c', value: 'c'},
    {key: 'python', text: 'python', value: 'python'}
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
                tags: []
            }
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleLangSelection = this.handleLangSelection.bind(this);

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });
    }

    updateNewCourse(currentInput, evt){
        var tempCourse = this.state.newcourse;
        if(currentInput === "language") {
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

    handleCreateCourse(evt){
        $.post("http://localhost:8080/api/course/new", this.state.newcourse)
            .done((data) => {
            this.close();
        });
    }


    show = (dimmer) => () => this.setState({dimmer, open: true})
    close = () => this.setState({open: false})

    render() {
        const {open, dimmer} = this.state

        let courseData = this.state.courses.map((course, index) => {
            return <CourseOverviewItem course={course}/>
        });

        return (
            <div>
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Maximum Members</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell>Visibility</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {/* {courseData} */}
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
                            <Table.HeaderCell>
                                <Button primary size='small' onClick={this.show('blurring')}>
                                    Add Course
                                </Button>
                            </Table.HeaderCell>
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
                                    <Dropdown placeholder="Select Language..." fluid selection search options={options} onChange={this.handleLangSelection}/>
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