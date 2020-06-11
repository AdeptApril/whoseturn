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
import AdminMenu from "./AdminMenu";
import AnimatedCardClaim from "./AnimatedCardClaim";
import EndGameAnimation from "./EndGameAnimation";

const pics = {
  marquee: require('./assets/BriMegAmanMarquee.png'),
};

function checkAdmin() {
  fetch('/api/getAdminName/')
    .then(response => {
      return response.json();
    }).then(result => {
    console.log("GetAdminName JSON in checkAdmin:");
    console.log(result);
    if(result !== null)
      PubSub.publish('admin-update', result.toString());
  });
}

class ModeBriMegAman extends Component {
  constructor(props) {
    super(props);
    this.joinLeaveGame = this.joinLeaveGame.bind(this);
    this.playerTurnUpdate = this.playerTurnUpdate.bind(this);
    this.playerMinigameUpdate = this.playerMinigameUpdate.bind(this);
    this.joinLeaveMinigame = this.joinLeaveMinigame.bind(this);
    this.minigameEnded = this.minigameEnded.bind(this);
    this.adminChanged = this.adminChanged.bind(this);
    ModeBriMegAman.cardClaimed = ModeBriMegAman.cardClaimed.bind(this);
    this.state = {
      isAdmin: false,
      name: "", //Name of the player. Can't have value and default value, so the weird name is the starter name.
      nameOfPlayerWhoseTurnItIs: "",
      width: window.innerWidth,
      nameChosen: false,
      minigameActive: false,
      nameOfPlayerWhoseTurnItIsInMinigame: null,
      inMinigame: false, //Adding this might be helpful for certain logic, but is currently not used
    };
  }

