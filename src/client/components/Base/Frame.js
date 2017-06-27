import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Sidebar from './Sidebar'
import '../../styles/Frame.css'

class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        }
    }

    render() {
        const children = this.props.children
        return (
            <div className="mainContainer">
                <Header/>
                <div className="bodyDiv">
                    <div className="sidebarDiv" >
                        <Sidebar type={this.props.type}/>
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
