import React from 'react';

class WhoseTurn extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        currPlayer: null,
        pollingInterval: 3000,
        polling: true
      };
  }

  componentDidMount() {
    this.poll();
  }
  componentWillUnmount() {
    this.setState({
      polling: false,
    });
    clearTimeout(this.state.polling);
  }

  render() {
    return (
      this.state.currPlayer
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
        fetch('/api/getWhoseTurn/')
          .then(response => {
            return response.json();
          }).then(result => {
          console.log("WhoseTurn JSON:");
          console.log(result);
            this.setState({
              currPlayer: result,
            });
          console.log("WhoseTurn currPlayer: " + this.state.currPlayer);
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

export default WhoseTurn;