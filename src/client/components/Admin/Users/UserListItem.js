import React, {Component} from 'react'
import {Checkbox, Table, Menu, Dropdown, Button, Form} from 'semantic-ui-react'
import rightsConfig from '../../../config/Rights'
import '../../../styles/CourseList.css'

class UserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,
            rights: rightsConfig,
            user: this.props.user
        }
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick(){
        this.setState(prevState => ({
            editUser: !prevState.editUser
        }));

    }

    render() {
        let date = (this.state.user.created);

        let myDate = date.substring(8, 10) + "." +
                    date.substring(5, 7) + "." +
                    date.substring(0, 4) + " " +
                    date.substring(11, 16) + " Uhr";
        return (
            <Table.Row>
                <Table.Cell>
                    {
                        !(this.state.editUser)
                            ? <span>{this.state.user.firstName}</span>
                            : <Form>
                            <Form.Field>
                                <input value={this.state.user.firstName}/>
                            </Form.Field>
                        </Form>
                    }
                </Table.Cell>
                <Table.Cell>
                    {
                        !(this.state.editUser)
                            ? <span>{this.state.user.lastName}</span>
                            : <Form>
                            <Form.Field>
                                <input value={this.state.user.lastName}/>
                            </Form.Field>
                        </Form>
                    }
                    </Table.Cell>
                <Table.Cell>
                    {
                        !(this.state.editUser)
                            ? <span>{this.state.user.email}</span>
                            : <Form>
                            <Form.Field>
                                <input value={this.state.user.email}/>
                            </Form.Field>
                        </Form>
                    }
                    </Table.Cell>
                <Table.Cell collapsing>{myDate}</Table.Cell>
                <Table.Cell collapsing>
                    {
                        !(this.state.editUser)
                            ? <span>{this.state.user.role}</span>
                            : <Menu compact>
                            <Dropdown className="roleDropdown" text={this.state.user.role} fluid selection
                                      options={this.state.rights}/>
                        </Menu>
                    }
                </Table.Cell>
                <Table.Cell>{this.state.user.courses}</Table.Cell>

                <Table.Cell collapsing>
                    <Checkbox toggle checked={this.state.user.active}/>
                </Table.Cell>
                <Table.Cell collapsing>
                    {
                        !(this.state.editUser)
                            ? <Button color='blue' icon='edit'
                                      label={{basic: true, color: 'blue', pointing: 'left', content: 'Edit user'}}
                                      onClick={() => {
                                          this.handleEditClick();
                                      }} />
                            : <Button color='green' icon='checkmark'
                                      label={{basic: true, color: 'green', pointing: 'left', content: 'Ok, done'}}
                                      onClick={() => {
                                          this.handleEditClick();
                                      }} />
                    }
                </Table.Cell>
            </Table.Row>
        );
    };
}

export default UserListItem