import React, {Component} from 'react'
import {Checkbox, Table, Menu, Dropdown, Button} from 'semantic-ui-react'
import rightsConfig from '../../../config/Rights'
import '../../../styles/CourseList.css'

class UserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            rights: rightsConfig,
            user: this.props.user
        }
    }
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.state.user.firstName}</Table.Cell>
                <Table.Cell>{this.state.user.lastName}</Table.Cell>
                <Table.Cell>{this.state.user.email}</Table.Cell>
                <Table.Cell collapsing>{this.state.user.created}</Table.Cell>
                <Table.Cell collapsing>
                <Menu compact>
                    <Dropdown className="roleDropdown" text={this.state.user.role} fluid selection options={this.state.rights} />
                </Menu>
                </Table.Cell>
                <Table.Cell>{this.state.user.courses}</Table.Cell>

                <Table.Cell collapsing>
                    <Checkbox toggle checked={this.state.user.active} />
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button color='blue' icon='edit'
                            label={{basic: true, color: 'blue', pointing: 'left', content: 'Edit user'}}
                            onClick={() => { console.log("edit click!")}}
                    />
                </Table.Cell>
            </Table.Row>
        );
    };
}

export default UserListItem