import React, {Component} from 'react'
import {Accordion, Header, Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            completed: false,
            userRole: '',
            nextTaskID: ''
        }
    }

    componentDidMount() {
        let task = this.props.completedTasks.map((task, index) => {
            return task;
        });

        if(task.indexOf(this.props.task._id) !== -1) {
            this.setState({
                completed: true
            })
        } else {
            this.setState({
                completed: false
            })
        }

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
                            {this.state.task.title}
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