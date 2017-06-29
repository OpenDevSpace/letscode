import React, {Component} from 'react'
import ListFrame from "../../Base/Frame";
import UsersOverview from "../Users/UserList";

class AdminCourseList extends Component {
    render() {
        return (
            <ListFrame>
                <UsersOverview/>
            </ListFrame>
        )
    }
}

export default AdminCourseList