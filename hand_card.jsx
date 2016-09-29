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

  // selectCard(e){
  //   e.preventDefault();
  //
  //   if (!e.currentTarget.classList.contains('selected')) {
  //     this.setState({
  //       currentSelection: this.state.currentSelection.concat(parseInt(e.currentTarget.id))
  //     });
  //   } else {
  //     let idx = this.state.currentSelection.indexOf(e.currentTarget.id);
  //     let tempSelection = this.state.currentSelection;
  //     tempSelection.splice(idx, 1);
  //     this.setState({
  //       currentSelection: tempSelection
  //     });
  //   }
  //
  //   e.currentTarget.classList.toggle('selected');
  // }

  render(){
    // const suits = ["spades", "clubs", "diamonds", "hearts"];
    // let rank = " rank".concat(this.i % 13 + 1);
    // let suit = suits[this.i / 13 | 0];
    // let offset = {"left":`calc(30px + ${this.idx * 30}px)`};
    // let key = (play === "play") ? " play" : " hand";
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

// <div
//   id={this.i}
//   style={offset}
//   key={"card ".concat(suit).concat(rank)}
//   className={"card ".concat(suit).concat(rank)}
//   onClick={this.selectCard.bind(this)}>
// <div key={"face ".concat(suit).concat(rank)} className="face"></div>
// </div>
export default HandCard;
