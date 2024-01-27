// player.js - Model
class Player {
    constructor(playerName, health, strength, attack) {
        this.playerName = playerName;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    calculateDamage(diceOutcome) {
        return this.attack * diceOutcome;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    isAlive() {
        return this.health > 0;
    }
}

module.exports = Player;
