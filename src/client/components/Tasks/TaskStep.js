import React, {Component} from 'react'
import {Step, Icon, Segment, Header}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'


class TaskStep extends Component {
    render() {
        return (
            <Step.Group fluid={true}>
                <Step className="taskColumn">
                    <Segment vertical basic={true} color={"red"} className="taskSegment">
                        <Header as='h3'>
                            <Icon name='tasks'/>
                            <Header.Content>
                                {this.props.task.title}
                                <Header.Subheader>
                                    {this.props.task.description}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Segment>
                    <Step className="taskColumn" color={"grey"}>
                        <Segment vertical basic={true} color={"orange"} className="taskSegment">
                            <Header as='h3'>
                                <Icon name={this.props.task.icon}/>
                                <Header.Content>
                                    <p>Blubb</p>
                                    <Header.Subheader>
                                        Write code
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Segment>
                    </Step>
                    <Step className="taskColumn" color={"grey"}>
                        <Segment vertical basic={true} color={"yellow"} className="taskSegment">
                            <Header as='h3'>
                                <Icon name='code'/>
                                <Header.Content>
                                    See What Happens
                                    <Header.Subheader>
                                        right here
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Segment>
                    </Step>
                </Step>
            </Step.Group>
        )
    }
}

export default TaskStep