import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Sidebar from './Sidebar'
import '../../styles/Frame.css'

class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'DASHBOARD'
        }
    }

    handleMyClick(button) {
        var active = this.state.active
        var newActive = {button}
        this.setState({
            active: newActive
        });
    }

    render() {
        let active = this.state.active
        const children = this.props.children

        return (
            <div className="mainContainer">
                <Header/>
                <div className="bodyDiv">
                    <div className="sidebarDiv">
                        <Sidebar onClick={() => this.handleMyClick({})}/>
                    </div>
                    <div className="dashboardContent">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

Frame.propTypes = {
    children: PropTypes.element.isRequired
}
export default Frame
