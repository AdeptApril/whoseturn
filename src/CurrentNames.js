import React from 'react';
import PubSub from './pubsub.js';

const pics = {
  mind: require('./assets/Mind.png'),
  body: require('./assets/Body.png'),
  soul: require('./assets/Soul.png'),
};

/* Displays current players in the game and minigame */
class CurrentNames extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        admin: null,
        playersInGame: [],
        numberOfCards: [],
        playersInMinigame: [],
        pollingInterval: 3000,
        polling: true
      };
    // this.headers = [
    //   { key: 'name', label: 'Name' }
    // ];
  }

  componentDidMount() {
    this.poll();
  }
  render() {
    return (
      <div>
        <table id="playersInGame">
          <thead>
          {this.state.playersInGame.length > 0 ? <tr><td>Players in game:</td></tr> : <tr><td/></tr>}
          </thead>
          <tbody>
          {this.state.playersInGame.map(user => <tr key={user}><td>{user}</td></tr>)}
          </tbody>
        </table>
        <table id="numberOfCards">
          <thead>
          {this.state.playersInGame.length > 0 ? <tr><td>Number of Cards:</td></tr> : <tr><td/></tr>}
          </thead>
          <tbody>
          {this.state.numberOfCards.map(cards => <tr key={cards}><td>{CurrentNames.stage(cards)}</td><td>{cards}</td></tr>)}
          </tbody>
        </table>
          <table id="playersInMinigame">
          <thead>
          {this.state.playersInMinigame.length > 0 ? <tr><td>Players in Minigame:</td></tr> : <tr/>}
          </thead>
          <tbody>
          {this.state.playersInMinigame.map(player => <tr key={player}><td>{player}</td></tr>)}
          </tbody>
          </table>
      </div>
    )
  }
  poll () {
    // you should keep track of the timeout scheduled and
    // provide a cleanup if needed
    this.state.polling && clearTimeout(this.state.polling);

    //TODO: Fix this, as this should error out from _something_. Probably.
    // if (!this.props.loading) {
    //   this.setState({ polling: false });
    //   return
    // }

    const polling = setTimeout(() => {
        fetch('/api/getCurrPlayers/')
          .then(response => {
            return response.json();
          }).then(result => {
          // console.log("Current Player JSON:");
          // console.log(result);
          //console.log(this.headers);
          this.setState({
            playersInGame: result.name,
            numberOfCards: result.cards,
          });
          if(this.state.playersInGame.length > 0 && this.state.playersInGame[0] !== this.state.admin) //Check to see who the admin is if it doesn't make sense given array of playersInGame
          {
            fetch('/api/getAdminName/')
              .then(response => {
                return response.json();
              }).then(result => {
              console.log("GetAdminName JSON:");
              console.log(result);
              if(this.state.currPlayer !== result.toString()) {
                PubSub.publish('admin-update', result.toString());
                this.setState({
                  admin: result.toString(),
                });
                console.log("Admin has changed: " + this.state.admin);
              }
            });
          }
          console.log("Current Player state.playersInGame: " + this.state.playersInGame);
        });

        //Minigame playersInMinigame fetch
        fetch('/api/getCurrPlayersInMinigame/')
          .then(response => {
            return response.json();
          }).then(result => {
          // console.log("Current Minigame Player JSON:");
          // console.log(result);
          //console.log(this.headers);
          this.setState({
            playersInMinigame: result.name
          });
          console.log("Current Minigame Player state.playersInMinigame: " + this.state.playersInMinigame);
        })
          .then( () => {
        if(this.state.playersInMinigame.length <= 0)
          PubSub.publish("minigame-ended");
          // PubSub.publish("player-turn-in-minigame-update");
        });

        // as last step you should call poll() method again
        // if you have asyncronous code you should not call it
        // as a step of your async flow, as it has already is
        // time period with setTimeout
        this.poll()
      }
      , this.state.pollingInterval);

    this.setState({
      polling
    })
  }

  static stage(cards) {
    if (cards < 3)
      return (<img className="stage-img" alt="Mind" src={pics.mind}/>);
    if (cards >= 3 && cards < 6)
      return (<img className="stage-img" alt="Body" src={pics.body}/>);
    else
      return (<img className="stage-img" alt="Soul" src={pics.soul}/>)
  }
}

export default CurrentNames;