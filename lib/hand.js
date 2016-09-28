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
    let checkVals = Array.from(new Array(17 - kickerVal), (x, i) => i + kickerVal);

    switch (currentPlay.type) {
      case "start":
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
      case "sequence":
        if (currentPlay.sequenceLength === "n") {
          let sequenceValues = this.cards.sort((card1, card2) => (
            card1.val - card2.val
          )).map(card => (card.val));
          let uniqueSequenceValues = [...new Set(sequenceValues)];
          let maxSequenceLength = uniqueSequenceValues.length;
          let subSequenceMin = Math.min(...uniqueSequenceValues);
          let validSequence = Array.from(new Array(maxSequenceLength), (x, k) => k + subSequenceMin);
          //failsafe
          if (this.cards.length < 3) {
            console.log('failsafe');
            return "pass";
          } else if (this.offsetPlayerId === 0) {
            if (uniqueSequenceValues.toString() !== validSequence.toString()) {
              return "pass";
            }
          }

          for (let i = maxSequenceLength; i >= 3; i--) {
            for (let j = 0; (j + i) <= uniqueSequenceValues.length; j++) {
              let subSequence = uniqueSequenceValues.slice(j, j + i);
              let subSequenceMax = Math.max(...subSequence);
              let subSequenceMin = Math.min(...subSequence);
              let validSequence = Array.from(new Array(i), (x, k) => k + subSequenceMin);

              if (subSequence.toString() === validSequence.toString()) {
                let reversedCards = this.cards.sort((card1, card2) => (
                  card2.val - card1.val
                ));
                let sequenceKicker = reversedCards.find(card => card.val === subSequenceMax);

                if (sequenceKicker.kickerRank < currentPlay.kicker.kickerRank) {
                  continue;
                }

                subSequence.splice(subSequence.length - 1);
                subSequence.forEach(val => {
                  let seqCard = this.cards.find(card => card.val === val);
                  playableCards.push(seqCard);
                  let seqCardIdx = this.cards.indexOf(seqCard);
                  this.cards.splice(seqCardIdx, 1);
                });

                playableCards.push(sequenceKicker);
                let cardIdx = this.cards.indexOf(sequenceKicker);
                this.cards.splice(cardIdx, 1);
                debugger;
                return {
                  type: "sequence",
                  sequenceLength: i,
                  cards: playableCards,
                  kicker: sequenceKicker,
                  playerId: this.offsetPlayerId
                };
              }
            }
          }
        }

        //SETUP LOGIC FOR PLAY TO CONTINUE AFTER NEW ROUND IS SET

        //   if (playableCards.length > 0) {
        //     return {
        //       type: "sequence",
        //       sequenceLength: i,
        //       cards: playableCards,
        //       kicker: playableCards[0],
        //       playerId: this.offsetPlayerId
        //     };
        //   } else {
        //     return "pass";
        //   }
        //   //else, if sequenceLength = n, that means cpu/human is trying to calc
        //   //the best sequence it can play on a newRound
        //   //logic: should start from cards.length all the way down to 3
        //   //for the longest stretch on the first run through,
        //   //those become the next play
        //   //else return "pass"
        //
        //   //if (this.offsetPlayerId === 0 &&
        //   //sequenceLength !== this.cards.length) return "pass"
        // } else {
        //   //if sequenceLength is an actual integer x, check for all stretches of
        //   //consecutive integers of length x
        //   //kicker aka last card in the stretch should have a higher kickerRank
        //   //return "pass" if no possiblePlay
        // }
        //return pass by default if no sequence found
        return "pass";
      case "quad":
        for (let i = 0; i < checkVals.length; i++) {
          if (this.cardsByCount[checkVals[i]]) {
            if((this.cardsByCount[checkVals[i]].cards.length == 4) &&
              (this.cardsByCount[checkVals[i]].kickerRank > kickerRank)){
              playableCards = this.cardsByCount[checkVals[i]].cards;
              break;
            }
          }
        }

        if (playableCards.length == 4 || (this.offsetPlayerId === 0 && playableCards.length == 4)) {
          let card1 = playableCards.slice(playableCards.length - 1, playableCards.length)[0];
          let card2 = playableCards.slice(playableCards.length - 2, playableCards.length - 1)[0];
          let card3 = playableCards.slice(playableCards.length - 3, playableCards.length - 2)[0];
          let card4 = playableCards.slice(playableCards.length - 4, playableCards.length - 3)[0];

          let card1idx = this.cards.indexOf(card1);
          this.cards.splice(card1idx, 1);
          let card2idx = this.cards.indexOf(card2);
          this.cards.splice(card2idx, 1);
          let card3idx = this.cards.indexOf(card3);
          this.cards.splice(card3idx, 1);
          let card4idx = this.cards.indexOf(card4);
          this.cards.splice(card4idx, 1);

          nextPlay = {
            type: "quad",
            cards: [card1, card2, card3, card4],
            kicker: card1,
            playerId: this.offsetPlayerId
          };

          return nextPlay;
        } else {
          return "pass";
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

        if (betterCardIdx === -1 ||
          (this.offsetPlayerId === 0 && this.cardIds.length > 1)) {
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
        let possibleCases = ["sequence", "quad", "trio", "pair", "single"];
        let lowKicker = {
          val: 0,
          kickerRank: 0
        };

        let hand = this;

        for (let i = 0; i < possibleCases.length; i++) {
          let dummyPlay = {
            type: possibleCases[i],
            sequenceLength: "n",
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
