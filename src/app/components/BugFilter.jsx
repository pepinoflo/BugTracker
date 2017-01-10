var React = require('react');
import {Button, Panel, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const BugFilter = React.createClass({
    getInitialState: function () {
        var queryString = this.props.location.query;
        return {
            status: queryString.status,
            priority: queryString.priority,
            panelOpen: false
        };
    },
    render: function() {
        return (
            <div>
                <Button bsStyle="primary" onClick={this.changePanelState}>Filter</Button>
                <Panel collapsible expanded={this.state.panelOpen}>
                    <Form inline>
                        <FormGroup>
                            <ControlLabel>Status: </ControlLabel>
                            {'  '}
                            <FormControl componentClass="select" bsSize="small" value={this.state.status} onChange={this.handleStatusChange}>
                                <option value="">(Any)</option>
                                <option value="New">New</option>
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </FormControl>
                        </FormGroup>
                        {'     '}
                        <FormGroup>
                            <ControlLabel>Priority: </ControlLabel>
                            {'  '}
                            <FormControl componentClass="select" bsSize="small" value={this.state.priority} onChange={this.handlePriorityChange}>
                                <option value="">(Any)</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="P3">P3</option>
                            </FormControl>
                        </FormGroup>
                        {'     '}
                        <Button bsStyle="primary" onClick={this.handleSubmit}>Apply</Button>
                    </Form>
                </Panel>
            </div>
        );
    },
    changePanelState: function (e) {
        e.preventDefault();
        this.setState({panelOpen: !this.state.panelOpen});
    },
    handleStatusChange: function(e) {
        this.setState({status: e.target.value});
    },
    handlePriorityChange: function(e) {
        this.setState({priority: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var filter = {};
        if (this.state.status) {
            filter.status = this.state.status;
        }
        if (this.state.priority) {
            filter.priority = this.state.priority;
        }
        this.props.submitHandler(filter);
    }
});

export default BugFilter;
