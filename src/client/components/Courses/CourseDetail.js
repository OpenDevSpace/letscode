import React, {Component} from 'react'
import {Segment, Progress, Label, Accordion, Icon, Header, Divider, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../styles/CourseDetail.css'
import HTML5 from '../Icons/HTML5'
import JavaScript from '../Icons/JavaScript'
import CSS3 from '../Icons/CSS3'
import Java from "../Icons/Java";
import Python from "../Icons/Python";
import C from "../Icons/C";
import Web from "../Icons/WEB";

import $ from 'jquery'


class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 43,
            course: {}
        };

        $.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authentication", "Bearer " + localStorage.getItem("odslearncode"));
            }
        });
        $.get('http://localhost:8080/api/course/coursedetail/'+this.props.courseID)
            .done((course) => {
                this.setState({
                    course: course
                });
            });
    }

    increment = () => this.setState({
        percent: this.state.percent >= 100 ? 0 : this.state.percent + 20,
    })

    render() {
        return (
            <Segment raised className="courseDetailSegment">
                <Segment vertical>
                    <Header as='h2'>
                        <Image id="courseHeaderIcon">
                            {(() => {
                                switch (this.state.course.language) {
                                    case 'HTML5':
                                        return <HTML5 />
                                    case 'CSS3':
                                        return <CSS3 />
                                    case 'JavaScript':
                                        return <JavaScript />
                                    case 'java':
                                        return <Java />
                                    case 'python':
                                        return <Python/>
                                    case 'c':
                                        return <C />
                                    case 'web':
                                        return <Web/>
                                    default :
                                        return <HTML5 />
                                }
                            })()}
                        </Image>
                        <Header.Content>
                            {this.state.course.title}
                            <Header.Subheader>
                                {this.state.course.language} | <span>
                                {(() => {
                                    switch (this.state.course.level) {
                                        case 1:
                                            return "Easy"
                                        case 2:
                                            return "Medium"
                                        case 3:
                                            return "Advanced"
                                        default :
                                            null
                                    }
                                })()}
                            </span>
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    {this.state.course.description}
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