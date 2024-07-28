## Hangman game solution

This is a solution to the [Hangman game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/hangman-game-rsQiSVLGWn). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Game behaviour](#game-behaviour)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Learn how to play Hangman from the main menu.
- Start a game and choose a category.
- Play Hangman with a random word selected from that category.
- See their current health decrease based on incorrect letter guesses.
- Win the game if they complete the whole word.
- Lose the game if they make eight wrong guesses.
- Pause the game and choose to continue, pick a new category, or quit.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.
- Navigate the entire game only using their keyboard.

### Game behaviour

- Game starts picking a random word from the chosen category.
- If the player guesses correctly, all relevant spaces are filled and the letter on keyboard will be disabled.
- If the player guesses incorrectly, the letter will be disabled and the health bar reduced. The health bar will be empty after eight wrong guesses and the player loses at this point and the menu appears.
- If the player wins, the menu appears.
- Selecting "play again" on the menu starts a new game with the same category, if there are selectable options, otherwise the player is redirected to categories to pick a new one, and the all categories are reloaded.
- Selecting "new category" navigates to the "pick a category" page and reload categories.
- Quitting navigates back to the main menu and reload categories.
- Clicking the hamburger menu during a game should show the "paused" menu.

### Screenshot

![https://hangman-game-fg.netlify.app/](./screenshot.jpg)

### Links

- Solution URL: [https://github.com/FerdinandoGeografo/hangman-game](https://github.com/FerdinandoGeografo/hangman-game)
- Live Site URL: [https://hangman-game-fg.netlify.app/](https://hangman-game-fg.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- SASS following 7-1 pattern and BEM conventions
- Flexbox
- CSS Grid
- Desktop-first workflow
- [Angular](https://angular.dev/) - JS Framework
- [RxJS](https://rxjs.dev/) - JS Library
- [NgRx](https://ngrx.io/guide/signals) - For signal based State Management in Angular

### What I learned

During this Frontend Mentor challenge called Hangman Game, I had the opportunity to delve into the new features introduced by the Angular framework with release of version 18. This project allowed me to explore and apply advanced tools from the Angular ecosystem that I had never used before, significantly enhancing the UX of the application.

- [Angular Animations](https://angular.dev/guide/animations) : I integrated this package that allows adding animations and transitions based on particular application states. This feature gave a dynamic and interactive touch to the Hangman game, enhancing the UX, examples of the usage in the app are:

  - Animation switching between routes
  - Animation of a guessed letter that flips in showing the letter
  - Animation of the menu on open and close.

- [NgRx](https://ngrx.io/guide/signals) : For state management, I chose to use NgRx Signal. This standalone library provides a reactive solution for managing global and local state through a series of utilities built on top of Angular Signals. Thanks to NgRx, I was able to maintain a well-organized folder structure and ensure total decoupling between the application's logic and application's view and data rendering. The logic was defined declaratively and provided as a service to the application, while data rendering and management of input events from the UI were handled through smart and dumb components.

During the development, I gained a lot of practice in creating shared reusable component. For example, I designed a versatile ButtonComponent that could be used both as a button ,to trigger specific actions on click, and as a link for redirects, maintaining the correct semantic of these elements.

Another example of a reusable component is the Menu of the game: to allow customization of the menu sections ,like header and content items, I opted for composition using ng-template, defining and exposing references to this composable templates via structural directives. This made the menu highly flexible and adaptable to different use cases needs.


