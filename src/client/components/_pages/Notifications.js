import React, {Component} from 'react'
import { Tab } from 'semantic-ui-react'
import NotificationPane from '../Notifications/NotificationPane'
import NotificationFrame from "../Base/Frame"

const panes = [
    { menuItem: 'Notifications', render: () => <Tab.Pane><NotificationPane/></Tab.Pane>},
    { menuItem: 'Messages', render: () => <Tab.Pane><NotificationPane/></Tab.Pane>}
]

class Notifications extends Component {
    render() {
        return (
            <NotificationFrame>
                <Tab panes={panes} />
            </NotificationFrame>
        )
    }
}

export default Notifications