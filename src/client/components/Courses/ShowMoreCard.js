import React, {Component} from 'react'
import {Button, Icon} from 'semantic-ui-react'
import '../../styles/CourseCard.css'

class ShowMoreCard extends Component {
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