import React, {Component} from 'react'
import {Checkbox, Table, Modal, Button, Form, Menu, Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../../styles/CourseList.css'
import Truncate from 'react-truncate'
import $ from 'jquery';

const language = [
    {key: 'web', text: 'web', value: 'web'},
    {key: 'java', text: 'java', value: 'java'},
    {key: 'c', text: 'c', value: 'c'},
    {key: 'python', text: 'python', value: 'python'}
]
const level = [
    {key: '1', text: 'easy', value: 1},
    {key: '2', text: 'medium', value: 2},
    {key: '3', text: 'advanced', value: 3}
]


class CourseOverviewItem extends Component {
    constructor(props) {
        super(props);

        var testVar = $.extend(true, this.props.course, {});

        this.state = {
            open: false,
            course: this.props.course,
            tempCourse: this.props.course,
            levelText: ''
        }

        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleLangSelection = this.handleLangSelection.bind(this);
        this.handleLevelSelection = this.handleLevelSelection.bind(this);
    }

    show = (dimmer) => () => {
        this.setState({
            dimmer, open: true
        });
    }
    close = () => this.setState({open: false});

    updateRequest() {
        var requestdata = $.extend(true, {}, this.state.tempCourse);
        requestdata["createdBy"] = this.state.course.createdBy._id;

        $.post('http://localhost:8080/api/course/update/'+this.state.course._id, requestdata)
            .done((data) => {

            })
            .fail((data) => {

            });
    }


    changeCourse(change, evt) {
        var temp = $.extend(true, this.state.course, {});
        if (change === 'active') {
            temp['active'] = !this.state.course.active;
            this.setState({
                tempCourse: temp
            });
            this.updateRequest();
        } else {
            if (change === 'language' || change === 'level') {
                temp[change] = evt.value;
            } else {
                temp[change] = evt.target.value;
            }
            this.setState({
                tempCourse: temp
            });
        }
    }

    handleActiveChange(evt) {
        this.changeCourse("active", evt);
    }

    handleTitleChange(evt) {
        this.changeCourse('title', evt);
    }

    handleDescChange(evt) {
        this.changeCourse('description', evt);
    }

    handleLangSelection(evt, lang) {
        this.changeCourse('language', lang);
    }

    handleLevelSelection(evt, level) {
        this.changeCourse('level', level);
    }

    handleCourseUpdate(evt) {
        var temp = $.extend(true, this.state.tempCourse, {});
        this.setState({
            course: temp
        });
        this.updateRequest();
        this.close();
    }

    getLevel() {
        switch (this.state.course.level) {
            case 1:
                this.state.levelText = "easy";
                break;
            case 2:
                this.state.levelText =  "medium";
                break;
            case 3:
                this.state.levelText = "advanced";
                break;
            default :
                null;
        }
    }

    render() {
        let date = (this.state.course.timestamp);

        let myDate = date.substring(8, 10) + "." +
            date.substring(5, 7) + "." +
            date.substring(0, 4) + " " +
            date.substring(11, 16) + " Uhr";

        const {open, dimmer} = this.state;
        this.getLevel();
        return (
            <Table.Row>
                <Table.Cell>{this.state.course.title}</Table.Cell>
                <Table.Cell>
                    <Truncate lines={1} ellipsis={<span>... <Button size='mini' basic color='orange' onClick={this.show('blurring')}>Read more</Button></span>}>
                        {this.state.course.description}
                    </Truncate>
                    </Table.Cell>
                <Table.Cell collapsing>{this.state.course.language}</Table.Cell>
                <Table.Cell collapsing>{this.state.levelText}</Table.Cell>
                <Table.Cell>{this.state.course.tags}</Table.Cell>
                <Table.Cell collapsing>{myDate}</Table.Cell>
                <Table.Cell>{this.state.course.createdBy.firstName} {this.state.course.createdBy.lastName}</Table.Cell>
                <Table.Cell collapsing>
                    <Checkbox toggle checked={this.state.course.active} onChange={this.handleActiveChange}/>
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button color='blue' icon='edit'
                            label={{basic: true, color: 'blue', pointing: 'left', content: 'Edit course'}}
                            onClick={this.show('blurring')}
                    />
                </Table.Cell>
                <Table.Cell collapsing>
                    <Link to={"../course/"+this.state.course._id}>
                        <Button color='orange' icon='plus'
                                label={{basic: true, color: 'orange', pointing: 'left', content: 'Add Tasks'}}
                        />
                    </Link>
                </Table.Cell>
                <Modal dimmer={dimmer} open={open} onClose={this.close} closeOnDimmerClick={false}>
                    <Modal.Header>Edit "{this.state.course.title}" course</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form className="loginForm">
                                <Form.Input id="courseName" label='Enter course Name' type="string"
                                            defaultValue={this.state.course.title} required autoFocus
                                            onChange={this.handleTitleChange}/>
                                <Form.TextArea id="courseDesc" label='Please describe the course' type="string"
                                            defaultValue={this.state.course.description} required
                                            onChange={this.handleDescChange}/>
                                <Menu compact>
                                    <Dropdown placeholder="Select Language..." selection search options={language}
                                              defaultValue={this.state.course.language}
                                              onChange={this.handleLangSelection}/>
                                    <Dropdown placeholder="Select Level..." selection search options={level}
                                              defaultValue={this.state.course.level}
                                              onChange={this.handleLevelSelection}/>
                                </Menu>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        <Button type='submit' positive icon='checkmark' labelPosition='right'
                                content="Update course" onClick={this.handleCourseUpdate.bind(this)} />
                    </Modal.Actions>
                </Modal>
            </Table.Row>
        );
    };
}

export default CourseOverviewItem