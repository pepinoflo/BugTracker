var React = require('react');
var $ = require('jquery');

import BugFilter from './BugFilter.jsx';
import BugTable from './BugTable.jsx';
import BugAdd from './BugAdd.jsx';
import '../styles/styles.css';

var BugList = React.createClass({
    getInitialState: function () {
        return {bugs: []};
    },
    componentDidMount: function() {
        this.loadData({});
    },
    componentDidUpdate: function (prevProps){
        var oldQuery = prevProps.location.query;
        var newQuery = this.props.location.query;
        if (oldQuery.priority !== newQuery.priority ||
            oldQuery.status !== newQuery.status) {
                this.loadData();
        }
    },
    render: function() {
        var pageHeaderStyle = {
            color: '#18458e',
            fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
            textAlign: 'center',
            paddingTop: '20px'
        };

        var mainDivStyle = {
            width: '60%',
            height: '100%',
            margin: '0 auto',
            boxShadow: '0 7px 0px 0px white, 0 -4px 0px 0px white, 2px 0 10px -6px rgba(31, 73, 125, 0.8), -2px 0 10px -6px rgba(31, 73, 125, 0.8)',
            marginTop: '-15px',
            backgroundColor: 'white'
        };
        return (
            <div style={mainDivStyle}>
                <h1 style={pageHeaderStyle}>Bug Tracker</h1>
                <BugFilter submitHandler={this.changeFilter} location={this.props.location} loadData={this.loadData}/>
                <BugTable bugs={this.state.bugs}/>
                <BugAdd addBug={this.addBug}/>
            </div>
        );
    },
    changeFilter : function (filter) {
        this.props.router.push({search: '?' + $.param(filter)});
    },
    /**
     * Loads bugs data base applying a filter taken from the url
     */
    loadData: function () {
        var queryString = this.props.location.query;
        var filter = {};
        filter.status = queryString.status;
        filter.priority = queryString.priority;
        $.ajax('/api/bugs', {data: filter})
        .done(function (data) {
            this.setState({bugs: data});
        }.bind(this)) // bind this inside the previous callback unction body to this (the react component) instead of the current object, which is the ajax object
        .fail(function () {
            alert('error');
        });
    },
    addBug: function(bugData) {
        var newBugs = this.state.bugs.slice();
        $.ajax({
            url: '/api/bugs',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(bugData),
            success: function (newBug) {
                newBugs.push(newBug);
                this.setState({bugs: newBugs});
            }.bind(this)
        })
        .fail(function () {
            alert('error');
        });
    }
});

export default BugList;
