import React, {Component} from 'react'
import {Button, Checkbox, Icon, Table, Menu, Dropdown} from 'semantic-ui-react'
import '../../../styles/CourseList.css'
import viewData from '../../../data/Visibilitiy'

class CourseOverviewItem extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.course.id}</Table.Cell>
                <Table.Cell>{this.props.course.name}</Table.Cell>
                <Table.Cell>{this.props.course.description}</Table.Cell>
                <Table.Cell>{this.props.course.language}</Table.Cell>
                <Table.Cell>{this.props.course.maxMembers}</Table.Cell>
                <Table.Cell>{this.props.course.level}</Table.Cell>
                <Table.Cell>
                    <Menu compact>
                        <Dropdown className="visibilityDropdown" text={viewData[this.props.course.visibility-1].text} fluid selection options={viewData} />
                    </Menu>
                </Table.Cell>
                <Table.Cell>
                    <Checkbox toggle checked={this.props.course.active}/>
                </Table.Cell>
            </Table.Row>
        );
    };
}

export default CourseOverviewItem