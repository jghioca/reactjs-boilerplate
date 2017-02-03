import React from 'react';
import Greeting from './Greeting';

export default class App extends React.Component {
    render() {
        return (
            <Greeting noun="World" />
        );
    }
}
