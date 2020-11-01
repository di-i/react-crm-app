import React, { Component } from 'react';

class EmptySearchList extends Component {
    render() {
        return (
            <div className='empty-list'>
                <p>По Вашему запросу ничего не найдено.</p>
            </div>
        )
    }
}

export default EmptySearchList;