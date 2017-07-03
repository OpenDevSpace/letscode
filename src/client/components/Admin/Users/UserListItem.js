import React, {Component} from 'react'
import {Checkbox, Table, Menu, Dropdown} from 'semantic-ui-react'
import rightsConfig from '../../../config/Rights'
import '../../../styles/CourseList.css'

class CourseOverviewItem extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.user.firstName}</Table.Cell>
                <Table.Cell>{this.props.user.lastName}</Table.Cell>
                <Table.Cell>{this.props.user.email}</Table.Cell>
                <Table.Cell>{this.props.user.created}</Table.Cell>
                <Table.Cell>
                <Menu compact>
                    <Dropdown className="roleDropdown" text={this.props.user.role} fluid selection options={rightsConfig} />
                </Menu>
                </Table.Cell>
                <Table.Cell>{this.props.user.courses}</Table.Cell>

                <Table.Cell>
                    <Checkbox toggle checked={this.props.user.active} />
                </Table.Cell>
            </Table.Row>
        );
    };
}

export default CourseOverviewItem