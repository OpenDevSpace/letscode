import React, {Component} from 'react'
import {Accordion, Header, Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            completed: false,
            userRole: ''
        }
    }

    componentDidMount() {
        let task = this.props.completedTasks.map((task, index) => {
            return task;
        });

        for (let i = 0; i < task.length; i++) {
            if (task[i].toString() === this.props.task._id.toString()) {
                this.setState({
                    completed: true
                })
            } else {
                this.setState({
                    completed: false
                })

            }
        }

        console.log(this.props);

        this.setState({
            userRole: this.props.userRole
        })
    }

    render() {
        return (
            <Accordion exclusive={false}>
                <Accordion.Title className="inverted">
                    {
                        this.state.completed
                            ?
                            <Header as='h4' color='green'>
                            <Icon name='check circle outline'/>
                            {this.state.task.title} Edit
                        </Header>
                            :
                            <Header as='h4' color='blue'>
                                <Icon name='dropdown'/>
                                {this.state.task.title}
                            </Header>
                    }
                </Accordion.Title>
                <Accordion.Content>
                    {
                        this.state.userRole === 'Admin' || this.state.userRole === 'Moderator'
                            ?
                            <Button color='blue' icon='edit' floated='right' onClick={this.props.onClick} value={this.state.task._id}
                                    label={{basic: true, color: 'blue', pointing: 'left', content: 'Edit Tasks'}}
                            />
                            : null
                    }
                    <br/>
                    <Link to={'./' + this.props.courseID + "/" + this.state.task._id + "/process"}>
                        {this.state.task.introduction}
                    </Link>
                    <br/>
                    <br/>
                </Accordion.Content>
            </Accordion>
        );
    }
}

export default CreateTask