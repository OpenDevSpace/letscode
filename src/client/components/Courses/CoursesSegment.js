import React, {Component} from 'react'
import Card from './CourseCard'
import ShowMoreLess from './ShowMoreCard'
import {Segment, Container, Header} from 'semantic-ui-react'
import courseData from '../../data/Courses'
import '../../styles/CoursesSegment.css'


class AttendedCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseInfo: courseData,
            itemsToShow: 3,
            expanded: false
        }
        this.showMore = this.showMore.bind(this)
    }

    showMore() {
        this.state.itemsToShow === 3 ? (
            this.setState({itemsToShow: this.state.courseInfo.length, expanded: true})
        ) : (
            this.setState({itemsToShow: 3, expanded: false})
        )
    }

    render() {
        return <Container fluid className="CoursesSegment">
            <Segment>
                <h2>Your Courses</h2>
                <h3>You attend to: {this.props.courses.length} courses</h3>
                {
                    this.props.courses.length === 0
                        ? <div>
                        It looks empty here. How about looking for some courses?
                    </div>
                        :
                        <div>
                            {this.state.courseInfo.slice(0, this.state.itemsToShow).map((courseInfo, i) =>
                                <Card course={courseInfo}/>
                            )}
                            <a className="" onClick={this.showMore}>
                                {this.state.expanded ? (
                                    <ShowMoreLess icon="arrow up" text="Show less courses"/>
                                ) : (
                                    <ShowMoreLess icon="arrow down" text="Show more courses"/>
                                )
                                }
                            </a>
                        </div>

                }

            </Segment>
        </Container>
    }
}

export default AttendedCourses