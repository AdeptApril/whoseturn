import React from 'react';

class CurrentNames extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        users: [],
        pollingInterval: 3000,
        polling: true
      };
    this.headers = [
      { key: 'name', label: 'Name' }
    ];
  }

  componentDidMount() {
    this.poll();
  }
  render() {
    return (
      <table>
        <thead>
        <tr>
          {
            this.headers.map(function(h) {
              return (
                <th key = {h.key}>{h.label}</th>
              )
            })
          }
        </tr>
        </thead>
        <tbody>
        {
          this.state.users.map(user => <tr key={user}><td>{user}</td></tr>)
          // this.state.users.map(function(item, key)
          // {
          //   return (
          //     <tr key = {key}>
          //       <td>{item.name}</td>
          //     </tr>
          //   )
          // })
        }
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
          console.log("Retrieved items:");
          console.log(result);
          console.log(this.headers);
          this.setState({
            users: result.name
          });
          console.log(this.state.users);
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