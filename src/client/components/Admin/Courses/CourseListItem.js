import React, {Component} from 'react'
import {Checkbox, Table, Icon} from 'semantic-ui-react'
import '../../../styles/CourseList.css'

class CourseOverviewItem extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.course.title}</Table.Cell>
                <Table.Cell>{this.props.course.description}</Table.Cell>
                <Table.Cell>{this.props.course.language}</Table.Cell>
                <Table.Cell>{this.props.course.level}</Table.Cell>
                <Table.Cell>{this.props.course.tags}</Table.Cell>
                <Table.Cell>{this.props.course.timestamp}</Table.Cell>
                <Table.Cell>{this.props.course.createdBy}</Table.Cell>
                <Table.Cell>
                    <Checkbox toggle checked={this.props.course.active}/>
                </Table.Cell>
                <Table.Cell><Icon name={"edit"}/></Table.Cell>
            </Table.Row>
        );
    };
}

export default CourseOverviewItem