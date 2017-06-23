import React, {Component} from 'react'
import {Accordion, Icon, Header} from 'semantic-ui-react'


class AccountSettings extends Component {

    render() {
        return (
            <Accordion styled exclusive={false} defaultActiveIndex={1} fluid={true} className="settings">
                <Accordion.Title className="inverted">
                    <Header as='h3' color='blue'>
                        <Icon name='dropdown'/>
                        Account Details
                    </Header>
                </Accordion.Title>
                <Accordion.Content>
                    <p>
                        Here you can change E-Mail address
                    </p>
                </Accordion.Content>
                <Accordion.Title>
                    <Header as='h3' color='blue'>
                        <Icon name='dropdown'/>
                        Security
                    </Header>
                </Accordion.Title>
                <Accordion.Content>
                    <p>
                        Here you can change password
                    </p>
                </Accordion.Content>
                <Accordion.Title>
                    <Header as='h3' color='blue'>
                        <Icon name='dropdown'/>
                        Notifications
                    </Header>
                </Accordion.Title>
                <Accordion.Content>
                    <p>
                        Here you can change notification settings
                    </p>
                </Accordion.Content>
            </Accordion>
        )
    }
}

export default AccountSettings