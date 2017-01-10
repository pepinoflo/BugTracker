var React = require('react');
import {Link} from 'react-router';

const BugRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
                <td><Link to={'/bugs/' + this.props.bug._id}>Edit</Link></td>
            </tr>
        );
    }
});

export default BugRow;
