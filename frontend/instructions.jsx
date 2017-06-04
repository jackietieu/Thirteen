import React from 'react';

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="instructions">
        <div className="title">
          <span>Thirteen</span>
          <br />
          <span>
            <a target="_blank" href="https://en.wikipedia.org/wiki/Ti%E1%BA%BFn_l%C3%AAn">Rules of Thirteen:</a>
          </span>
          <br />
        </div>
        <ul>
          <li>Player with the Three of Spades starts first!</li>
          <li>
            <div
              id="2"
              className="card spades rank3"
              style={{"top": "-20px", "left": "48.3%"}}
              >
              <div className="face"></div>
            </div>
          </li>
          <li>The first play of the game must be a valid combination that includes the Three of Spades</li>
          <li>
            <div
              id="2"
              className="card spades rank3"
                style={{"top": "-20px", "left": "40.8%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="16"
              className="card clubs rank4"
                style={{"top": "-20px", "left": "48.3%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="30"
              className="card diamonds rank5"
                style={{"top": "-20px", "left": "55.8%"}}
              >
              <div className="face"></div>
            </div>
          </li>
          <li>Valid plays are consecutive sequences of 3+ cards, four-of-a-kinds, three-of-a-kinds, pairs, and single cards</li>
          <li>Play continues in clockwise direction</li>
          <li>All players must beat the previous combo by playing a similar type of combo where the highest card is higher in value and/or suit</li>
          <li>
            <div
              id="2"
              className="card spades rank3"
                style={{"top": "-20px", "left": "15.8%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="16"
              className="card clubs rank4"
                style={{"top": "-20px", "left": "23.3%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="30"
              className="card diamonds rank5"
                style={{"top": "-20px", "left": "30.8%"}}
              >
              <div className="face"></div>
            </div>
            loses to
            <div
              id="3"
              className="card spades rank4"
                style={{"top": "-20px", "left": "65.8%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="17"
              className="card clubs rank5"
                style={{"top": "-20px", "left": "73.3%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="18"
              className="card clubs rank6"
                style={{"top": "-20px", "left": "80.8%"}}
              >
              <div className="face"></div>
            </div>
          </li>
          <li>Threes are the lowest in value and Twos are the highest in value</li>
          <li>In case of a tiebreaker, the stronger suit wins</li>
          <li>Hearts are the highest in rank, followed by Diamonds, Clubs and Spades</li>
          <li>
            <div
              id="40"
              className="card hearts rank2"
                style={{"top": "-20px", "left": "37.5%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="27"
              className="card diamonds rank2"
                style={{"top": "-20px", "left": "45%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="14"
              className="card clubs rank2"
                style={{"top": "-20px", "left": "52.5%"}}
              >
              <div className="face"></div>
            </div>
            <div
              id="1"
              className="card spades rank2"
                style={{"top": "-20px", "left": "60%"}}
              >
              <div className="face"></div>
            </div>
          </li>
          <li>When there are no playable cards, the player must pass and wait for the next round to start</li>
          <li>When all but one player passes, that player gets to start the next round with any combination</li>
          <li>First one to play all of their cards wins!</li>
        </ul>
      </div>
    )
  }
}
