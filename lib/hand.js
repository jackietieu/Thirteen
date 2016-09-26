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

  bestPlay(currentPlay){
    switch (currentPlay.type) {
      case "n-sequence":
        break;
      case "quad":
        break;
      case "trio":
        break;
      case "pair":
        //check all cards in hand
        //is there a pair that can beat the current pair in hand?
        //returns currentPlay obj

        break;
      case "single":
        break;
      case "newRound":
        //last one, should call bestPlay recursively
        //until there is a valid hand obj returned
        //returns a currentPlay obj with the best cards
      default:
        return "pass";
    }
    //return next best play if there is one
    //return "pass" by default
    //list from top to bottom, return first

    //check if "n-sequence"
      //if n-sequence .length >= 3 then can only be played
        //if newRound is currentPlay.type
        //if the n-sequnce can beat currentPlay's n-seq
    //check if "four of a kind"
    //check if "three of a kind"
    //check if "pair"
    //check if "single"
  }

  validPlay(currentPlay){
    this.updateCardCount();
    debugger;
    let kickerRank = currentPlay.kicker.kickerRank;
    let kickerVal = currentPlay.kicker.val;
    let nextPlay;

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
      case "pair":
        let checkVals = Array.from(new Array(17 - kickerVal), (x,i) => i + kickerVal);
        let playableCards = [];

        for (let i = 0; i < checkVals.length; i++) {
          if (this.cardsByCount[checkVals[i]]) {
            if((this.cardsByCount[checkVals[i]].cards.length >= 2) && (this.cardsByCount[checkVals[i]].kickerRank > kickerRank)){
              playableCards = this.cardsByCount[checkVals[i]].cards;
              break;
            }
          }
        }

        if (playableCards.length >= 2 || (this.offsetPlayerId === 0 && this.cardIds.length == 2)) {
          let card1 = playableCards.slice(playableCards.length - 1, playableCards.length);
          let card2 = playableCards.slice(playableCards.length - 2, playableCards.length - 1);

          let card1idx = this.cards.indexOf(card1[0]);
          let card2idx = this.cards.indexOf(card2[0]);

          this.cards.splice(card1idx, 1);
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
          card.kickerRank > currentPlay.kicker.kickerRank
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
      //call validPlay recursively, passing in every play type
      //from best to least (single) until validPlay returns an obj
      //pass in "dummy" currentPlay with low vals
        //default play
        //placeholder -> cpu plays first card in hand for now
        // let possibeCases = ["n-sequence", "quad", "trio", "pair", "single"];
        let possibleCases = ["pair", "single"];
        let dummyCases = ["pair currentPlay obj", "single play obj"];
        let lowKicker = {
          val: 0,
          kickerRank: 0
        };

        for (let i = 0; i < possibleCases.length; i++) {
          let dummyPlay = {
            type: possibleCases[i],
            cards: [],
            kicker: lowKicker,
            playerId: this.offsetPlayerId
          };

          nextPlay = this.validPlay(dummyPlay);

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
