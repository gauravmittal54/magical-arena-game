// gameController.js - Controller
const readline = require('readline');
const Player = require('../models/player');

class GameController {
    constructor() {
        this.players = [];
        this.attacker = null;
        this.defender = null;
        this.round = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    startGame() {
        this.players.sort((a, b) => a.health - b.health);
        [this.attacker, this.defender] = this.players;
        this.playTurn();
    }

    playTurn() {
        this.round++;
        console.log(`\n*****************************`);
        console.log(`********** Round ${this.round} **********`);
        console.log(`*****************************\n`);

        const attackingDiceOutcome = this.rollDice();
        const defendingDiceOutcome = this.rollDice();

        const attackDamage = this.attacker.calculateDamage(attackingDiceOutcome);
        const defendDamage = this.defender.strength * defendingDiceOutcome;

        const damageTaken = Math.max(0, attackDamage - defendDamage);
        this.defender.takeDamage(damageTaken);

        console.log(`${this.attacker.playerName} attacks ${this.defender.playerName}`);
        console.log(`Attacking Dice Roll: ${attackingDiceOutcome}, Defending Dice Roll: ${defendingDiceOutcome}`);
        console.log(`Attack Damage: ${attackDamage}, Defend Damage: ${defendDamage}`);

        if (damageTaken === 0) {
            console.log(`No damage! ${this.defender.playerName} Health remains unaffected.`);
        } else {
            console.log(`${this.defender.playerName} Health reduced by ${damageTaken}.`);
        }

        console.log(`${this.defender.playerName} Health: ${this.defender.health}\n`);

        if (this.defender.isAlive()) {
            [this.attacker, this.defender] = [this.defender, this.attacker];
            this.playTurn();
        } else {
            console.log(`*****************************`);
            console.log(`${this.attacker.playerName} Wins the game.`);
            console.log(`*****************************`);
            this.rl.close();
        }
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    async getPlayerInput(playerNumber, attribute) {
        return new Promise((resolve) => {
            this.rl.question(`Enter ${attribute} for Player ${playerNumber}: `, (answer) => {
                if (attribute === 'name') {
                    resolve(answer.trim()); // Trim any leading/trailing spaces for names
                } else {
                    const numericValue = parseInt(answer, 10);
                    if (!isNaN(numericValue)) {
                        resolve(numericValue);
                    } else {
                        console.log(`Invalid input. Please enter a valid number for ${attribute}.`);
                        this.getPlayerInput(playerNumber, attribute).then(resolve);
                    }
                }
            });
        });
    }

    async initializePlayers() {
        const playerNameA = await this.getPlayerInput('A', 'name');
        const healthA = await this.getPlayerInput('A', 'health');
        const strengthA = await this.getPlayerInput('A', 'strength');
        const attackA = await this.getPlayerInput('A', 'attack');

        const playerNameB = await this.getPlayerInput('B', 'name');
        const healthB = await this.getPlayerInput('B', 'health');
        const strengthB = await this.getPlayerInput('B', 'strength');
        const attackB = await this.getPlayerInput('B', 'attack');

        return [new Player(playerNameA, healthA, strengthA, attackA), new Player(playerNameB, healthB, strengthB, attackB)];
    }
}

module.exports = GameController;
