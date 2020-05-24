import React from "react";
import { Animate, AnimateGroup } from "react-simple-animate";
import PubSub from './pubsub.js';
import {divStyle} from "./styles";

// const props = {
//   startStyle: { opacity: 0 },
//   endStyle: { opacity: 1 }
// };

class EndGameAnimation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.gameOver = this.gameOver.bind(this);
    this.state = {
      play: false,
    };
  }

  componentDidMount() {
    PubSub.subscribe('player-has-won', this.gameOver);
  }

  gameOver() {
    this.setState({
      play: true,
    });
    setTimeout( () => {
      this.setState({
        play: false,
      })
    }, 3000);
  }

  render() {
    return (
      // // This example demonstrate animate individual element.
      // <Animate play {...props}>
      //   <h1>React simple animate</h1>
      // </Animate>

  //     // This example demonstrate animate keyframes with individual element.
  //     <AnimateKeyframes play iterationCount={"infinite"} keyframes={['opacity: 0', 'opacity: 1']}>
  // <h1>React simple animate with keyframes</h1>
  //     </AnimateKeyframes>
  //
      // This example demonstrate animate group of animation with sequenceIndex.
      <AnimateGroup play={this.state.play}>
        <Animate sequenceIndex={0}
                 play={this.state.play} // Toggle when animation should start
                 duration={0.4}
                 rotationrate={0.1}
                 delay={0.3}
                 start={{
                   transform: "translateX(0vh)",
                   opacity: 0, filter: 'blur(10px)',
                   color: "#00FF00",
                 }}
                 end={{
                   transform: "translateX(20vh)",
                   opacity: 1, filter: 'blur(0)',
                   color: "#FF0000"
                 }}
        >
          <div style={divStyle}>First this</div>
        </Animate>
    <Animate sequenceIndex={1}
      play={this.state.play} // Toggle when animation should start
      duration={0.4}
      delay={1.3}
      start={{
        transform: "translateX(0vh)",
        opacity: 0, filter: 'blur(10px)',
        color: "#00FF00",
      }}
      end={{
        transform: "translateX(20vh)",
        opacity: 1, filter: 'blur(0)',
        color: "#FF0000"}}
    >
      <div style={divStyle} >then this</div>
    </Animate>
  </AnimateGroup>
    );
  }
}

export default EndGameAnimation;