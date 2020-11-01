import React, { Component } from 'react';

class EmptyTable extends Component {
    render() {
        const message = this.props.message
        return (
            <div className='empty-table'>
                <p>Список {message} пуст.</p>
            </div>
        )
    }
}

export default EmptyTable;