var React = require('react');
var $ = require('jquery');
import {Link} from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Col, Panel, ButtonToolbar, Button} from 'react-bootstrap';
import SuccessAlert from './SuccessAlert.jsx';

const BugEdit = React.createClass({
    getInitialState: function() {
        return ({
            status: '',
            priority: '',
            owner: '',
            title: '',
            successVisible: false
        });
    },
    componentDidMount: function () {
        this.loadBugData();
    },
    componentDidUpdate: function (prevProps) {
        if (prevProps.params.id !== this.props.params.id) {
            this.loadBugData();
        }
    },
    render: function() {
        var mainDivStyle = {
            width: '60%',
            margin: '0 auto',
            marginTop: '20px',
            boxShadow: '2px 2px 10px -6px rgba(31, 73, 125, 0.8)',
            backgroundColor: 'white',
            backgroundClip: 'content-box',
            boxSizing: 'content-box'
        };

        return (
            <div style={mainDivStyle}>
                <Panel header={<h3>Edit Bug</h3>}>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={1}>
                                Status
                            </Col>
                            <Col sm={3}>
                                <FormControl componentClass="select" value={this.state.status} onChange={this.handleStatusChange}>
                                    <option value="New">New</option>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={1}>
                                Priority
                            </Col>
                            <Col sm={3}>
                                <FormControl componentClass="select" value={this.state.priority} onChange={this.handlePriorityChange}>
                                    <option value="P1">P1</option>
                                    <option value="P2">P2</option>
                                    <option value="P3">P3</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={1}>
                                Owner
                            </Col>
                            <Col sm={3}>
                                <FormControl type="text" value={this.state.owner} onChange={this.handleOwnerChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={1}>
                                Title
                            </Col>
                            <Col sm={3}>
                                <FormControl type="text" value={this.state.title} onChange={this.handleTitleChange} />
                            </Col>
                        </FormGroup>
                        <ButtonToolbar>
                            <Button bsStyle="primary" type="submit">Modify</Button>
                            <Link className="btn btn-link" to="/bugs">Back to bugs list</Link>
                        </ButtonToolbar>
                    </Form>
                </Panel>
                {this.state.successVisible ? <SuccessAlert hideSuccess={this.hideSuccess} /> : null}
            </div>
        );
    },
    handleStatusChange: function(e) {
        this.setState({status: e.target.value});
    },
    handlePriorityChange: function(e) {
        this.setState({priority: e.target.value});
    },
    handleOwnerChange: function(e) {
        this.setState({owner: e.target.value});
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var bugData = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title
        };
        $.ajax({
            url: '/api/bugs/' + this.props.params.id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(bugData),
            success: function (newBug) {
                this.setState(newBug);
                this.showSuccess();
            }.bind(this)
        })
        .fail(function () {
            alert('error');
        });
    },
    loadBugData: function () {
        $.ajax('/api/bugs/' + this.props.params.id)
        .done(function (bug) {
            this.setState(bug);
        }.bind(this)) // bind this inside the previous callback unction body to this (the react component) instead of the current object, which is the ajax object
        .fail(function () {
            alert('error');
        });
    },
    hideSuccess: function () {
        this.setState({successVisible: false});
    },
    showSuccess: function () {
        this.setState({successVisible: true});
    }
});

export default BugEdit;
