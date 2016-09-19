import CardObj from './card_obj.js';
//CPU HAND
class HandObj{
  constructor(cardIds, offsetPlayerId){
    let offset;

    // .sort((a,b) => (
    //   a.kickerRank - b.kickerRank
    // ))

    // .sort((a, b) => (
    //   a - b
    // ))

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
          card.kickerRank > currentPlay.cards[0].kickerRank
        )));

        if (betterCardIdx === -1) {
          return "pass";
        } else {
          let betterCardId = this.cards[betterCardIdx].i;

          let nextPlay = {
            type: "single",
            cards: [this.cards[betterCardIdx]],
            kicker: this.cards.splice(betterCardIdx, 1)[0],
            playerId: this.offsetPlayerId
          };

          return nextPlay;
        }
      case "newRound":
        //default play
        //placeholder -> cpu plays first card in hand for now
        let nextPlay = {
          type: "single",
          cards: [this.cards[0]],
          kicker: this.cards.splice(0, 1)[0],
          playerId: this.offsetPlayerId
        };
        return nextPlay;
      default:
        return "pass";
    }
  }
}

export default HandObj;
