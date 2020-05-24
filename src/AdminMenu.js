import React from 'react';
import PubSub from './pubsub.js';
import RemoveName from "./RemoveName";
import LeaveMinigame from "./LeaveMinigame";

/* Displays current playersInMinigame in the game and minigame */
class AdminMenu extends React.Component {

  constructor(props) {
    super(props);
    AdminMenu.endMinigame = AdminMenu.endMinigame.bind(this);
    this.playerUpdate = this.playerUpdate.bind(this);
    this.handleSelectedPlayerChanged = this.handleSelectedPlayerChanged.bind(this);
    this.state =
      {
        name: this.props.name,
        playersInGame: [], //People in game
        playersInMinigame: [], //People in minigame
        selectedPlayer: this.props.name,
        cardNumber: 0, //This probably isn't needed, and could be removed somehow, since it's just keeping track of what number is selected in a list.
        // pollingInterval: 3000,
        // polling: true
      };
    // this.headers = [
    //   { key: 'name', label: 'Name' }
    // ];
  }

  componentDidMount() {
    PubSub.subscribe('end-minigame-button', AdminMenu.endMinigame);
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

  //Admin has changed, so check to see if current player is an admin.
  static endMinigame(msg, data) {
    fetch('/api/endminigame/', {
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

  handleSelectedPlayerChanged(event)
  {
    this.setState({ selectedPlayer: event.target.value });
  }

  handleCardNumberChanged(event)
  {
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
      <tr><td><button onClick={() => PubSub.publish('pass-minigame-turn-button', this.state.name)}>Pass turn in Minigame</button></td></tr>
      <tr><td><button onClick={() => PubSub.publish('end-minigame-button', this.state.name)}>End Minigame</button></td></tr>
      <tr>
        <td><div><select value={this.state.selectedPlayer} onChange={(event) => this.handleSelectedPlayerChanged(event)}>{playersInList}</select></div></td>
        <td><button onClick={() => RemoveName.remove(this.state.selectedPlayer)}>Kick from game</button></td>
        <td><button onClick={() => LeaveMinigame.remove(this.state.selectedPlayer)}>Kick from Minigame</button></td>
        <td><button onClick={() => AdminMenu.setCardNumber(this.state.selectedPlayer, this.state.cardNumber)}>Set player card quantity to:</button></td>
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
      </tbody></table>
    )
  }
}

export default AdminMenu;