import React from 'react';
import PubSub from './pubsub.js';

/* Displays current players in the game and minigame */
class CurrentNames extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        admin: null,
        users: [],
        players: [],
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
      <table>
        {/*<thead>*/}
        {/*<tr>*/}
          {/*{*/}
            {/*this.headers.map(function(h) {*/}
              {/*return (*/}
                {/*<th key = {h.key}>{h.label}</th>*/}
              {/*)*/}
            {/*})*/}
          {/*}*/}
        {/*</tr>*/}
        {/*</thead>*/}
        <tbody>
        {this.state.users.length > 0 ? <tr><td>Players in game:</td></tr> : <tr><td/></tr>}
        {
          this.state.users.map(user => <tr key={user}><td>{user}</td></tr>)
        }
        {this.state.players.length > 0 ? <tr>Players in Minigame:</tr> : <tr/>}
        {
          this.state.players.map(player => <tr key={player}><td>{player}</td></tr>)
        }
        {/*}*/}
        </tbody>
      </table>
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
            users: result.name
          });
          if(this.state.users.length > 0 && this.state.users[0] !== this.state.admin) //Check to see who the admin is if it doesn't make sense given array of users
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
          console.log("Current Player state.users: " + this.state.users);
        });

        //Minigame players fetch
        fetch('/api/getCurrPlayersInMinigame/')
          .then(response => {
            return response.json();
          }).then(result => {
          // console.log("Current Minigame Player JSON:");
          // console.log(result);
          //console.log(this.headers);
          this.setState({
            players: result.name
          });
          console.log("Current Minigame Player state.players: " + this.state.players);
        })
          .then( result => {
        if(this.state.players.length <= 0)
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
}

export default CurrentNames;