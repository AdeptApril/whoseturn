import React, {Component} from 'react';
// import {render} from 'react-dom';
import PubSub from './pubsub.js';
//import events from './events.js';
import './index.css';
//import ReactDOM from 'react-dom';
import CurrentNames from './CurrentNames';
import SetName from './SetName';
import RemoveName from './RemoveName';
import WhoseTurn from "./WhoseTurn";
// import CurrentNamesInMinigame from './CurrentNamesInMinigame';
import WhoseTurnInMinigame from "./WhoseTurnInMinigame";
import EnterMinigame from "./EnterMinigame";
import LeaveMinigame from "./LeaveMinigame";

class ModeWhoseTurn extends Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.playerTurnUpdate = this.playerTurnUpdate.bind(this);
    this.playerMinigameUpdate = this.playerMinigameUpdate.bind(this);
    this.joinLeaveMinigame = this.joinLeaveMinigame.bind(this);
    this.minigameEnded = this.minigameEnded.bind(this);
    this.adminChanged = this.adminChanged.bind(this);
    this.state = {
      isAdmin: false,
      name: "", //Name of the player.
      nameOfPlayerWhoseTurnItIs: "",
      width: window.innerWidth,
      nameChosen: false,
      minigameActive: false,
      nameOfPlayerWhoseTurnItIsInMinigame: null,
      inMinigame: false, //Adding this might be helpful for certain logic, but is currently not used
    };
  }

  componentDidMount() {
    PubSub.subscribe('join-leave-button', this.toggleVisibility);
    PubSub.subscribe('player-turn-update', this.playerTurnUpdate);
    PubSub.subscribe('player-turn-in-minigame-update', this.playerMinigameUpdate);
    PubSub.subscribe('join-leave-minigame-button', this.joinLeaveMinigame);
    PubSub.subscribe('minigame-ended', this.minigameEnded);
    PubSub.subscribe('admin-update', this.adminChanged);
  }

  //Admin has changed, so check to see if current player is an admin.
  adminChanged(msg, data) {
    if (this.state.name === data) {
      this.setState({
        isAdmin: true,
      });
    }
  }

  minigameEnded() {
    this.setState({
      inMinigame: false,
      minigameActive: false,
    });
  }

  joinLeaveMinigame(msg, data) {
    if (data === "enter") {
      new EnterMinigame(this.state.name);
      this.setState({
        inMinigame: true,
        minigameActive: true,
      });
    } else if (data === "leave") {
      new LeaveMinigame(this.state.name);
      this.setState({
        inMinigame: false,
      });
    }
  }

  playerMinigameUpdate(msg, data) {
    console.log(msg, data);
    if (data !== undefined && data != null) {
      this.setState({
        nameOfPlayerWhoseTurnItIsInMinigame: data,
        minigameActive: true,
      });
    } else {
      this.setState({
        nameOfPlayerWhoseTurnItIsInMinigame: null,
        minigameActive: false,
      });
    }
  }

  playerTurnUpdate(msg, data) {
    console.log(msg, data);
    if (data !== undefined) {
      this.setState({
        nameOfPlayerWhoseTurnItIs: data,
      });
    }
  }

  toggleVisibility() {
    this.setState({
      nameChosen: !this.state.nameChosen,
    });
    if (this.state.nameChosen === false && this.state.isAdmin === true) {
      this.setState({
        isAdmin: false,
      });
    }
  }

  updateName(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  render() {
    //const { width } = this.state;
    //const isMobile = width <= 500;
    return (
      <div className="full_grid">
        <div className="row_1_and_2">
          <div className="row_1">
            <div>
              {this.state.nameChosen ? <div>{this.state.name}</div> : null}
            </div>
            <div>
              {this.state.nameChosen ? <div>It's {<WhoseTurn/>}'s turn.</div> : null}
              {this.state.nameChosen && (this.state.name === this.state.nameOfPlayerWhoseTurnItIs) ?
                <button onClick={() => PubSub.publish('pass-turn-button', this.state.name)}>Pass turn</button> : null}
            </div>
          </div>
          <div className="row_2">
            <div>
              {this.state.nameChosen && this.state.minigameActive ?
                <div>It's {<WhoseTurnInMinigame/>}'s turn in the minigame.</div> : null}
              {this.state.nameChosen && this.state.minigameActive && (this.state.name === this.state.nameOfPlayerWhoseTurnItIsInMinigame) ?
                <button onClick={() => PubSub.publish('pass-minigame-turn-button', this.state.name)}>Pass turn in
                  Minigame</button> : null}
              {/*Enter/Leave minigame button, only to be displayed if already in the game. If in game, display the correct direction for the minigame button*/}
              {this.state.nameChosen ? this.state.inMinigame ?
                <button onClick={() => PubSub.publish('join-leave-minigame-button', "leave")}>Leave minigame</button> :
                <button onClick={() => PubSub.publish('join-leave-minigame-button', "enter")}>Enter
                  minigame</button> : null}
              {/*Enter/Leave Minigame (visible only if name has been entered), Enter/Leave changes based on state.*/}
            </div>
          </div>
        </div>
        <div className="row_3">
          <div>
            {this.state.nameChosen ? null :
              <textarea value={this.state.name} className="enter-name-textarea"
                        onChange={evt => this.updateName(evt)}>Enter a Name</textarea>}
          </div>
        </div>
        <div className="row_4">
          <div>
            {/*The point with the next two lines is to switch what's on the button, alert the system that the
                      button has been pushed, and also update test underneath. I have forgotten why there's double ternary
                      in the lower field (maybe because of separating out visible and inGame?), but it works as is.*/}
            {this.state.nameChosen ? <button onClick={() => PubSub.publish('join-leave-button')}>Leave Game</button> :
              <button onClick={() => PubSub.publish('join-leave-button')}>Enter Game</button>}
            {!this.state.nameChosen ?
              <div>Click button to enter game{!this.state.nameChosen ?
                <RemoveName name={this.state.name}/> : {}}</div> :
              <div>Click button to leave game {!this.state.nameChosen ? {} : <SetName name={this.state.name}/>}</div>}
          </div>
        </div>
        <div className="row_5">
          <div>
            {/*Current players*/}
            {<CurrentNames/>}
          </div>
          <div>
            {/*{this.state.minigameActive ? <div>Current players in Minigame</div> : null}*/}
            {/*{<CurrentNamesInMinigame/>}*/}
          </div>
        </div>
        <div className="row_6">
          <div>
            <p></p>
            {this.state.isAdmin ? <tr>Admin Menu</tr> : null}
            <p>{this.state.isAdmin ?
              <button onClick={() => PubSub.publish('pass-turn-button', this.state.name)}>Pass turn in main
                game</button> : null}</p>
            <p>{this.state.isAdmin && this.state.minigameActive ?
              <button onClick={() => PubSub.publish('pass-minigame-turn-button', this.state.name)}>Pass turn in
                Minigame</button> : null}</p>
          </div>
        </div>
      </div>
    );
  }
}

//render(<AppTry />, document.getElementById('root'));
// render(<ModeWhoseTurn/>, document.getElementById('root'));

export default ModeWhoseTurn;