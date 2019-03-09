# Trivia-Game

## A test of crucial knowledge...
Prepare yourself for the most dangerous game...wait, no, this is just a trivia game. The game runs over all of the currently loaded questions (currently 6), and gives you your final score and the option to play again. Warning, the questions are all ridiculous and not anything any sane human should be reasonably expected to know.

## Technologies 
The layout was built on Bootstrap, and the game logic makes extensive use of JQuery to select, modify, and update css and DOM elements. 

## Game structure
The game is driven by user clicks, either on the timer/prompt field, or on the answers. These clicks modify the gameState variable in order to keep track of what's happening, when the game should be move forward, timers set, restart offered, etc.