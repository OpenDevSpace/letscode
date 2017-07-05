import React, {Component} from 'react'
import {Accordion, Header, Icon} from 'semantic-ui-react'


class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task
        }
    }

    render() {
        return (
            <Accordion exclusive={false}>
                <Accordion.Title className="inverted">
                    <Header as='h5' color='blue'>
                        <Icon name='dropdown'/>
                        {this.state.task.title}
                    </Header>
                </Accordion.Title>
                <Accordion.Content>
                    Some details
                </Accordion.Content>
            </Accordion>
        )
    }
}

export default CreateTask