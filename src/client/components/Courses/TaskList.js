import React, {Component} from 'react'
import {Accordion, Header, Icon} from 'semantic-ui-react'


class CreateTask extends Component {
    render() {
        return (
            <Accordion exclusive={false}>
                <Accordion.Title className="inverted">
                    <Header as='h5' color='blue'>
                        <Icon name='dropdown'/>
                        1. Basics test
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