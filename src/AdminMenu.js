import React from 'react';
import PubSub from './pubsub.js';
import RemoveName from "./RemoveName";
import LeaveMinigame from "./LeaveMinigame";
import WhoseTurnInMinigame from "./WhoseTurnInMinigame";
import CardPopup from "./CardPopup";
import SetName from "./SetName";

/* Displays current playersInMinigame in the game and minigame */
class AdminMenu extends React.Component {

  constructor(props) {
    super(props);
    this.endMinigame = this.endMinigame.bind(this);
    this.playerUpdate = this.playerUpdate.bind(this);
    this.handleSelectedPlayerChanged = this.handleSelectedPlayerChanged.bind(this);
    this.openCard = this.openCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state =
      {
        name: this.props.name,
        client: this.props.client,
        playersInGame: [], //People in game
        playersInMinigame: [], //People in minigame
        selectedPlayer: this.props.name, //<- was what was there originally, but the idea is to require a selected name before popping anything up, so TODO: Make selected player be nothing, and graphics change as needed.
        modifyPlayer: false,
        cardNumber: 0, //This probably isn't needed, and could be removed somehow, since it's just keeping track of what number is selected in a list.
        cardTimer: props.cardTime,
        addingPlayer: null,
        showCard: false,
        level: 1,
        // pollingInterval: 3000,
        // polling: true
      };
    // this.headers = [
    //   { key: 'name', label: 'Name' }
    // ];
  }

  componentDidMount() {
    PubSub.subscribe('end-minigame-button', this.endMinigame);
    PubSub.subscribe('player-list-update', this.playerUpdate);
    console.log("Admin name is: " + this.state.name);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('end-minigame-button');
    PubSub.unsubscribe('player-list-update');
  }

  playerUpdate(msg, data) {
    // console.log("It made it here, and gave the data: ");
    // console.log(data);
    this.setState({
      playersInGame: data,
    });
  }

  updateCardTimer(evt) {
    this.setState({
      cardTimer: evt.target.value.trim(),
    });
  }

  openCard(level) {
    console.log("Toggling Card display");
    this.setState({
      showCard: true,
      level: level,
    });
  }

  closeCard() {
    console.log("Toggling Card display");
    this.setState({
      showCard: false,
    });
  }

  //Admin has changed, so check to see if current player is an admin.
  endMinigame(msg, adminName) {
    console.log("Ending Minigame through Admin Menu");
    this.state.client.send(JSON.stringify({
      type: 'endMinigame',
      name: adminName,
    }));
    PubSub.publish('minigame-ended');
  }

  static setCardNumber(inName, inCardNumber) {
    console.log("Setting " + inName + "'s card number to: " + inCardNumber);
    fetch('/api/setcardnumber/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inName,
        cardNumber: inCardNumber,
      })
    })
      .then(response => {
        return response.json();
      });
  }

  updateName(evt) {
    this.setState({
      addingPlayer: evt.target.value.trim(),
    });
  }

  handleSelectedPlayerChanged(event)
  {
    this.setState({ selectedPlayer: event.target.value });
  }

  handleCardNumberChanged(event)
  {
    AdminMenu.setCardNumber(this.state.selectedPlayer, event.target.value);
    this.setState({ cardNumber: event.target.value });
  }

  render() {
    let playersInList = this.state.playersInGame.map( player =>
      <option key={player}>{player}</option>
    );
    return (
      <table><tbody>
      <tr><td>Admin Menu</td></tr>
      <tr><td><button onClick={() => PubSub.publish('pass-turn-button', this.state.name)}>Pass turn in main game</button></td></tr>
      {this.state.showCard ?
        <CardPopup
          text='Click "Close Button" to hide popup'
          level={this.state.level}
          cardTime={this.state.cardTimer}
          closePopup={this.closeCard.bind(this)}
        /> : null}
      <tr><td className="admin-draw-card-button-cell">Draw card for level:</td>
        <td><button className="admin-draw-card-button" onClick={() => this.openCard(1)}>1</button></td>
        <td><button className="admin-draw-card-button" onClick={() => this.openCard(2)}>2</button></td>
        <td><button className="admin-draw-card-button" onClick={() => this.openCard(3)}>3</button></td>
      </tr>
      <tr><td><button onClick={() => WhoseTurnInMinigame.miniTurnPassed(this.state.client, this.state.name)}>Pass turn in Minigame</button></td></tr>
      {/*<tr><td><button onClick={() => PubSub.publish('pass-minigame-turn-button', this.state.name)}>Pass turn in Minigame</button></td></tr>*/}
      <tr><td><button onClick={() => PubSub.publish('end-minigame-button', this.state.name)}>End Minigame</button></td></tr>
      <tr><td><textarea autoFocus placeholder="Set card wait time" className="enter-card-wait-textarea" onKeyUp={(evt) => evt.keyCode === 13 ? document.getElementById("setCardTimerButton").click() : null }
                onChange={evt => this.updateCardTimer(evt)}>{this.state.cardTimer}</textarea></td><td colSpan="3"><button id="setCardTimerButton" onClick={() => PubSub.publish('set-card-timer', this.state.cardTimer)}>Set timer</button></td></tr>
      </tbody>
        {!this.state.modifyPlayer ? <tr><td colSpan="4">
          <button id="playerAdjustmentMenu" onClick={() => this.setState({
            modifyPlayer: true,
          })}>
            Open player adjustment menu</button></td></tr>
          :
          <tbody>
          <tr><button id="playerAdjustmentMenu" onClick={() => this.setState({
          modifyPlayer: false,
        })}>
          Close player adjustment menu</button></tr>
          {/*//Move the rest of this out to the AdminSubMenu class. Or find some way for it to pop up only after a player is selected*/}
          <tr><td><textarea autoFocus placeholder="New Player Name" className="admin-add-player-textarea" onKeyUp={(evt) => evt.keyCode === 13 ? document.getElementById("adminAddPlayerButton").click() : null }
                        onChange={evt => this.updateName(evt)}>{this.state.addingPlayer}</textarea></td><td colSpan="3"><button id="adminAddPlayerButton" onClick={() => SetName.inputName(this.state.addingPlayer)}>add player</button></td></tr>
        <tr>
          <td><div><select value={this.state.selectedPlayer} onChange={(event) => this.handleSelectedPlayerChanged(event)}>{playersInList}</select></div></td>
        </tr>
        <tr>
          <td>
            <button onClick={() => RemoveName.remove(this.state.selectedPlayer)}>Kick from game</button>
          </td>
        </tr>
        <tr>
        <td> < button onClick={() => LeaveMinigame.remove(this.state.selectedPlayer)}>Kick from Minigame</button></td>
        </tr>
        <tr>
        {/*<td><button onClick={() => AdminMenu.setCardNumber(this.state.selectedPlayer, this.state.cardNumber)}>Set player card quantity to:</button></td>*/}
        <td>Set player card quantity to:</td>
        <td><div><select value={this.cardNumber} onChange={(event) => this.handleCardNumberChanged(event)}>
        <option defaultValue="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        </select></div></td>
        </tr>
      </tbody>}
      </table>
    )
  }
}

export default AdminMenu;