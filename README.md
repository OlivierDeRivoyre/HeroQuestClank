# Overview
This is a card game that can be printed.

The game is designed to be played on a board, typically using games like *HeroQuest* or *Descent* as support. Instead of traditional dice, the rules are modified to be played with cards (and basic D6 dice).

Each player has a deck of cards. Each turn, a player can buy new cards to improve their deck.

# The board game rules:
## Demo
To play test it and try the rules:
https://olivierderivoyre.github.io/HeroQuestClank/

## Setup
- Each player chooses a class (Barbarian, Priest, etc.). Each class has its own use of mana.
- Each player has 7 life points.
- Players receive the same 12 basic cards as a starting deck:
  - 3 cards Diamond
  - 2 cards Attack
  - 2 cards Defense
  - 2 cards Movement
  - 1 card Mana
  - 1 card Peddler ("Colporteur")
  - 1 card Curse
- The game master fills the shop with cards that players can buy for diamonds at the end of their turn. There should be 4 available common cards and 4 random cards.
  - The shop cards are the one with diamonds icons on the top of the card. These diamond is the shop's price of the card.
  - The common cards have a whiter backgound than the uncommon. Thee is many instances of such cards. The common card are always available in the shop.
  - The simple uncommon cards with no text, or basic action, have a basic color.
  - The yellow uncommon cards have special effect.
  - The 'artifact' uncommon cards stays on the table when bought. There effects apply on each turn of the player.
- Each player draws 5 cards.
- On a grid, the Game master place the items representing the player character and the monsters. This is the first room of the dungeon.

## Player Turn Sequence:
- Players can choose the order in which they play.
- During a player's turn:
  - The player rolls 2 dice: one for movement and one for attack.
  - The player can play any number of cards to add dice or trigger other effects.
  - The player chooses which dice are used for movement and which are used for attack.
  - The player moves their character. Diagonal movement is not allowed, but they can move through other players.
  - If adjacent (including diagonally), the player can deal damage to enemies.
  - After attacking, the player can purchase cards from the shop. To do so, the player must have played cards that provide diamonds. A purchased card goes into the player’s discard pile.
  - At the end of the turn, the player draws cards until they have 5 cards in hand. If there are no more cards to draw, the player shuffles their discard pile to form a new draw deck.
- Once all players have completed their turns, the game master plays the monsters.

## Monster Attack Mechanics:
- Monsters move and attack.
- A monster's attack power increases every 2 turns. For example, once a Goblin appears, it deals 1 damage on the first turn, 1 damage on the second turn, 2 damage on the third and fourth turns, 3 damage on the fifth and sixth turns, and so on.
- Players can (and should) negate monster damage using shield cards.
- If a player’s life points reach 0, they are KO and cannot play until the end of the fight.
- If all players are KO, the game is lost.
- At the end of a fight, once there are no more monsters, a KO player can be healed by another player. In this case, the KO player must give a card from their hand to their savior.

## Monster Abilities:
- **Shield**: Damage from players is reduced for monsters with shields. Unlike players, monster shields never exhaust.
- **Stone Heart**: A player must deal a certain amount of damage to destroy each stone heart. For example, a monster with 3 stone hearts and 9 armor requires 3 hits of 10+ damage to be defeated.
- **Ranged Attack**: The monster does not need to be adjacent to hit a player.
- **Circular Attack**: The monster hits all players in the 8 surrounding cells.

 # Links
To play test it and try the rules:
https://olivierderivoyre.github.io/HeroQuestClank/

To print the cards:
https://olivierderivoyre.github.io/HeroQuestClank/cards.html

To emulate a run:
https://olivierderivoyre.github.io/HeroQuestClank/simu.html

# Assets used:
- Gemini
- https://0x72.itch.io/dungeontileset-ii
- https://shikashipx.itch.io/shikashis-fantasy-icons-pack
- https://pipoya.itch.io/pipoya-free-rpg-world-tileset-32x32-40x40-48x48
- https://clockworkraven.itch.io/raven-fantasy-icons
- https://kenmi-art.itch.io/cute-fantasy-rpg
- https://opengameart.org/content/bullet-collection-1-m484
