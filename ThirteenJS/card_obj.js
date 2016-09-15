class CardObj{
  constructor(id, offset){
    // this.i = this.props.i;
    // this.idx = this.props.idx;
    const suits = ["spades", "clubs", "diamonds", "hearts"];
    this.i = id;
    this.rank = " rank".concat(id % 13 + 1);
    this.val = id % 13 + 1;
    this.suit = suits[id / 13 | 0];
    this.offset = offset;
    // this.offset = {"left":`calc(30px + ${this.idx * 30}px)`};
  }

  info(){
    return(
      {
        rank: this.rank,
        suit: this.suit,
        val: this.val,
        offset: this.offset
      }
    );
  }
}

export default CardObj;
