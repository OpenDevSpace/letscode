import React, {Component} from 'react'
import {Card, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../styles/CourseCard.css'
import Truncate from 'react-truncate'
import HTML5 from '../Icons/HTML5'
import JavaScript from '../Icons/JavaScript'
import CSS3 from '../Icons/CSS3'


class CourseCard extends Component {
    render() {
        return (
            <div className="courseCards">
                <Link to={"/course/"+this.props.course.id}>
                    <Card className="courseCard" fluid={true} color={"blue"}>
                        <Card.Content>
                            <div className="centeredStyle">
                                {(() => {
                                    switch (this.props.course.name) {
                                        case 'HTML5':
                                            return <HTML5 />
                                        case 'CSS3':
                                            return <CSS3 />
                                        case 'JavaScript':
                                            return <JavaScript />
                                        default :
                                            null
                                    }
                                })()}<this.props.course.name/>
                            </div>
                            <Card.Header>
                                <div className="centeredStyle">
                                    {this.props.course.name}
                                </div>
                            </Card.Header>
                            <Card.Meta>
                                {this.props.course.level}
                            </Card.Meta>
                            <Card.Description>
                                <Truncate lines={5} ellipsis={<span>... <br/><Link to={"/course/"+this.props.course.id}>Read more</Link></span>}>
                                    {this.props.course.description}
                                </Truncate>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className="centeredStyle">
                                <Link to={"/course/"+this.props.course.id+"/edit"}>
                                    <Button animated='fade' color='green' type='submit' centered>
                                        <Button.Content visible>
                                            Learn Programming?
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Start Course
                                        </Button.Content>
                                    </Button>
                                </Link>
                            </div>
                        </Card.Content>
                    </Card>
                </Link>
            </div>
        );
    };
}

export default CourseCard