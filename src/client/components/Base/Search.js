import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import _ from 'lodash'
import $ from 'jquery'
import {Redirect} from 'react-router-dom'

class SearchComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isLoading: false,
            results: [],
            source: [],
            redirect: false,
            resultID: ''
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
    }

    componentDidMount() {

        $.get('http://localhost:8080/api/course/listall')
            .done((data) => {
            this.setState({
                source: data.data
            });
            console.log(this.state.source);
            });
    }

    handleResultSelect(evt, selResult) {
        this.setState({
            resultID: selResult._id,
            redirect: true
        });
        console.log("Result selected: " + selResult.title);
    }

    handleSearchChange(evt, value) {
        this.setState({
            isLoading: true,
            value
        });

        setTimeout(() => {
            //if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            console.log(re);
            const isMatch = (result) => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(this.state.source, isMatch),
            })
        }, 500);
    }

    render() {

        if (this.state.redirect) {

            if (window.location.href.search('course') !== -1 && window.location.href.search('courselist') === -1) {
                window.location.replace('/course/'+this.state.resultID);
            } else {
                return <Redirect push to={'/course/'+this.state.resultID} />
            }
        }

        return (
            <div className="headerSearch">
                <Search aligned='right' loading={this.state.isLoading} size={'mini'} icon={{name: 'search', circular: true, link: true}} value={this.state.value} onSearchChange={this.handleSearchChange} results={this.state.results} onResultSelect={this.handleResultSelect} />
            </div>
        )
    }
}

export default SearchComponent