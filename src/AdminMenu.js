import React from 'react';
import PubSub from './pubsub.js';

/* Displays current playersInMinigame in the game and minigame */
class AdminMenu extends React.Component {

  constructor(props) {
    super(props);
    AdminMenu.endMinigame = AdminMenu.endMinigame.bind(this);
    this.state =
      {
        name: this.props.name,
        playersInGame: [], //People in game
        playersInMinigame: [], //People in minigame
        // pollingInterval: 3000,
        // polling: true
      };
    // this.headers = [
    //   { key: 'name', label: 'Name' }
    // ];
  }

  componentDidMount() {
    PubSub.subscribe('end-minigame-button', AdminMenu.endMinigame);
    console.log("Admin name is: " + this.state.name);
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

  render() {
    return (
      <table><tbody>
      <tr><td>Admin Menu</td></tr>
      <tr><td><button onClick={() => PubSub.publish('pass-turn-button', this.state.name)}>Pass turn in main game</button></td></tr>
      <tr><td><button onClick={() => PubSub.publish('pass-minigame-turn-button', this.state.name)}>Pass turn in Minigame</button></td></tr>
      <tr><td><button onClick={() => PubSub.publish('end-minigame-button', this.state.name)}>End Minigame</button></td></tr>
      </tbody></table>
    )
  }
}

export default AdminMenu;