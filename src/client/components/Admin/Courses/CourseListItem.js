import React, {Component} from 'react'
import {Checkbox, Table, Modal, Button, Form, Menu, Dropdown} from 'semantic-ui-react'
import '../../../styles/CourseList.css'
import $ from 'jquery';

const language = [
    {key: 'web', text: 'web', value: 'web'},
    {key: 'java', text: 'java', value: 'java'},
    {key: 'c', text: 'c', value: 'c'},
    {key: 'python', text: 'python', value: 'python'}
]
const level = [
    {key: 'easy', text: 'easy', value: '1'},
    {key: 'medium', text: 'medium', value: '2'},
    {key: 'advanced', text: 'advanced', value: '3'}
]


class CourseOverviewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            course: this.props.course
        }
        this.changeActivity = this.changeActivity.bind(this);

    }

    show = (dimmer) => () => this.setState({dimmer, open: true});
    close = () => this.setState({open: false});


    updateCourseItem(item, evt) {
        var tempCourse = this.state.course;
        if (item === "active") {
            tempCourse[item] = !this.state.course.active;
        }
        console.log("Bin hier");
        this.setState({
            course: tempCourse
        });

        var requestdata = $.extend(true, {}, this.state.course);
        requestdata["createdBy"] = this.state.course.createdBy._id;

        $.post('http://localhost:8080/api/course/update/'+this.state.course._id, requestdata)
            .done((data) => {
            console.log(data);
            });
    }

    changeActivity(evt) {
        this.updateCourseItem("active", evt);
    }
    render() {
        const {open, dimmer} = this.state;
        return (
            <Table.Row>
                <Table.Cell>{this.state.course.title}</Table.Cell>
                <Table.Cell>{this.props.course.description}</Table.Cell>
                <Table.Cell>{this.props.course.language}</Table.Cell>
                <Table.Cell>
                    <div>
                        {(() => {
                            switch (this.props.course.level) {
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
                    </div>
                </Table.Cell>
                <Table.Cell>{this.props.course.tags}</Table.Cell>
                <Table.Cell>{this.props.course.timestamp}</Table.Cell>
                <Table.Cell>{this.props.course.createdBy.firstName} {this.props.course.createdBy.lastName}</Table.Cell>
                <Table.Cell>
                    <Checkbox toggle checked={this.state.course.active} onChange={this.changeActivity}/>
                </Table.Cell>
                <Table.Cell>
                    <Button color='blue' icon='edit'
                            label={{basic: true, color: 'blue', pointing: 'left', content: 'Edit course'}}
                            onClick={this.show('blurring')}
                    />
                </Table.Cell>
                <Modal dimmer={dimmer} open={open} onClose={this.close} closeOnDimmerClick={false}>
                    <Modal.Header>Edit {this.props.course.title} course</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form className="loginForm">
                                <Form.Input id="courseName" label='Enter course Name' type="string"
                                            defaultValue={this.props.course.title} required autoFocus
                                            onChange={this.handleTitleChange}/>
                                <Form.Input id="courseDesc" label='Please describe the course' type="string"
                                            defaultValue={this.props.course.description} required
                                            onChange={this.handleDescChange}/>
                                <Menu compact>
                                    <Dropdown placeholder="Select Language..." selection search options={language}
                                              defaultValue={this.props.course.language}
                                              onChange={this.handleLangSelection}/>
                                    <Dropdown placeholder="Select Level..." selection search options={level}
                                              defaultValue={this.props.course.level}
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
                                content="Create new course"/>
                    </Modal.Actions>
                </Modal>
            </Table.Row>
        );
    };
}

export default CourseOverviewItem