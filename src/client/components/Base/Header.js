import React, {Component} from 'react'
import SearchComponent from './Search'
import '../../styles/Header.css'


class Header extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="headerBar">
                <SearchComponent className="SearchComponent"/>
            </div>
        )
    }
}

export default Header