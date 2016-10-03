import React from 'react';
import HandObj from './lib/hand';
import Hand from './hand';

class ComputerPlayer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hand: this.props.playerObj.hand.cards,
      currentPlay: []
    };
  }

  render(){
    return (
      <div className={"CPU-player".concat(this.props.playerId)}>
        <Hand hand={this.state.hand} playerId={this.props.playerId} />
        <div className={"CPU-player-name".concat(this.props.playerId)}>
          <span>Player {this.props.playerId}</span>
        </div>
        <div className={"CPU-player-played-hand".concat(this.props.playerId)}>
          {this.state.currentPlay}
        </div>
      </div>
    );
  }
}

export default ComputerPlayer;
