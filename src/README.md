### This stipuates the full specifications as given to me

## React Native Minesweeper

Build a minesweeper in React Native (https://en.wikipedia.org/wiki/Minesweeper_(video_game)).
The two important things are:

- that it’s easy to build and test it
- that you send us a link to a Github repository with your code.

We think minesweeper is a pretty good test because the scope is small but it touches many different aspect of game programming :

- user interface
- algorithm
- code architecture
- coding style

It doesn't have to be pretty, we're mostly testing the functionality and the code.

Special requirement for the test:
When the user wins or loses, a popup should appear at the end, saying "You Win" or "You Lose", and a button saying "Retry". When you tap on it, the game should restart.
The popup should also be animated in the following way:

- EaseOut, 1s duration, from bottom of the screen to the center
- When arriving at the center of the screen, scale up (1.4) and down (1) the popup (like a pulse) for 500ms.

Let me know if you have any question