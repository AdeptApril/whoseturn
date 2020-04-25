import React from "react";
export default class events extends React.Component {
  render() {
    return (
      <button onClick={events.publish('clicked-button')}>Toggle Visibility</button>
    );
  }
}