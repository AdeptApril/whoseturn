import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';
// import ModeWhoseTurn from './ModeWhoseTurn.js';
import ModeBriMegAman from './ModeBriMegAman.js';

class AppEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "",
    };
  }

  componentDidMount() {
  }

  render() {
    return (
  //     <div>
  //       <div>
  //       {this.state.mode === "" ? "Choose game mode: " : null}<br/>
  //       {this.state.mode === "" ? <button onClick={() => this.setState({mode: "ModeWhoseTurn",})}>Turn tracking with minigame tracking</button> : null}<br/>
  //       {this.state.mode === "" ? <button onClick={() =>this.setState({mode: "ModeBriMegAman",})}>BriMegAman</button> : null}<br/>
  //       </div>
  //
  //       {this.state.mode === "ModeWhoseTurn" ? <ModeWhoseTurn/> : null}
  //       {this.state.mode === "ModeBriMegAman" ? <ModeBriMegAman/> : null}
  //     </div>
      <ModeBriMegAman/>
      // <ModeWhoseTurn/>
    );
  }
}

//render(<AppTry />, document.getElementById('root'));
render(<AppEntry/>, document.getElementById('root'));