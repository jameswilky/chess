# Chess Game

This objective of this project to practice my vanilla javascript and OOP skills, without the help of any libraries or tutorials.

# User Stories
1. ~~Create a 8*8 black and white Grid~~
2. ~~Create chest pieces that start in correct location~~
3. Have a turn system allowing each player to perform 1 move before starting the next turn
4. Allow game to terminate once king dies
5. Allow game to display which pieces have been removed from the game
6. ~~Program each chest piece to move the correct amount of spaces~~
7. ~~Program each chest piece to not be able to land on friendly pieces~~
8. Program each chest piece to not be able to move through enemy/friendly pieces unless the piece is allowed to do so (i.e. Knight)
9. When clicking on a piece, display the places in which the piece can move
10. Give the AI the ability to randomly move one piece in any legal direction on its turn
11. Allow pawns to move two spaces from start location
12. Allow pawns the get to the end of the opposing board to revive the queen


# Sprint 1:
  User stories: ~~1~~,~~2~~,~~6~~,~~7~~ - Complete
  ## Post Sprint Report
  As ive developed the program ive noticed that it is becoming increasingly complex. Moving forward it may be a better strategy to either use a game loop that constantly draws the board, then the movement tiles, then the chess pieces. Otherwise, i could use multiple canvas layers which hide and show through the game loop.

  Multiple Layers method:
  1. Background will be handled with HTML draw a rectangle representing the background. Later this will hold the score board and the dead pieces, and other UI elements
  2. Canvas layer 0, is drawn once and represents the chess board where pieces can move.
  3. Each turn, the playable moves are calculated
  4. Canvas layer 1 draws a marker once the respective chest piece is hoveered over
  5. Canvas layer 2 holds the chest pieces which is rendered at the begining of each turn, and constantly re-renders while the mouse is held down and a chessman is selected


# Sprint 2:
  User stories: 3,4,5,10
# Sprint 3:
  User stories: 8,9,11,12

