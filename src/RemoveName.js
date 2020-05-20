import React from 'react';

class RemoveName extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {name: this.props.name};
  //   this.headers = [
  //     {key: 'name', label: 'Name'}
  //   ];
  // }

  componentDidMount() {
    // console.log("RemoveName mounted");
    // fetch('/api/leavename/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: this.state.name,
    //     //secondParam: 'yourOtherValue',
    //   })
    // })
    //   .then(response => {
    //     return response.json();
    //   });
  }

  static remove(playerToBeRemoved) {
    console.log("removing " + playerToBeRemoved);
    fetch('/api/leavename/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playerToBeRemoved,
        //secondParam: 'yourOtherValue',
      })
    })
      .then(response => {
        return response.json();
      });
  }

  // render() {
  //   return (
  //     null
  //   )
  // }
}

export default RemoveName;