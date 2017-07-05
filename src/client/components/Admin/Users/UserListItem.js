import React, {Component} from 'react'
import {Checkbox, Table, Menu, Dropdown, Button, Form, Icon} from 'semantic-ui-react'
import rightsConfig from '../../../config/Rights'
import '../../../styles/CourseList.css'

import $ from 'jquery'

class UserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,
            rights: rightsConfig,
            user: this.props.user,
            tempUser: this.props.user
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRoleSelection = this.handleRoleSelection.bind(this);
    }

    handleEditClick(){
        this.setState(prevState => ({
            editUser: !prevState.editUser
        }));
    }

    updateRequest() {
        //var requestdata = $.extend(true, {}, this.state.user);

    }

    updateUser(change, evt) {
        var temp = $.extend(true, {}, this.state.tempUser);
        if (change === 'active') {
            temp['active'] = !this.state.user.active;
            this.setState({
                course: temp
            });
            this.updateRequest();
        } else if (change === 'role') {
            temp[change] = this.switchRoleValueToText(evt);
            console.log(temp[change]);
            this.setState({
                tempCourse: temp
            });
        } else {
            temp[change] = evt.target.value;
            this.setState({
                tempUser: temp
            });
        }
    }

    switchRoleValueToText(evt) {
        switch (evt.value) {
            case 1: return "Standard";
                break;
            case 2: return "Moderator";
                break;
            case 3: return "Admin";
                break;
            default: return "Standard";
        }
    }
    switchRoleTextToValue(){
    console.log(this.state.tempUser.role);
        switch (this.state.tempUser.role) {
            case "Standard": return 1;
                break;
            case "Moderator": return 2;
                break;
            case "Admin": return 3;
                break;
            default: return 1;
        }
    }

    handleActiveChange(evt) {
        this.updateUser("active", evt);
    }

    handleFirstNameChange(evt) {
        this.updateUser('firstName', evt);
    }
    handleLastNameChange(evt) {
        this.updateUser('lastName', evt);
    }
    handleEmailChange(evt) {
        this.updateUser('email', evt);
    }

    handleRoleSelection(evt, role) {
        this.updateUser('role', role)
    }

    handleUserUpdate(evt) {
        console.log(this.state.tempUser);
        this.handleEditClick();
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
                                <input defaultValue={this.state.user.firstName} onChange={this.handleFirstNameChange}/>
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
                                <input defaultValue={this.state.user.lastName} onChange={this.handleLastNameChange}/>
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
                                <input defaultValue={this.state.user.email} onChange={this.handleEmailChange}/>
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
                            <Dropdown className="roleDropdown" selection options={this.state.rights}
                                      placeholder="User role"
                                      defaultValue={this.switchRoleTextToValue()}
                                      onChange={this.handleRoleSelection}/>
                        </Menu>
                    }
                </Table.Cell>
                <Table.Cell>{this.state.user.courses}</Table.Cell>

                <Table.Cell collapsing>
                    {
                        !(this.state.editUser)
                            ? <span>{
                            (this.state.user.active)
                            ? <Icon name="checkmark" color={"green"}/>
                                : <Icon name="remove" color={"red"}/>
                        } </span>
                            : <Checkbox toggle checked={this.state.user.active} onChange={this.handleActiveChange}/>
                    }
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
                                      onClick={this.handleUserUpdate.bind(this)} />
                    }
                </Table.Cell>
            </Table.Row>
        );
    };
}

export default UserListItem