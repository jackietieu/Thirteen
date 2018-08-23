import React from 'react';

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="instructions">
        <div className="title">
          <h1>Thirteen</h1>
          <h3>The Most Beloved Card Game of Vietnam</h3>
          <span>
            <a target="_blank" href="https://en.wikipedia.org/wiki/Ti%E1%BA%BFn_l%C3%AAn">Rules of Thirteen</a>
          </span>
          <br />
        </div>
        <ul>
          <li>
            Player with the Three of Spades starts first!
            <div className="card-container">
              <div
                id="2"
                className="card spades rank3"
                style={{"left": "calc(50% - 27px)"}}
                >
                <div className="face"></div>
              </div>
            </div>
          </li>
          <div className="horizontal-line"></div>
          <li>
            The first play of the game must be a valid combination that includes the Three of Spades
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
          </li>
          <div className="horizontal-line"></div>
          <li>Valid plays are single cards, pairs, three-of-a-kinds, four-of-a-kinds, or consecutive sequences of 3 or more cards of any suit</li>
          <div className="horizontal-line"></div>
          <li>Play continues in clockwise direction</li>
          <div className="horizontal-line"></div>
          <li>
            All players must beat the previous combo by playing a similar type of combo where the highest card is higher in value and/or suit
            <div className="card-container">
              <div
                id="2"
                className="card spades rank3"
                style={{"left": "calc(50% - 267px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="16"
                className="card clubs rank4"
                style={{"left": "calc(50% - 187px)"}}
                >
                <div className="face"></div>
              </div>
              <div
                id="30"
                className="card diamonds rank5"
                style={{"left": "calc(50% - 107px)"}}
                >
                <div className="face"></div>
              </div>
              <span>loses to</span>
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
          </li>
          <div className="horizontal-line"></div>
          <li>Threes are the lowest in value and Twos are the highest in value</li>
          <div className="horizontal-line"></div>
          <li>In case of a tiebreaker, the higher ranking suit wins</li>
          <div className="horizontal-line"></div>
          <li>
            Hearts are the highest in rank, followed by Diamonds, Clubs and then Spades
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
          </li>
          <div className="horizontal-line"></div>
          <li>When there are no playable cards, the player must pass and wait for the next round to start</li>
          <div className="horizontal-line"></div>
          <li>When all but one player passes, that player gets to start the next round with any combination</li>
          <div className="horizontal-line"></div>
          <li>First one to play all of their cards wins!</li>
        </ul>
      </div>
    )
  }
}
