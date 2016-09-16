import CardObj from './card_obj.js';

class HandObj{
  constructor(cardIds, offsetPlayerId){
    let offset;

    this.offsetPlayerId = offsetPlayerId;
    this.cardIds = cardIds;
    this.cards = cardIds.sort((a, b) => (
      a - b
    )).map((id, idx) => {
      if (offsetPlayerId === 0){
        offset = {"left":`calc(30px + ${idx * 30}px)`};
      } else if (offsetPlayerId === 1){
        offset = {"top":`calc(120px + ${idx * 30}px)`, "left":"32.5px"};
      } else if (offsetPlayerId === 2){
        offset = {"left":`calc(30px + ${idx * 30}px)`};
      } else if (offsetPlayerId === 3){
        offset = {"top":`calc(120px + ${idx * 30}px)`, "left":"605px"};
      }

      return new CardObj(id, offset);
    });
  }

  validPlay(currentPlay){
    switch (currentPlay.type) {
      case "start":
        //return CardObj of 3 spades
        let spades3idx = this.cards.indexOf(this.cards.find(card => (
          card.i === 2
        )));

        let startingPlay = {
          type: "single",
          cards: [new CardObj(2)],
          kicker: this.cards.splice(spades3idx, 1)[0],
          playerId: this.offsetPlayerId
        };

        return startingPlay;
      case "single":
        let betterCardIdx = this.cards.indexOf(this.cards.find(card => (
          card.i > currentPlay.cards[0].i
        )));

        let betterCardId = this.cards[betterCardIdx].i;

        if (betterCardIdx !== -1) {
          let nextPlay = {
            type: "single",
            cards: [new CardObj(betterCardId)],
            kicker: this.cards.splice(betterCardIdx, 1)[0],
            playerId: this.offsetPlayerId
          };

          return nextPlay;
        } else {
          return "pass";
        }
      default:
        return "pass";
    }
  }
}

export default HandObj;
