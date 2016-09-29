import React from 'react';

class HandCard extends React.Component{
  constructor(props){
    super(props);

    this.i = this.props.i;
    this.idx = this.props.idx;

    const suits = ["spades", "clubs", "diamonds", "hearts"];
    this.rank = " rank".concat(this.i % 13 + 1);
    this.val = this.i % 13 + 1;
    this.suit = suits[this.i / 13 | 0];
    this.offset = this.props.offset;
  }

  render(){
    return(
      <div
        id={this.i}
        style={this.offset}
        key={"card ".concat(this.suit).concat(this.rank)}
        className={"card ".concat(this.suit).concat(this.rank)}
        onClick={this.props.selectCard} >
        <div key={"face ".concat(this.suit).concat(this.rank)} className="face"></div>
      </div>
    );
  }
}
export default HandCard;
