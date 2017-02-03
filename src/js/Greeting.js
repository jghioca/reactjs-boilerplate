import React from 'react';

export default class Greeting extends React.Component {
    render() {
        return (
            <p>
                Hello {this.props.noun}!
                <img src={require('../img/smiley.png')} />
            </p>
        );
    }
}
