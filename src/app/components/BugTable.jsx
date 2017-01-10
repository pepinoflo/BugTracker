var React = require('react');
import {Panel, Table} from 'react-bootstrap';

import BugRow from './BugRow.jsx';

const BugTable = React.createClass({
    render: function() {
        var bugRows = this.props.bugs.map(function(bug) {
            return <BugRow key={bug._id} bug={bug} />;
        });
        return (
            <Panel>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Owner</th>
                            <th>Title</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugRows}
                    </tbody>
                </Table>
            </Panel>
        );
    }
});

export default BugTable;
