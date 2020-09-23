// import React from "react";
// export default class events extends React.Component {
//   render() {
//     return (
//       <button onClick={events.publish('clicked-button')}>Toggle Visibility</button>
//     );
//   }
// }

/*
This is a file that likely would usefully exist if the structure of the program was different (and perhaps it should be).
But since it's not doing that, may as well have it be a text list of all the publish/subscribe events and where they're used.
ModeBriMegAman.js (ModeWhoseTurn.js may have similar functionality, or may be used for entirely unrelated testing purposes.)
    PubSub.subscribe('join-leave-button', this.joinLeaveGame);
    PubSub.subscribe('player-turn-update', this.playerTurnUpdate);
    PubSub.subscribe('player-turn-in-minigame-update', this.playerMinigameUpdate);
    PubSub.subscribe('join-leave-minigame-button', this.joinLeaveMinigame);
    PubSub.subscribe('minigame-ended', this.minigameEnded);
    PubSub.subscribe('admin-update', this.adminChanged);
    PubSub.subscribe('card-claimed-button', ModeBriMegAman.cardClaimed);
    PubSub.subscribe('player-level-update', this.levelUpdate);
    PubSub.subscribe('set-card-timer', this.cardTimerUpdate);
    PubSub.publish('pass-turn-button', this.state.name)
    PubSub.publish('join-leave-button', 'leave')
    PubSub.publish('card-claimed-button', this.state.name)
    // PubSub.publish('pass-minigame-turn-button', this.state.name) //Removed in favor of a websockets call
    PubSub.publish('join-leave-minigame-button', "leave")
    PubSub.publish('join-leave-minigame-button', "enter")
    PubSub.publish('join-leave-button', 'enter')
    PubSub.publish('minigame-players-update', message.players);
    PubSub.publish('player-turn-in-minigame-update', dataFromServer.playerName);
    PubSub.publish('minigame-ended'); //Used when receiving new data of minigame players, but the player list is null

AdminMenu.js
    PubSub.subscribe('end-minigame-button', AdminMenu.endMinigame);
    PubSub.subscribe('player-list-update', this.playerUpdate);
    PubSub.subscribe('add-question', this.addCard)};
    PubSub.publish('minigame-ended');
    PubSub.publish('pass-turn-button', this.state.name)
    // PubSub.publish('pass-minigame-turn-button', this.state.name) //Removed in favor of a websockets call
    PubSub.publish('end-minigame-button', this.state.name)
    PubSub.publish('set-card-timer', this.state.cardTimer)
    PubSub.publish('add-question', "mind", this.state.admin, this.state.question, this.state.answer)}

AnimatedCardClaim.js
    PubSub.subscribe('card-claimed-button', this.cardClaimedAnimation);

CurrentNames.js
    PubSub.subscribe('minigame-players-update', this.minigamePlayers);
    PubSub.publish('player-list-update', this.state.playersInGame);
    PubSub.publish('admin-update', result.toString());
    PubSub.publish("minigame-ended");
    PubSub.publish('player-has-won');
    PubSub.publish('player-level-update', (result.cards/3)+1);

EndGameAnimation.js
    PubSub.subscribe('player-has-won', this.gameOver);

WhoseTurn.js
    PubSub.subscribe('pass-turn-button', WhoseTurn.turnPassed);
    PubSub.publish('player-turn-update', result);

WhoseTurnInMinigame.js
    // PubSub.subscribe('pass-minigame-turn-button', WhoseTurnInMinigame.turnPassed); //Removed in favor of a websockets call
    PubSub.subscribe('player-turn-in-minigame-update', WhoseTurnInMinigame.updateMiniTurn);
    // PubSub.publish('player-turn-in-minigame-update', result); //Used when getting a polling response; not used with websockets.

 */