import React, {Component} from 'react'
import { Button, Table } from 'semantic-ui-react'
import courseData from '../../../data/Courses'
import CourseOverviewItem from './CourseListItem'
import '../../../styles/CourseList.css'



class CourseList extends Component {
    render() {
        let courseInfo = courseData.map((course, index) => {
            return <CourseOverviewItem course={course}/>;
        });
        return (
            <div>
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Maximum Members</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell>Visibility</Table.HeaderCell>
                            <Table.HeaderCell>Active</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {courseInfo}
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
                            <Table.HeaderCell>
                                <Button primary size='small'>
                                    Add Course
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

export default CourseList