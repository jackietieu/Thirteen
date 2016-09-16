import React from 'react';
import HandCard from './hand_card';

class Hand extends React.Component{
  constructor(props){
    super(props);
    this.hand = this.props.hand;
  }

  // createCards(){
  //   const suits = ["spades", "clubs", "diamonds", "hearts"];
  //
  //   return(
  //     this.hand.map((i, idx) => {
  //       let rank = " rank".concat(i % 13 + 1);
  //       let suit = suits[i / 13 | 0];
  //       let offset;
  //       if (this.props.playerId === 2) {
  //         offset = {"left":`calc(140px + ${idx * 30}px)`};
  //       } else if (this.props.playerId === 1) {
  //         offset = {"top":`calc(120px + ${idx * 30}px)`, "left":"32.5px"};
  //       } else if (this.props.playerId === 3) {
  //         offset = {"top":`calc(120px + ${idx * 30}px)`, "left":"605px"};
  //       }
  //
  //       return(
  //         <div
  //           style={offset}
  //           key={"card ".concat(suit).concat(rank)}
  //           className={"card ".concat(suit).concat(rank)}>
  //           <div key={"face ".concat(suit).concat(rank)} className="face"></div>
  //         </div>
  //       );
  //     })
  //   );
  // }

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
