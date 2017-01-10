var React = require('react');
import {Alert} from 'react-bootstrap';

const SuccessAlert = React.createClass({
    render: function () {
        return (
            <Alert bsStyle="success" onDismiss={this.props.hideSuccess}>
                Bug saved successfully.
            </Alert>
        );
    }
});

export default SuccessAlert;
