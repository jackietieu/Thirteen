import React from 'react';
import HandCard from './hand_card';

class Hand extends React.Component{
  constructor(props){
    super(props);
    this.hand = this.props.hand;
  }

  render(){
    let cards = this.hand.sort((a, b) => (
      a.i - b.i
    )).map((card, idx) => {
      return(
        <div
          id={card.i}
          style={card.offset}
          key={"card ".concat(card.suit).concat(card.rank)}
          className={"card"}>
          <div key={"back ".concat(card.suit).concat(card.rank)} className="back"></div>
        </div>
      );
    });

    return(
      <div className={"CPU-player-hand".concat(this.props.playerId)}>
        {cards}
      </div>
    );
  }
}

// return(
//   <div className={"CPU-player-hand".concat(this.props.playerId)}>
//     {cards}
//   </div>
// );

export default Hand;
