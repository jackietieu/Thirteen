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
      <HandCard
        offset={card.offset}
        i={card.i}
        idx={idx}
        key={"card ".concat(card.i).concat(` ${idx}`)} />
    );
    }
    );

    return(
      <div className={"CPU-player-hand".concat(this.props.playerId)}>
        {cards}
      </div>
    );
  }
}

export default Hand;
