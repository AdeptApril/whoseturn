import React from 'react';

class SetName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.name};
    this.headers = [
      {key: 'name', label: 'Name'}
    ];
  }

  componentDidMount() {
    console.log("SetName mounted");
    fetch('/api/inputname/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        //secondParam: 'yourOtherValue',
      })
    })
      .then(response => {
        return response.json();
      });
  }

  static inputName(name) {
    fetch('/api/inputname/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        //secondParam: 'yourOtherValue',
      })
    })
      .then(response => {
        return response.json();
      });
  }

  render() {
    return (
      null
    )
  }
}

export default SetName;