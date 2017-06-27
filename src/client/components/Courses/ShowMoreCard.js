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
            <Button fluid animated='vertical'>
                <Button.Content hidden><Icon name={this.props.icon}/></Button.Content>
                <Button.Content visible>
                    {this.props.text}
                </Button.Content>
            </Button>
        );
    };
}

export default ShowMoreCard