# Goblin Hunter

Goblin Hunter is a platform game made with HTML5 Canvas. It is meant to be played by one or two players on the same computer. 

## Demo  

https://tristan-lanoye.github.io/goblin-hunter/

## Tools

- HTML5, CSS3, JS
- Sass / Compass

## Installation 

If you want to play around with the code :

1. Clone the repo : `git clone https://github.com/tristan-lanoye/goblin-hunter.git`
2. Change directory : `cd goblin-hunter`
3. Watch files : `compass watch`
4. Launch project : `open index.html`

## Features

### Homepage

- A canvas unrelated to the game is present in the background, to add some colors and movement
- Choosing single player or multiplayer mode dynamically brings selection box using CSS transform (Scale)
- It is not possible to enter the game unless the user specified a game mode and chose a character

## Game 

- Characters and enemies are animated using spritesheets
- Life is visible in the form of hearts that follow the character
- Player is invincible for a short period of time after getting hit
- Enemies spawn on a regular basis 
- Player can shoot bullets with a bow, strike with a sword
- Small particles appear when character lands on surface, to give feeling of weight
- Game keeps track of score and time using Session Storage 