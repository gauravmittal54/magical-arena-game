// main.js - Entry point
const GameController = require('./controller/gameController');

// Initialize game controller
const gameController = new GameController();

// Start the game
(async () => {
    const players = await gameController.initializePlayers();
    gameController.players = players;
    gameController.startGame();

    console.log('Game ended');
})();
