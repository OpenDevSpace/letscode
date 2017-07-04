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
                <Table.Cell>
                    <div>
                        {(() => {
                            switch (this.props.course.level) {
                                case 1:
                                    return "Easy"
                                case 2:
                                    return "Medium"
                                case 3:
                                    return "Hard"
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
                    <Checkbox toggle checked={this.props.course.active}/>
                </Table.Cell>
                <Table.Cell><Icon name={"edit"}/></Table.Cell>
            </Table.Row>
        );
    };
}

export default CourseOverviewItem