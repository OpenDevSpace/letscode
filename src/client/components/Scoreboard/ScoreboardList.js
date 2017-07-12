import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'


class ScoreboardList extends Component {
    render() {
        return (
            <div>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing>Place</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Finished Courses</Table.HeaderCell>
                            <Table.HeaderCell>Completed Tasks</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>John</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>83</Table.Cell>
                            <Table.Cell>133</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> 2</Table.Cell>
                            <Table.Cell>Jamie</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>56</Table.Cell>
                            <Table.Cell>98</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3</Table.Cell>
                            <Table.Cell>Jill</Table.Cell>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>49</Table.Cell>
                            <Table.Cell>80</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default ScoreboardList