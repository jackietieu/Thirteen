import CardObj from './card_obj.js';

class PlayerHandObj{
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

  //REMOVE AI LOGIC, REPLACE WITH LOGIC TO CHECK SELECTEDHAND
  //validPlay is called with the selected hand as `this.cards`

  validPlay(currentPlay){
    //human player cards are removed by the front end
    let play = {
      type: "single",
      cards: this.cards,
      kicker: this.cards.slice(this.cards.length - 1, this.cards.length),
      playerId: this.offsetPlayerId
    };

    return play;
  }
}

export default PlayerHandObj;
