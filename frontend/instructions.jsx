import React from 'react';

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  closeModal() {
    this.props.closeModal();
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      console.log('not closing')
      return;
    }

    this.closeModal();
  }

  nextPage() {
    if (this.state.page < 6) {
      this.setState({
        page: this.state.page + 1
      })
    }
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1
      })
    }
  }

  displayNextArrow() {
    return (
      <button 
        className="next-instructions-page"
        onClick={this.nextPage.bind(this)}>&gt;</button>
    )
  }

  displayPrevArrow() {
    return (
      <button 
        className="prev-instructions-page"
        onClick={this.prevPage.bind(this)}>&lt;</button>
    )
  }

  displayCloseButton() {
    return (
      <button 
        className="close-instructions-page"
        onClick={this.closeModal.bind(this)}>X</button>
    )
  }

  displayPage() {
    switch (this.state.page) {
      case 1:
        return (
          <div>
            <p>There are a maximum of four players, and each player is dealt 13 cards.</p>
            <p>The first player to play all of their cards wins!</p>
          </div>
        )
      case 2: 
        return (
          <div>
            <p>The player with the Three of Spades gets to go first!</p>
            <p>The first play of the game must include the Three of Spades</p>
            <br/>
            <div className="card-container">
              <div
                id="2"
                className="card spades rank3"
                style={{"left": "calc(50% - 27px)"}}
                >
                <div className="face"></div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <p>Cards can be played as a single card, a pair, a three-of-a-kind, a four-of-a-kind, or a consecutive sequence of 3 or more cards of any suit</p>
            <br/>
            <div className="card-container">
              <div
                id="2"
                className="card spades rank3"
                style={{"left": "calc(50% - 107px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="16"
                className="card clubs rank4"
                style={{"left": "calc(50% - 27px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="30"
                className="card diamonds rank5"
                style={{"left": "calc(50% + 53px)"}}
                >
                <div className="face"></div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <p>After the first move of the game, the game continues in a clockwise direction</p>
            <p>The next play must be a similar combination type, and it must be higher in value</p>
            <p>For example if a sequence of 3 cards is played, it can only be beat by a higher ranking sequence of 3 cards</p>
            <br/>
            <div className="card-container">
              <div
                id="2"
                className="card spades rank3"
                style={{"left": "calc(50% - 290px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="16"
                className="card clubs rank4"
                style={{"left": "calc(50% - 210px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="30"
                className="card diamonds rank5"
                style={{"left": "calc(50% - 130px)"}}
                >
                <div className="face"></div>
              </div>
              <span>&lt;</span>
              <div
                id="3"
                className="card spades rank4"
                style={{"left": "calc(50% + 53px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="17"
                className="card clubs rank5"
                style={{"left": "calc(50% + 133px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="18"
                className="card clubs rank6"
                style={{"left": "calc(50% + 213px)"}}
                >
                <div className="face"></div>
              </div>
            </div>          
          </div>
        )
      case 5:
        return (
          <div>
            <p>
              Card rankings are as follows from highest to lowest:
              <br/>
              2, Ace, King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3
            </p>
            <p>
              In case the ranking of the cards are the same, the suit of the last card will determine it's rank
            </p>
            <p>
              Suit rankings are as follows from highest to lowest:
              <br/>
              Hearts, Diamonds, Clubs, Spades
            </p>
            <br/>
            <div className="card-container">
              <div
                id="40"
                className="card hearts rank2"
                style={{"left": "calc(50% - 147.5px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="27"
                className="card diamonds rank2"
                style={{"left": "calc(50% - 67.5px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="14"
                className="card clubs rank2"
                style={{"left": "calc(50% + 13.5px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="1"
                className="card spades rank2"
                style={{"left": "calc(50% + 93.5px)"}}
                >
                <div className="face"></div>
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div>
            <h1>Other rules</h1>
            <ul>
              <li>2s cannot be included in a sequence</li>
              <li>If a player cannot make a play, or does not want to use any cards in the current turn, then he/she can pass</li>
              <li>If a player passes during a round/combination, that player cannot play any cards until all others have passed</li>
              <li>After all other players pass, the player of the last combination of cards played gets to choose what the next combination will be</li>
            </ul>
          </div>
        )
      default:
        return;
    }
  }

  render() {
    let instructions = this.displayPage();

    return (
      <div className="instructions-modal" ref={node => this.node = node}>
        {instructions}
        {this.displayNextArrow()}
        {this.displayPrevArrow()}
        {this.displayCloseButton()}
        <div className="instructions-page">{this.state.page} / 6</div>
      </div>
    )
  }
}
