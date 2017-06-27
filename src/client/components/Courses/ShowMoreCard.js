import React, {Component} from 'react'
import {Card, Button, Segment, Header, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../styles/CourseCard.css'

class ShowMoreCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="courseCards showMoreLess">
                <Link to={"/dashboard"}>
                <Segment circular className="showMore">
                    <Header as='h2' icon>
                        <Icon name={this.props.icon} />
                        {this.props.text}
                    </Header>
                </Segment>
                </Link>
            </div>
        );
    };
}

export default ShowMoreCard