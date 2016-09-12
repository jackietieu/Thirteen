# Thirteen

## Minimum Viable Product

> This game will be built by using vanilla JavaScript on the frontend and NodeJS on the backend. This project will be a digital rendition of a classic card game called Thirteen in Vietnamese. It is similar to the well-known Chinese card game Big Two. Players will be able to play against 3 AIs on a card table until one of the players wins.

- [ ] Hosting on Heroku
- [ ] Each player receives a hand of 13 unique cards
- [ ] Player's can select which cards to play in the current round
- [ ] Game logic for valid moves for each turn
- [ ] Game runs until there is a winner
- [ ] Bonus: Game state can run until there is one player remaining keeping track of winner/loser


## Technologies

> NodeJS
> Playing Card Images Library

## Wireframes
* [View Wireframes][wireframes]

[wireframes]: docs/wireframes

## Implementation Timeline

Phase 1: Backend setup/Card functionality (1 day)

**Objective** Get playing cards to render and move properly

- [ ] New Node project
- [ ] Get server up and running
- [ ] Setup `Card` class
  - [ ] Card images show up properly on page
  - [ ] Cards stack against each other
  - [ ] Assign card values to corresponding images
  - [ ] Game initiates and passes out 13 cards to each player at random
- [ ] Setup `Hand` class
  - [ ] Each player has a `Hand` (AIs and human)
  - [ ] 13 random cards will go into the hand at first
  - [ ] Players can `select` and `play` cards
  - [ ] Hitting `play` causes cards to move from `hand` to the player's box of cards played within the current round


Phase 2: (1 day)

**Objective** Implementation of ability to play the correct cards when it is the player's turn

- [ ] Game uses poker logic
  - [ ] First valid move of the game must always contain 3 of spades
- [ ] On `play`, `hand` will be in charge of ensuring `validMove(cards)`
- [ ] `validMove(cards)` has multiple checks
  - [ ] Selected cards must be in the same order as the current round's played cards (i.e. if the current round is for pairs, players can only play pairs)
  - [ ] Similar to poker logic, except:
    - [ ] There are no flushes
    - [ ] A sequence/straight of three cards and above is a valid move
    - [ ] 2's are the highest valued cards
    - [ ] 2's CANNOT be used in a sequence/straight
    - [ ] Suit ranks from highest to lowest: Hearts, Diamonds, Clubs, Spades
    - [ ] Bonus: Having four of a kind or 3 pairs in consecutive order can override a single 2

Phase 3: (1 day)

**Objective** Functionality for a single round of play

- [ ] Players can choose to pass, eliminating them from `currentPlayersInRound`
- [ ] Only players in `currentPlayersInRound` can play cards
- [ ] After a round, the last player remaining in `currentPlayersInRound` can play whatever cards they want, as long as it is allowed by `validMove`

Phase 4: (1 day)

**Objective** Get full game cycle and AI working

- [ ] AI will be split into two play styles:
  - [ ] Aggressive: will play any cards if it can
  - [ ] Passive: will hold onto high cards and play more aggressively as hand size drops
- [ ] Winner is the first to have a hand count of 0
