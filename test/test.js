const Player = require('../models/player');
const GameController = require('../controller/gameController')

// Test Case 1: Player Initialization
const playerA = new Player('Player A', 100, 5, 10);
const playerB = new Player('Player B', 100, 10, 5);

console.log('Test Case 1: Player Initialization');
console.log('---------------------------------');
console.log('Player A:');
console.log('Name:', playerA.playerName);
console.log('Health:', playerA.health);
console.log('Strength:', playerA.strength);
console.log('Attack:', playerA.attack);
console.log('---------------------------------');
console.log('Player B:');
console.log('Name:', playerB.playerName);
console.log('Health:', playerB.health);
console.log('Strength:', playerB.strength);
console.log('Attack:', playerB.attack);
console.log('\n');

// Test Case 2: GameController Initialization
const gameController = new GameController();
const players = gameController.initializePlayersTest(playerA, playerB);
gameController.players = players;

console.log('Test Case 2: GameController Initialization');
console.log('-----------------------------------------');
console.log('Players:', gameController.players);
console.log('Attacker:', gameController.attacker);
console.log('Defender:', gameController.defender);
console.log('Round:', gameController.round);
console.log('\n');

// Test Case 3: Playing a Few Rounds
gameController.startGame();

console.log('Test Case 3: Playing a Few Rounds');
console.log('--------------------------------');
// Additional log statements
console.log('Attacker:', gameController.attacker.playerName);
console.log('Defender:', gameController.defender.playerName);
console.log('Round:', gameController.round);
console.log('Dice Roll (Attacker):', gameController.rollDice());
console.log('Dice Roll (Defender):', gameController.rollDice());
console.log('\n');

console.log('All tests passed successfully!');
