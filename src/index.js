import React, { Component } from 'react';
import { render } from 'react-dom';
import PubSub from './pubsub.js';
//import events from './events.js';
import './index.css';
//import ReactDOM from 'react-dom';
import CurrentNames from './CurrentNames';
import SetName from './SetName';
import RemoveName from './RemoveName';
import WhoseTurn from "./WhoseTurn";

class AppTry extends Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {
      name: "", //Name of the player.
      width: window.innerWidth,
      nameChosen: false,
      //inGame: false, //Adding this might be helpful for certain logic, but is currently not used
      //nameChosen: false,
    };
  }

    componentDidMount() {
        PubSub.subscribe('join-leave-button', this.toggleVisibility);
        // PubSub.subscribe( 'name-field-action', this.nameFieldAction);
    }
    toggleVisibility() {
        this.setState({
          nameChosen: !this.state.nameChosen,
        });
    }
    updateName(evt) {
      this.setState( {
        name: evt.target.value,
      });
    }
    static enterButtonClicked() {
      PubSub.publish('join-leave-button');
    }
    render() {
        //const { width } = this.state;
        //const isMobile = width <= 500;
        return (
            <div className="full_grid">
                <div className="row_1">
                    <div>
                      {this.state.nameChosen ? <div>It's {<WhoseTurn />}'s turn.</div> : null}
                    </div>
                </div>
                <div className="row_2">
                    <div>
                        Enter/Leave Minigame (visible only if name has been entered), Enter/Leave changes based on state.
                    </div>
                </div>
                <div className="row_3">
                    <div>
                      {this.state.nameChosen ? null : <textarea value={this.state.name} className="enter-name-textarea" onChange={evt => this.updateName(evt)}>Enter a Name</textarea>}
                    </div>
                </div>
                <div className="row_4">
                    <div>
                      {/*The point with the next two lines is to switch what's on the button, alert the system that the
                      button has been pushed, and also update test underneath. I have forgotten why there's double ternary
                      in the lower field (maybe because of separating out visible and inGame?), but it works as is.*/}
                        {this.state.nameChosen ? <button onClick={() => PubSub.publish('join-leave-button')}>Leave Game</button> : <button onClick={() => AppTry.enterButtonClicked()}>Enter Game</button>}
                        {!this.state.nameChosen ? <p>Click button to enter game{!this.state.nameChosen ? <RemoveName name={this.state.name}/> : {}}</p> : <p>Click button to leave game {!this.state.nameChosen ? {} : <SetName name={this.state.name}/>}</p>}
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