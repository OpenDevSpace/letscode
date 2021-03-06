import React, {Component} from 'react'
import {Card, Button, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../styles/CourseCard.css'
import Truncate from 'react-truncate'
import HTML5 from '../Icons/HTML5'
import JavaScript from '../Icons/JavaScript'
import CSS3 from '../Icons/CSS3'
import Java from "../Icons/Java";
import Python from "../Icons/Python";
import C from "../Icons/C";
import Web from "../Icons/WEB";


class CourseCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateToday: (new Date())
        }
    }
    render() {
        return (
            <div className="courseCards">
                <Link to={"/course/"+this.props.course._id}>
                    <Card className="courseCard" fluid={true} color={"blue"}>
                        <Card.Content>

                            <Label color='red' ribbon='right'>NEW</Label>

                            <div className="centeredStyle">
                                {(() => {
                                    switch (this.props.course.language) {
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
                            </div>
                            <Card.Header>
                                <div className="centeredStyle">
                                    {this.props.course.title}
                                </div>
                            </Card.Header>
                            <Card.Meta>
                                <div>
                                    {(() => {
                                        switch (this.props.course.level) {
                                            case 1:
                                                return "Easy"
                                            case 2:
                                                return "Medium"
                                            case 3:
                                                return "Advanced"
                                            default :
                                                return null
                                        }
                                    })()}
                                </div>
                            </Card.Meta>
                            <Card.Description>
                                <Truncate lines={5} ellipsis={<span>... <br/>Read more</span>}>
                                    {this.props.course.description}
                                </Truncate>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className="centeredStyle">
                                    <Button animated='fade' color='green' type='submit'>
                                        <Button.Content visible>
                                            Learn Programming?
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Start Course
                                        </Button.Content>
                                    </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Link>
            </div>
        );
    };
}

export default CourseCard