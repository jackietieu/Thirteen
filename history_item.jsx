import React from 'react';
import HandCard from './hand_card';

class HistoryItem extends React.Component {
  constructor(props){
    super(props);
    this.play = this.props.play;
    this.item = undefined;

    this.scaledCards = this.scaleCards();
    this.insertPlay();
  }

  //offset={{"top":"27.5px", "left":`calc(${(idx + 1) * 44}px - ${(13 - this.play.cards.length) * 3}px)`}}


  scaleCards(){
    if (this.play.cards.length === 0) {
      return [];
    } else {
      let cards = this.play.cards.map((card, idx) => {
        return(
          <HandCard
            offset={{"top":"27.5px", "left":`calc(${((idx + 1) * 57) - 47}px)`}}
            i={card.i}
            idx={idx}
            key={"card ".concat(card.i).concat(` ${idx}`)} />
        );}
      );

      let cardContainer =
      <div>
        {cards}
      </div>;
      return cardContainer;
    }
  }

  insertPlay(){
    let currentPlayerId = this.play.playerId;

    switch (this.play.type) {
      case "sequence":
        if (currentPlayerId === 0) {
          this.item = `You played`;
        } else {
          this.item = `Player ${currentPlayerId} played`;
        }
        break;
      case "quad":
        if (currentPlayerId === 0) {
          this.item = `You played`;
        } else {
          this.item = `Player ${currentPlayerId} played`;
        }
        break;
      case "trio":
        if (currentPlayerId === 0) {
          this.item = `You played`;
        } else {
          this.item = `Player ${currentPlayerId} played`;
        }
        break;
      case "pair":
        if (currentPlayerId === 0) {
          this.item = `You played`;
        } else {
          this.item = `Player ${currentPlayerId} played`;
        }
        break;
      case "single":
        if (currentPlayerId === 0) {
          this.item = `You played`;
        } else {
          this.item = `Player ${currentPlayerId} played`;
        }
        break;
      default:
        break;
    }
  }

  render(){
    return(
      <li>
        {this.item}: {this.scaledCards}
      </li>
    );
  }
}

export default HistoryItem;
