import React, {Component} from 'react'
import {Segment, Progress, Label, Accordion, Icon, Header, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import courseData from '../../data/Courses'
import '../../styles/CourseDetail.css'


class CourseDetails extends Component {
    state = {percent: 43}

    increment = () => this.setState({
        percent: this.state.percent >= 100 ? 0 : this.state.percent + 20,
    })

    render() {
        let selectedCourse = this.props.courseID;

        return (
            <Segment raised className="courseDetailSegment">
                <Segment vertical>
                    <h2>{courseData[selectedCourse].name}</h2>
                    {courseData[selectedCourse].description}
                </Segment>
                <Segment vertical>
                    <Accordion exclusive={false} defaultActiveIndex={1}>
                        <Accordion.Title className="inverted">
                            <Header as='h3' color='blue'>
                                <Progress className="courseProgress" percent={this.state.percent} indicating/>
                                <Icon name='dropdown'/>
                                Your progress
                            </Header>
                        </Accordion.Title>
                        <Accordion.Content>
                            <Accordion exclusive={false} defaultActiveIndex={1}>
                                <Accordion.Title className="inverted">
                                    <Header as='h5' color='blue'>
                                        <Icon name='dropdown'/>
                                        1. Basics
                                    </Header>
                                </Accordion.Title>
                                <Accordion.Content>
                                    Some details
                                </Accordion.Content>
                                <Accordion.Title className="inverted">
                                    <Header as='h5' color='blue'>
                                        <Icon name='dropdown'/>
                                        2. Nice stuff
                                    </Header>
                                </Accordion.Title>
                                <Accordion.Content>
                                    Some more details
                                </Accordion.Content>
                            </Accordion>
                        </Accordion.Content>
                    </Accordion>
                    <Divider/>
                    <Link to={"/course/"+this.props.courseID+"/edit"}>
                        <Label content='Continue with next task.' icon='terminal' color={"green"} size={"big"}/>
                    </Link>
                </Segment>
            </Segment>
        )
    }
}

export default CourseDetails