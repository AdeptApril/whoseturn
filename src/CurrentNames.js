import React from 'react';

class CurrentNames extends React.Component {

  constructor(props) {
    super(props);
    this.state = {users: []};
    this.headers = [
      { key: 'name', label: 'Name' }
    ];
  }

  componentDidMount() {
    fetch('/api/getCurrPlayers/')
      .then(response => {
        return response.json();
      }).then(result => {
      console.log("Retrieved items:");
      console.log(result);
      console.log(this.headers);
      // let temp = JSON.parse(result);
      // console.log(temp);
      // const items = [];
      // const itemArray = json._embedded.collectionItems;
      // for (var i = 0; i < itemArray.length; i++) {
      //   itemArray[i]["link"] = itemArray[i]._links.self.href;
      //   items.push(itemArray[i]);
      // }
      this.setState({
        users: result.name
      });
      console.log(this.state.users);
    });
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
}

export default CurrentNames;