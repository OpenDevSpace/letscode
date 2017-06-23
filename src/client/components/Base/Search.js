import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'

class SearchComponent extends Component {
    render() {
        return (
            <div className="headerSearch">
                <Search size={'small'} icon={{name: 'search', circular: true, link: true}}/>
            </div>
        )
    }
}

export default SearchComponent