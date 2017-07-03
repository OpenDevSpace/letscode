import React, {Component} from 'react'
import { Button, Table } from 'semantic-ui-react'
import UserListItem from './UserListItem'
import '../../../styles/CourseList.css'
import $ from 'jquery'


class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state
    }
    componentDidMount(){
        $.get('http://localhost:8080/api/user/list')
            .done((data) => {
            this.setState(data);
            });
        console.log(this.state);
    }
    render() {
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
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
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