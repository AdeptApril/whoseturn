import React from "react";
import { Animate } from "react-simple-animate";
import { divStyle } from "./styles";
import PubSub from './pubsub.js';

class AnimatedCardClaim extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cardClaimedAnimation = this.cardClaimedAnimation.bind(this);
    this.state = {
      play: false,
    };
  }

  componentDidMount() {
    PubSub.subscribe('card-claimed-button', this.cardClaimedAnimation);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('card-claimed-button');
  }

  cardClaimedAnimation() {
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
      <>
        <Animate
          play={this.state.play} // Toggle when animation should start
          duration={0.4}
          delay={0.3}
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
          <div style={divStyle} >Card Claimed</div>
        </Animate>
      </>
    );
  }
}

export default AnimatedCardClaim;