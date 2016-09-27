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

    this.cardsByCount = {};
    this.updateCardCount();
  }

  updateCardCount(){
    this.cardsByCount = {};
    this.cards.forEach(card => {
      let cardVal = card.val;
      this.cardsByCount[cardVal] = (this.cardsByCount[cardVal]) ?
        {
          kickerRank: (card.kickerRank > this.cardsByCount[cardVal].kickerRank) ? card.kickerRank : this.cardsByCount[cardVal].kickerRank,
          cards: this.cardsByCount[cardVal].cards.concat(card)
        } :
        {
          kickerRank: card.kickerRank,
          val: card.val,
          cards: [card]
        };
    });
  }

  validPlay(currentPlay){
    this.updateCardCount();
    let kickerRank = (currentPlay.kicker.kickerRank === undefined) ? 0 : currentPlay.kicker.kickerRank;
    let kickerVal = (currentPlay.kicker.val === undefined) ? 0 : currentPlay.kicker.val;
    let playableCards = [];
    let nextPlay;
    let checkVals = Array.from(new Array(17 - kickerVal), (x,i) => i + kickerVal);

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

        if (spades3idx === -1 || (this.offsetPlayerId === 0 && this.cardIds.length > 1)) {
          return "pass";
        } else {
          return startingPlay;
        }
      case "trio":
        for (let i = 0; i < checkVals.length; i++) {
          if (this.cardsByCount[checkVals[i]]) {
            if((this.cardsByCount[checkVals[i]].cards.length >= 3) && (this.cardsByCount[checkVals[i]].kickerRank > kickerRank)){
              playableCards = this.cardsByCount[checkVals[i]].cards;
              break;
            }
          }
        }

        if (playableCards.length >= 3 || (this.offsetPlayerId === 0 && playableCards.length == 3)) {
          let card1 = playableCards.slice(playableCards.length - 1, playableCards.length)[0];
          let card2 = playableCards.slice(playableCards.length - 2, playableCards.length - 1)[0];
          let card3 = playableCards.slice(playableCards.length - 3, playableCards.length - 2)[0];

          let card1idx = this.cards.indexOf(card1);
          this.cards.splice(card1idx, 1);
          let card2idx = this.cards.indexOf(card2);
          this.cards.splice(card2idx, 1);
          let card3idx = this.cards.indexOf(card3);
          this.cards.splice(card3idx, 1);

          nextPlay = {
            type: "trio",
            cards: [card1, card2, card3],
            kicker: card1,
            playerId: this.offsetPlayerId
          };

          return nextPlay;
        } else {
          return "pass";
        }
      case "pair":
        for (let i = 0; i < checkVals.length; i++) {
          if (this.cardsByCount[checkVals[i]]) {
            if((this.cardsByCount[checkVals[i]].cards.length >= 2) && (this.cardsByCount[checkVals[i]].kickerRank > kickerRank)){
              playableCards = this.cardsByCount[checkVals[i]].cards;
              break;
            }
          }
        }

        if (playableCards.length >= 2 || (this.offsetPlayerId === 0 && playableCards.length == 2)) {
          let card1 = playableCards.slice(playableCards.length - 1, playableCards.length)[0];
          let card2 = playableCards.slice(playableCards.length - 2, playableCards.length - 1)[0];

          let card1idx = this.cards.indexOf(card1);
          this.cards.splice(card1idx, 1);
          let card2idx = this.cards.indexOf(card2);
          this.cards.splice(card2idx, 1);

          nextPlay = {
            type: "pair",
            cards: [card1, card2],
            kicker: card1,
            playerId: this.offsetPlayerId
          };
          return nextPlay;
        } else {
          return "pass";
        }
      case "single":
        let betterCardIdx = this.cards.indexOf(this.cards.find(card => (
          card.kickerRank >= currentPlay.kicker.kickerRank
        )));

        if (betterCardIdx === -1 || (this.offsetPlayerId === 0 && this.cardIds.length > 1)) {
          return "pass";
        } else {
          let betterCardId = this.cards[betterCardIdx].i;

          nextPlay = {
            type: "single",
            cards: [this.cards[betterCardIdx]],
            kicker: this.cards.splice(betterCardIdx, 1)[0],
            playerId: this.offsetPlayerId
          };

          return nextPlay;
        }
      case "newRound":
        let possibleCases = ["trio", "pair", "single"];
        let lowKicker = {
          val: 0,
          kickerRank: 0
        };

        let hand = this;

        for (let i = 0; i < possibleCases.length; i++) {
          let dummyPlay = {
            type: possibleCases[i],
            cards: [],
            kicker: lowKicker,
            playerId: this.offsetPlayerId
          };

          nextPlay = hand.validPlay(dummyPlay);
          if (nextPlay !== "pass") {
            break;
          }
        }

        if (nextPlay !== "pass") {
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
