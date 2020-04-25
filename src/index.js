import React, { Component } from 'react';
import { render } from 'react-dom';
import PubSub from './pubsub.js';
//import events from './events.js';
import './index.css';
//import ReactDOM from 'react-dom';
import CurrentNames from './CurrentNames'

class AppTry extends Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.state = {
            name: 'Whose Turn', //Name of the general portfolio? I don't know where this is used.
            width: window.innerWidth,
            visible: true
        };
    }

    componentDidMount() {
        PubSub.subscribe('clicked-button', this.toggleVisibility)
    }
    toggleVisibility() {
        this.setState({
            visible: !this.state.visible
        })
    }
    render() {
        //const { width } = this.state;
        //const isMobile = width <= 500;
        return (
            <div className="full_grid">
                <div className="row_1">
                    <div>
                        It's (name)'s turn. / Enter name to join (Second half only visible if name has been entered)
                    </div>
                </div>
                <div className="row_2">
                    <div>
                        Enter/Leave Minigame (visible only if name has been entered), Enter/Leave changes based on state.
                    </div>
                </div>
                <div className="row_3">
                    <div>
                        Your Name (text field)
                    </div>
                </div>
                <div className="row_4">
                    <div>
                        <button onClick={() => PubSub.publish('clicked-button')}>Toggle Visibility</button>
                        {this.state.visible ? <p>Enter/Leave Game (visible only if name has been entered), Enter/Leave changes based on state.</p> : <p>Nothing</p>}
                    </div>
                </div>
                <div className="row_5">
                    <div>
                        Current players
                        {<CurrentNames />}
                    </div>
                </div>
                {/*This row has projects-left image-div projects-right. So general idea is list of projects around the center image*/}
            </div>
        );
    }
}

//render(<AppTry />, document.getElementById('root'));
render(<AppTry />, document.getElementById('root'));