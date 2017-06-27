import React, {Component} from 'react'
import {Step, Icon, Segment, Header, Form, Checkbox, Radio}from 'semantic-ui-react'
import '../../styles/TaskWrapper.css'


class TaskWorkspace extends Component {
    constructor(props) {
        super(props);
    }
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (
            <Segment vertical basic={true} color={"orange"} className="taskSegment">
                <Header as='h3'>
                    <Icon name="code"/>
                    <Header.Content>
                        Whats the answer?
                        <Header.Subheader>
                            Mark right answers
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Form.Group grouped>

                    <Form.Field label={this.props.currentTask.option1} className="myCheckbox"
                                control={Checkbox} type='checkbox' />
                    <Form.Field label={this.props.currentTask.option2} className="myCheckbox"
                                control={Checkbox} type='checkbox' />
                    <Form.Field label={this.props.currentTask.option3} className="myCheckbox"
                                control={Checkbox} type='checkbox' />
                    <Form.Field label={this.props.currentTask.option4} className="myCheckbox"
                                control={Checkbox} type='checkbox' />
                </Form.Group>

                <Form.Group inline>
                    <label>Quantity</label>
                    <Form.Field control={Radio} label='One' value='1' checked={value === '1'} onChange={this.handleChange} />
                    <Form.Field control={Radio} label='Two' value='2' checked={value === '2'} onChange={this.handleChange} />
                    <Form.Field control={Radio} label='Three' value='3' checked={value === '3'} onChange={this.handleChange} />
                </Form.Group>
            </Segment>
        )
    }
}

export default TaskWorkspace