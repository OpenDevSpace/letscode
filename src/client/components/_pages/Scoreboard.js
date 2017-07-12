import React, {Component} from 'react'
import ScoreboardFrame from '../Base/Frame'
import ScoreboardList from '../Scoreboard/ScoreboardList'

class Scoreboard extends Component {
    render() {
        return (
            <ScoreboardFrame>
                <ScoreboardList />
            </ScoreboardFrame>
        )
    }
}

export default Scoreboard