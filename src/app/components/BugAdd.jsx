var React = require('react');
import {Form, FormGroup, Button, FormControl, Col, Panel} from 'react-bootstrap';

const BugAdd = React.createClass({
    getInitialState: function () {
        return ({panelOpen: false});
    },
    render: function() {
        return (
            <div>
                <Button bsStyle="primary" onClick={this.changePanelState}>
                    <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                </Button>
                <Panel collapsible expanded={this.state.panelOpen}>
                    <Form horizontal name="bugAdd">
                        <FormGroup>
                            <Col sm={3}>
                                <FormControl type="text" name="owner" placeholder="Owner" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3}>
                                <FormControl type="text" name="title" placeholder="Title" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3}>
                                <FormControl type="text" name="priority" placeholder="Priority" />
                            </Col>
                        </FormGroup>
                        <Button bsStyle="primary" onClick={this.handleSubmit}>Add Bug</Button>
                    </Form>
                </Panel>
            </div>
        );
    },
    changePanelState: function(e) {
        e.preventDefault();
        this.setState({panelOpen: !this.state.panelOpen});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var form = document.forms.bugAdd;
        this.props.addBug({
            priority:form.priority.value,
            owner:form.owner.value,
            title:form.title.value,
            status:'New'
        });
    }
});

export default BugAdd;