  componentDidMount() {
    PubSub.subscribe('join-leave-button', this.joinLeaveGame);
    PubSub.subscribe('player-turn-update', this.playerTurnUpdate);
    PubSub.subscribe('player-turn-in-minigame-update', this.playerMinigameUpdate);
    PubSub.subscribe('join-leave-minigame-button', this.joinLeaveMinigame);
    PubSub.subscribe('minigame-ended', this.minigameEnded);
    PubSub.subscribe('admin-update', this.adminChanged);
    PubSub.subscribe('card-claimed-button', ModeBriMegAman.cardClaimed);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('join-leave-button');
    PubSub.unsubscribe('player-turn-update');
    PubSub.unsubscribe('player-turn-in-minigame-update');
    PubSub.unsubscribe('join-leave-minigame-button');
    PubSub.unsubscribe('minigame-ended');
    PubSub.unsubscribe('admin-update');
    PubSub.unsubscribe('card-claimed-button');
  }

static cardClaimed(msg, data) {
    fetch('/api/claimcard/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data,
        //secondParam: 'yourOtherValue',
      })
    })
      .then(response => {
        return response.json();
      });
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
      LeaveMinigame.remove(this.state.name);
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

  joinLeaveGame(msg, data) {
    if(data === "enter") {
      //Disallow certain names. E.g., empty names, or names that start with space
      if(this.state.name.length < 1 || this.state.name[0] === " ")
      {}
      else {
        checkAdmin();
        this.setState({
          nameChosen: true,
        });
      }
    }
    else if(data === "leave") {
      RemoveName.remove(this.state.name);
      this.setState({
        nameChosen: false,
        isAdmin: false,
      });
    }

  }

  updateName(evt) {
    this.setState({
      name: evt.target.value.trim(),
    });
  }

  render() {
    //const { width } = this.state;
    //const isMobile = width <= 500;
    return (
      <div className="full_grid">
        <div><img className="marquee" alt="Marquee for BriMegAman" src={pics.marquee}/></div>
        <div><EndGameAnimation/></div>
        <div className="row_1">
          <div>
            {this.state.nameChosen ? <div id="nameText">{this.state.name}</div> : null}
          </div>
        </div>
        <div className="row_2">
          {this.state.inMinigame ? <div id="minigameGreyOut">{null}</div> : null}
          {this.state.nameChosen ?
          <div id="whoseTurn">
            <div id="whoseTurnHeader">Current turn:</div>
            {this.state.nameChosen ? <div id="whoseTurnText">
              {/*<svg width="30vw" height="5vh" viewBox="0 0 150 15"><text x="6" y="10">*/}
                <WhoseTurn/>
              {/*</text></svg>*/}
            </div> : null}
          </div> : null}
          {/*<div id="passTurnButtonDiv">*/}
            {this.state.nameChosen && (this.state.name === this.state.nameOfPlayerWhoseTurnItIs) ?
              <button id="passTurnButton" onClick={() => PubSub.publish('pass-turn-button', this.state.name)}>
                {/*<svg height='100%' width='100%' viewBox="0 0 70 15"><text x="5" y="10">Pass turn</text></svg>*/}
                Pass turn
              </button> : null}
          {/*</div>*/}
          <div>
          {this.state.nameChosen ? <button id="LeaveButton" className="joinLeaveGameButton" onClick={() => PubSub.publish('join-leave-button', 'leave')}>
            {/*<svg width="25vw" height="5vh" viewBox="0 0 75 15"><text x="0" y="10">Leave game</text></svg>*/}
            Leave game
          </button> : null}
          </div>
          {/*<div id="cardClaimedButtonDiv">*/}
            {this.state.nameChosen ?
              <button id="cardClaimedButton" onClick={() => PubSub.publish('card-claimed-button', this.state.name)}>
                {/*<svg width="20vw" height="7vh" viewBox="0 0 75 15"><text x="0" y="0" id="cardClaimedText">Claim card</text></svg>*/}
                Claim card
              </button> : null}
          {/*</div>*/}
          <div id="animatedCardClaim">
            {<AnimatedCardClaim/>}
          </div>
        </div>
        <div className="row_3">
          {/*<div id="minigameBackgroundText">{this.state.minigameActive ? "Minigame" : null}</div>*/}
          {this.state.minigameActive ?
          <div id="whoseTurnInMinigame">
            <div id="whoseTurnMinigameHeader">Minigame:</div>
            {this.state.nameChosen && this.state.minigameActive ?
              <div id="whoseTurnInMinigameText">
                  <WhoseTurnInMinigame/>
              </div> : null}
          </div>: null}
          {/*<div>*/}
            {this.state.nameChosen && this.state.minigameActive && (this.state.name === this.state.nameOfPlayerWhoseTurnItIsInMinigame) ?
              <button id="passMinigameTurnButton" onClick={() => PubSub.publish('pass-minigame-turn-button', this.state.name)}>
                {/*<svg width="25vw" height="5vh" viewBox="0 0 75 15"><text x="5" y="10">Pass turn</text></svg>*/}
                Pass turn
              </button> : null}
          {/*</div>*/}
          {/*<div>*/}
            {/*Enter/Leave minigame button, only to be displayed if already in the game. If in game, display the correct direction for the minigame button*/}
            {this.state.nameChosen ? this.state.inMinigame ?
              <button className="joinLeaveMinigameButton" onClick={() => PubSub.publish('join-leave-minigame-button', "leave")}>
                {/*<svg width="25vw" height="5vh" viewBox="0 0 100 15"><text x="0" y="10">Leave minigame</text></svg>*/}
                Leave minigame
              </button> :
              <button className="joinLeaveMinigameButton" onClick={() => PubSub.publish('join-leave-minigame-button', "enter")}>
                {/*<svg width="25vw" height="5vh" viewBox="0 0 95 15"><text x="0" y="10">Enter minigame</text></svg>*/}
                Enter minigame
              </button> : null}
            {/*Enter/Leave Minigame (visible only if name has been entered), Enter/Leave changes based on state.*/}
          {/*</div>*/}
        </div>
        <div className="row_4">
          <div>
            {this.state.nameChosen ? null :
              <textarea autoFocus placeholder="Enter a Name" className="enter-name-textarea" onKeyUp={(evt) => evt.keyCode === 13 ? document.getElementById("joinLeaveGameButton").click() : null }
                        onChange={evt => this.updateName(evt)}>{this.state.name}</textarea>}
          </div>
        </div>
        <div className="row_5">
            {/*The point with the next two lines is to switch what's on the button, alert the system that the
                      button has been pushed, and also update test underneath. I have forgotten why there's double ternary
                      in the lower field (maybe because of separating out visible and inGame?), but it works as is.*/}
            {this.state.nameChosen ? null :
              <button id="joinLeaveGameButton" className="joinLeaveGameButton" onClick={() => PubSub.publish('join-leave-button', 'enter')}>Enter Game</button>}
            {!this.state.nameChosen ?
              null :
              <div>{!this.state.nameChosen ? {} : <SetName name={this.state.name}/>}</div>}
        </div>
        <div className="row_6">
            {/*Current players*/}
            {<CurrentNames/>}
          <div>
            {/*{this.state.minigameActive ? <div>Current players in Minigame</div> : null}*/}
            {/*{<CurrentNamesInMinigame/>}*/}
          </div>
        </div>
        <div className="row_7">
          {this.state.isAdmin ? <AdminMenu name={this.state.name}/> : null}
        </div>
      </div>
    );
  }
}

//render(<AppTry />, document.getElementById('root'));
// render(<ModeBriMegAman/>, document.getElementById('root'));


export default ModeBriMegAman;