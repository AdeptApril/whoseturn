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
import LeaveMinigame from "./LeaveMinigame";
import AdminMenu from "./AdminMenu";
import AnimatedCardClaim from "./AnimatedCardClaim";
import EndGameAnimation from "./EndGameAnimation";
import CardPopup from "./CardPopup";
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// const client = new W3CWebSocket('ws://127.0.0.1:3001');
// TODO: Find a way to make it so that this doesn't have to be changed for deployment
const client = new W3CWebSocket('ws://brimegaman.monoceroses.com:80');

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
    this.toggleCard = this.toggleCard.bind(this);
    this.levelUpdate = this.levelUpdate.bind(this);
    this.cardTimerUpdate = this.cardTimerUpdate.bind(this);
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
      showCard: false,
      level: 1,
      cardTime: 10, //Default, in seconds, for how long the card is displayed
  };
  }

  componentDidMount() {
    this.connect();
  }

  timerID = 0;
  timeout = 250;
  keepAliveTimeout = 20000; //20000 is 20 seconds

  connect = () => {
    let that = this; //Keep an older version of "this".
    let connectInterval;

    client.onopen = () => {
      console.log("WebSocket client connected");
      clearTimeout(connectInterval);
      this.timerID = setInterval( ModeBriMegAman.keepAlive, this.keepAliveTimeout);
    };
    client.onclose = e => {
        console.log(
          `Socket is closed. Reconnect will be attempted in ${Math.min(
            10000 / 1000,
            (that.timeout + that.timeout) / 1000
          )} second.`,
          e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("Received from server: ", dataFromServer);
      switch (dataFromServer.type) {
        case 'minigamePlayers':
          PubSub.publish('minigame-players-update', dataFromServer.players);
          if(dataFromServer.players === null)
            PubSub.publish('minigame-ended');
          break;
        case 'whoseTurnInMinigame':
          PubSub.publish('player-turn-in-minigame-update', dataFromServer.playerName);
          break;
        default:
          console.log('WebSocket received: %s', dataFromServer);
          break;
      }
    };
    PubSub.subscribe('join-leave-button', this.joinLeaveGame);
    PubSub.subscribe('player-turn-update', this.playerTurnUpdate);
    PubSub.subscribe('player-turn-in-minigame-update', this.playerMinigameUpdate);
    PubSub.subscribe('join-leave-minigame-button', this.joinLeaveMinigame);
    PubSub.subscribe('minigame-ended', this.minigameEnded);
    PubSub.subscribe('admin-update', this.adminChanged);
    PubSub.subscribe('card-claimed-button', ModeBriMegAman.cardClaimed);
    PubSub.subscribe('player-level-update', this.levelUpdate);
    PubSub.subscribe('set-card-timer', this.cardTimerUpdate);
  };

  componentWillUnmount() {
    PubSub.unsubscribe('join-leave-button');
    PubSub.unsubscribe('player-turn-update');
    PubSub.unsubscribe('player-turn-in-minigame-update');
    PubSub.unsubscribe('join-leave-minigame-button');
    PubSub.unsubscribe('minigame-ended');
    PubSub.unsubscribe('admin-update');
    PubSub.unsubscribe('card-claimed-button');
    PubSub.unsubscribe('player-level-update', this.levelUpdate);
    PubSub.unsubscribe('set-card-timer');
    this.cancelKeepAlive();
  }

  levelUpdate(msg, levelIn) {
    this.setState({
      level: levelIn,
    });
    // console.log("Level updated to: %s", levelIn);
  }

  toggleCard() {
    console.log("Toggling Card display");
    this.setState({
      showCard: !this.state.showCard
    });
  }

  check = () => {
    const { ws } = client;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  cancelKeepAlive() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  static keepAlive() {
    // let timeout = 2000;
    console.log("Sending Keep-alive");
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({
        type: "keepAlive",
      }))
    }
    // this.timerID = setTimeout(this.keepAlive, timeout);
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
      // new EnterMinigame(this.state.name);
      LeaveMinigame.add(client, this.state.name);
      this.setState({
        inMinigame: true,
        minigameActive: true,
      });
    } else if (data === "leave") {
      LeaveMinigame.remove(client, this.state.name);
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

  cardTimerUpdate(msg, data) {
    this.setState({
      cardTime: data,
    });
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
          <div>
            {this.state.nameChosen ?
              <div><button id="DrawCardButton" onClick={this.toggleCard.bind(this)}>Draw Card</button>
              {this.state.showCard ?
                  <CardPopup
                    text='Click "Close Button" to hide popup'
                    level={this.state.level}
                    cardTime={this.state.cardTime}
                    closePopup={this.toggleCard.bind(this)}
                  />
                  : null
              }</div>
            : null}
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
              <button id="passMinigameTurnButton" onClick={() => WhoseTurnInMinigame.miniTurnPassed(client, this.state.name)}>
                {/*<button id="passMinigameTurnButton" onClick={() => PubSub.publish('pass-minigame-turn-button', this.state.name)}>*/}
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
              <div>{!this.state.nameChosen ? {} : SetName.inputName(this.state.name)}</div>}
        </div>
        <div className="row_6">
            {/*Current players*/}
            {!this.state.nameChosen ?
              null :
              <CurrentNames playerName={this.state.name}/>}
          <div>
            {/*{this.state.minigameActive ? <div>Current players in Minigame</div> : null}*/}
            {/*{<CurrentNamesInMinigame/>}*/}
          </div>
        </div>
        <div className="row_7">
          {this.state.isAdmin ? <AdminMenu client = {client} name={this.state.name}/> : null}
        </div>
      </div>
    );
  }
}

//render(<AppTry />, document.getElementById('root'));
// render(<ModeBriMegAman/>, document.getElementById('root'));


export default ModeBriMegAman;