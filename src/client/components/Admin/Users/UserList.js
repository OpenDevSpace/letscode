import React, {Component} from 'react'
import { Button, Table } from 'semantic-ui-react'
import UserListItem from './UserListItem'
import '../../../styles/CourseList.css'
import $ from 'jquery'


class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });

        $.get("http://localhost:8080/api/user/listall")
            .fail(() => {
                console.log("Failure!");
            })
            .done((data) => {
                this.setState({
                    users: data
                })
            });
    }


    render() {
        let userData = this.state.users.map((user, index) => {
            return <UserListItem user={user}/>
        });
        return (
            <div>
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>E-Mail</Table.HeaderCell>
                            <Table.HeaderCell>Registered</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Courses</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                            <Table.HeaderCell/>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {userData}
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
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

export default CourseList