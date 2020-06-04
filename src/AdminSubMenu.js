// import React from 'react';
// import PubSub from './pubsub.js';
// import RemoveName from "./RemoveName";
// import LeaveMinigame from "./LeaveMinigame";
//
// /* Displays current playersInMinigame in the game and minigame */
// class AdminSubMenu extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.playerUpdate = this.playerUpdate.bind(this);
//     this.handleSelectedPlayerChanged = this.handleSelectedPlayerChanged.bind(this);
//     this.state =
//       {
//         name: this.props.name,
//         playersInGame: [], //People in game
//         playersInMinigame: [], //People in minigame
//         selectedPlayer: null, //this.props.name, <- was what was there originally, but the idea is to require a selected name before popping anything up.
//         cardNumber: 0, //This probably isn't needed, and could be removed somehow, since it's just keeping track of what number is selected in a list.
//         // pollingInterval: 3000,
//         // polling: true
//       };
//     // this.headers = [
//     //   { key: 'name', label: 'Name' }
//     // ];
//   }
//
//   componentDidMount() {
//     PubSub.subscribe('end-minigame-button', AdminMenu.endMinigame);
//     PubSub.subscribe('player-list-update', this.playerUpdate);
//     console.log("Admin name is: " + this.state.name);
//   }
//
//   componentWillUnmount() {
//     PubSub.unsubscribe('end-minigame-button');
//     PubSub.unsubscribe('player-list-update');
//   }
//
//         <td><button onClick={() => RemoveName.remove(this.state.selectedPlayer)}>Kick from game</button></td>
//         <td><button onClick={() => LeaveMinigame.remove(this.state.selectedPlayer)}>Kick from Minigame</button></td>
//         <td><button onClick={() => AdminMenu.setCardNumber(this.state.selectedPlayer, this.state.cardNumber)}>Set player card quantity to:</button></td>
//         <td><div><select value={this.cardNumber} onChange={(event) => this.handleCardNumberChanged(event)}>
//           <option defaultValue="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//           <option value="9">9</option>
//         </select></div></td>
//       </tr>
//       </tbody></table>
//     )
//   }
// }
//
// export default AdminSubMenu;