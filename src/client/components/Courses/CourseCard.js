import React, {Component} from 'react'
import {Card, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../styles/CourseCard.css'


class CourseCard extends Component {
    render() {
        return (
            <div className="courseCards">
                <Link to={"/course/"+this.props.course.id}>
                    <Card className="courseCard">
                        <Card.Content>
                            <div className="centeredStyle">
                                <svg viewBox="0 0 80 80" width="96" height="96" fill="#3A3A3A" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title" data-reactid="46"><title data-reactid="47">Javascript Icon</title><path d="M0,0V80H80V0ZM75.2,75.2H4.8V4.8H75.2Z" data-reactid="48"></path><path id="_Path_" data-name="&lt;Path&gt;" d="M62.34,63.7a6.26,6.26,0,0,1-1.95,1,9.19,9.19,0,0,1-9.83-3c-.2-.24-.39-.49-.57-.75l-3.86,2.24a11.78,11.78,0,0,0,3.62,3.63A13.9,13.9,0,0,0,56,68.9a16.17,16.17,0,0,0,6.86-.65A8.67,8.67,0,0,0,68,64.31,9.12,9.12,0,0,0,69,59.24a8.46,8.46,0,0,0-3.25-6.61,24.34,24.34,0,0,0-5.53-3.13L59.11,49c-1-.43-2-.88-3-1.38a9.48,9.48,0,0,1-2.14-1.48,4.69,4.69,0,0,1-1.25-4.42,4.44,4.44,0,0,1,3.18-3.3,6.5,6.5,0,0,1,3.41,0,6,6,0,0,1,3.48,2.48l3.58-2.3a8.92,8.92,0,0,0-4-3.36,12.64,12.64,0,0,0-7.86-.51A8.25,8.25,0,0,0,49,38.63a8.72,8.72,0,0,0-1.08,5.15,8.46,8.46,0,0,0,2.75,6,18.43,18.43,0,0,0,5.05,3.07l.94.42c1.35.6,2.75,1.22,4.11,1.88a8,8,0,0,1,2,1.45,4.66,4.66,0,0,1-.49,7.13Z" data-reactid="49"></path><path id="_Path_2" data-name="&lt;Path&gt;" d="M24,68a12.84,12.84,0,0,0,9.26.33,7.43,7.43,0,0,0,5-5,13.89,13.89,0,0,0,.64-4.61V34.79h-4.8v4.16q0,9.84,0,19.68a14.68,14.68,0,0,1-.16,2.17,4.44,4.44,0,0,1-2.25,3.53,6,6,0,0,1-6.07-.25,6.74,6.74,0,0,1-2-2.2l-.14-.22L19.55,64A9.41,9.41,0,0,0,24,68Z" data-reactid="50"></path></svg>
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
                                {this.props.course.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className="centeredStyle">
                                <Link to={"/course/"+this.props.course.id+"/edit"}>
                                <Button basic color='green' >Start Course</Button>
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