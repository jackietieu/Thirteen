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
        offset = {"top":`calc(15px + ${idx * 30}px)`, "left":"23px"};
      } else if (offsetPlayerId === 2){
        offset = {"left":`calc(30px + ${idx * 30}px)`};
      } else if (offsetPlayerId === 3){
        offset = {"top":`calc(15px + ${idx * 30}px)`, "left":"23px"};
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
    let possibleCases = ["sequence", "quad", "trio", "pair", "single"];
    let lowKicker = {
      val: 0,
      kickerRank: 0
    };

    switch (currentPlay.type) {
      case "start":
        for (let i = 0; i < possibleCases.length; i++) {
          let dummyPlay = {
            start: true,
            type: possibleCases[i],
            sequenceLength: "n",
            cards: [],
            kicker: lowKicker,
            playerId: this.offsetPlayerId
          };

          nextPlay = this.validPlay(dummyPlay);
          if (nextPlay !== "pass") {
            nextPlay.start = false;
            break;
          }
        }

        if (nextPlay !== "pass") {
          return nextPlay;
        } else {
          return "pass";
        }
      case "sequence":
        if (this.offsetPlayerId === 0 && !Object.keys(this.cardsByCount).every(val => this.cardsByCount[val].cards.length === 1)) {
          return "pass";
        }

        if (currentPlay.sequenceLength === "n") {
          let sequenceValues = this.cards.sort((card1, card2) => (
            card1.val - card2.val
          )).map(card => (card.val));

          let uniqueSequenceValues = [...new Set(sequenceValues)];
          let maxSequenceLength = uniqueSequenceValues.length;
          let subSequenceMin = Math.min(...uniqueSequenceValues);
          let validSequence = Array.from(new Array(maxSequenceLength), (x, k) => k + subSequenceMin);

          if (Object.keys(this.cardsByCount).every(val => this.cardsByCount[val].length === 1) || this.cards.length < 3) {
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
              subSequenceMin = Math.min(...subSequence);
              validSequence = Array.from(new Array(i), (x, k) => k + subSequenceMin);

              if (subSequence.toString() === validSequence.toString()) {
                let reversedCards = this.cards.sort((card1, card2) => (
                  card2.val - card1.val
                ));
                let sequenceKicker = reversedCards.find(card => card.val === subSequenceMax);

                if ((sequenceKicker.kickerRank < currentPlay.kicker.kickerRank)) {
                  continue;
                } else if ((currentPlay.start) === true && (subSequence[0] !== 3)) {
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
                return {
                  type: "sequence",
                  sequenceLength: playableCards.length,
                  cards: playableCards,
                  kicker: sequenceKicker,
                  playerId: this.offsetPlayerId
                };
              }
            }
          }
        } else {
          let sequenceValues = this.cards.sort((card1, card2) => (
            card1.val - card2.val
          )).map(card => (card.val));
          let uniqueSequenceValues = [...new Set(sequenceValues)];
          let maxSequenceLength = currentPlay.sequenceLength;
          let subSequenceMin = Math.min(...uniqueSequenceValues);
          let validSequence = Array.from(new Array(maxSequenceLength), (x, k) => k + subSequenceMin);

          if (this.cards.length < 3) {
            return "pass";
          } else if (this.offsetPlayerId === 0) {
            if (uniqueSequenceValues.toString() !== validSequence.toString()) {
              return "pass";
            }
          }

          for (let j = 0; (j + maxSequenceLength) <= uniqueSequenceValues.length; j++) {
            let subSequence = uniqueSequenceValues.slice(j, j + maxSequenceLength);
            let subSequenceMax = Math.max(...subSequence);
            subSequenceMin = Math.min(...subSequence);
            validSequence = Array.from(new Array(maxSequenceLength), (x, k) => k + subSequenceMin);

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
              return {
                type: "sequence",
                sequenceLength: playableCards.length,
                cards: playableCards,
                kicker: sequenceKicker,
                playerId: this.offsetPlayerId
              };
            }
          }
        }
        return "pass";
      case "quad":
        if (this.offsetPlayerId === 0 && Object.keys(this.cardsByCount).length != 1) {
          return "pass";
        }
        
        if (currentPlay.start === true) {
          if ((this.offsetPlayerId === 0 && Object.keys(this.cardsByCount).length != 1) || this.cardsByCount[3] && (this.cardsByCount[3].cards.length !== 4)) {
            return "pass";
          } else if (this.cardsByCount[3] && (this.cardsByCount[3].cards.length === 4)) {
            playableCards = this.cardsByCount[3].cards;
          }
        } else {
          for (let i = 0; i < checkVals.length; i++) {
            if (this.cardsByCount[checkVals[i]]) {
              if((this.cardsByCount[checkVals[i]].cards.length == 4) &&
                (this.cardsByCount[checkVals[i]].kickerRank > kickerRank)){
                playableCards = this.cardsByCount[checkVals[i]].cards;
                break;
              }
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
        if (this.offsetPlayerId === 0 && Object.keys(this.cardsByCount).length != 1) {
          return "pass";
        }

        if (currentPlay.start === true) {
          if ((this.offsetPlayerId === 0 && Object.keys(this.cardsByCount).length != 1) || this.cardsByCount[3] && (this.cardsByCount[3].cards.length !== 3)) {
            return "pass";
          } else if (this.cardsByCount[3] && (this.cardsByCount[3].cards.length === 3)) {
            playableCards = this.cardsByCount[3].cards;
          }
        } else {
          for (let i = 0; i < checkVals.length; i++) {
            if (this.cardsByCount[checkVals[i]]) {
              if((this.cardsByCount[checkVals[i]].cards.length == 3) && (this.cardsByCount[checkVals[i]].kickerRank > kickerRank)){
                playableCards = this.cardsByCount[checkVals[i]].cards;
                break;
              }
            }
          }
        }

        if (playableCards.length == 3 || (this.offsetPlayerId === 0 && playableCards.length == 3)) {
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
        if (this.offsetPlayerId === 0 && Object.keys(this.cardsByCount).length != 1) {
          return "pass";
        }
        if (currentPlay.start === true) {
          if ((this.offsetPlayerId === 0 && Object.keys(this.cardsByCount).length != 1) || this.cardsByCount[3] && (this.cardsByCount[3].cards.length !== 2)) {
            return "pass";
          } else if (this.cardsByCount[3] && (this.cardsByCount[3].cards.length === 2)) {
            playableCards = this.cardsByCount[3].cards;
          }
        } else {
          for (let i = 0; i < checkVals.length; i++) {
            if (this.cardsByCount[checkVals[i]]) {
              if((this.cardsByCount[checkVals[i]].cards.length == 2) && (this.cardsByCount[checkVals[i]].kickerRank > kickerRank)){
                playableCards = this.cardsByCount[checkVals[i]].cards;
                break;
              }
            }
          }
        }

        if (playableCards.length == 2 || (this.offsetPlayerId === 0 && playableCards.length == 2)) {
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
        if (currentPlay.start === true) {
          if (this.cardsByCount[3] && (this.cardsByCount[3].cards.length !== 1)) {
            return "pass";
          } else if (this.cardsByCount[3] && (this.cardsByCount[3].cards.length === 1)) {
            playableCards = this.cardsByCount[3].cards;
          }
        } else {
          let betterCard = this.cards.sort((card1, card2) => (
            card1.val - card2.val
          )).find(card => (
            card.kickerRank >= currentPlay.kicker.kickerRank
          ));

          playableCards = [betterCard];
        }

        if (this.cards.length === 0) {
          return "pass";
        }

        let betterCardIdx = this.cards.indexOf(playableCards[0]);

        if (betterCardIdx === -1 ||
          (this.offsetPlayerId === 0 && this.cardIds.length > 1)) {
          return "pass";
        } else {
          this.cards.splice(betterCardIdx, 1);
          nextPlay = {
            type: "single",
            cards: playableCards,
            kicker: playableCards[0],
            playerId: this.offsetPlayerId
          };

          return nextPlay;
        }
      case "newRound":
        for (let i = 0; i < possibleCases.length; i++) {
          let dummyPlay = {
            type: possibleCases[i],
            sequenceLength: "n",
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
