import React from 'react';
import PubSub from './pubsub.js';

class WhoseTurnInMinigame extends React.Component {

  constructor(props) {
    super(props);
    // WhoseTurnInMinigame.turnPassed = WhoseTurnInMinigame.turnPassed.bind(this);
    this.updateMiniTurn = this.updateMiniTurn.bind(this);
    this.state =
      {
        currPlayer: null,
        // pollingInterval: 1000,
        // polling: true
      };
  }

  componentDidMount() {
    // this.poll();
    // PubSub.subscribe('pass-minigame-turn-button', WhoseTurnInMinigame.turnPassed);
    PubSub.subscribe('player-turn-in-minigame-update', this.updateMiniTurn);
  }
  componentWillUnmount() {
    PubSub.unsubscribe('player-turn-in-minigame-update');
    // PubSub.unsubscribe('pass-minigame-turn-button');
    // this.setState({
    //   polling: false,
    // });
    // clearTimeout(this.state.polling);
  }

  static miniTurnPassed(client, inName) {
    console.log("minigame turn passed");
    client.send(JSON.stringify({
      type: 'passTurnInMinigame',
      name: inName,
    }))
  }

  updateMiniTurn(msg, inName) {
    this.setState({ currPlayer: inName });
  }
// }

  // static turnPassed(msg, data) {
    // //TODO: Fix getting a, "Uncaught (in promise) SyntaxError: Unexpected token O in JSON at position 0" response. Might be on the server side.
    // fetch('api/passturninminigame/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: data,
    //     //secondParam: 'yourOtherValue',
    //   })
    // })
    //   .then(response => {
    //     return response.json();
    //   });
  // }

  render() {
    return (
      this.state.currPlayer
    )
  }
//   poll () {
//     // you should keep track of the timeout scheduled and
//     // provide a cleanup if needed
//     this.state.polling && clearTimeout(this.state.polling);
//
//     //TODO: Fix this, as this should error out from _something_. Probably.
//     // if (!this.props.loading) {
//     //   this.setState({ polling: false });
//     //   return
//     // }
//
//     const polling = setTimeout(() => {
//         fetch('/api/getWhoseTurnInMinigame/')
//           .then(response => {
//             return response.json();
//           }).then(result => {
//           console.log("WhoseTurn In Minigame JSON:");
//           console.log(result);
//             if(this.state.currPlayer !== result) {
//               PubSub.publish('player-turn-in-minigame-update', result);
//               this.setState({
//                 currPlayer: result,
//               });
//               console.log("WhoseTurnInMinigame currPlayer (change has happened): " + this.state.currPlayer);
//             }
//         });
//
//         // as last step you should call poll() method again
//         // if you have asyncronous code you should not call it
//         // as a step of your async flow, as it has already is
//         // time period with setTimeout
//         this.poll()
//       }
//       , this.state.pollingInterval);
//
//     this.setState({
//       polling
//     })
//   }
}

export default WhoseTurnInMinigame;