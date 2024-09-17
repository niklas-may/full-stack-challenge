# Full Stack Challenge

## Installation

Use pnpm as the package manager. Check `.nvmrc` for correct node vesion or run `nvm use`. Run first install from the root.

```bash
pnpm install
```

## Chalenge

### Objective

Jackpot! You've landed a summer gig in Las Vegas! Unfortunately, it's 2020, and the casinos are closed due to COVID-19. Your boss wants to move some of the business online and asks you to build a full-stack app — a simple slot machine game, with a little twist. Build it to ensure that the house always wins!

### Brief

When a player starts a game/session, they are allocated 10 credits.
Pulling the machine lever (rolling the slots) costs 1 credit.
The game screen has 1 row with 3 blocks.
For players to win the roll, they have to get the same symbol in each block.
There are 4 possible symbols: cherry (10 credits reward), lemon (20 credits reward), orange (30 credits reward), and watermelon (40 credits reward).
The game (session) state has to be kept on the server.
If the player keeps winning, they can play forever, but the house has something to say about that...
There is a CASH OUT button on the screen, but there's a twist there as well.

### Tasks

-   The Client-Server Communication is to be implemented using REST
-   A template for both backend and frontend is provided in the respective subfolders. Feel free to use it - or setup your own.
-   When a user opens the app, a session is created on the server, and they have 10 starting credits.

-   **Server-side:**

    -   When a user has less than 40 credits in the game session, their rolls are truly random.
    -   If a user has between 40 and 60 credits, then the server begins to slightly cheat:
        -   For each winning roll, before communicating back to the client, the server does one 30% chance roll which decides if the server will re-roll that round.
        -   If that roll is true, then the server re-rolls and communicates the new result back.
    -   If the user has above 60 credits, the server acts the same, but in this case the chance of re-rolling the round increases to 60%.
        -   If that roll is true, then the server re-rolls and communicates the new result back.
    -   There is a cash-out endpoint that moves credits from the game session to the user's account and closes the session.
    -   Write tests for your business logic

-   **Client side:**
    -   Include a super simple, minimalistic table with 3 blocks in 1 row using CSS Grid.
    -   Include a button next to the table that starts the game.
    -   The components for each sign can be a starting letter (C for cherry, L for lemon, O for orange, W for watermelon).
    -   After submitting a roll request to the server, all blocks should enter a spinning state (can be 'X' character spinning).
    -   After receiving a response from the server, the first sign should spin for 1 second more and then display the result, then display the second sign at 2 seconds, then the third sign at 3 seconds. Make sure the result from the server is not visible earlier then the delayed "animation" reveals it.
    -   If the user wins the round, their session credit is increased by the amount from the server response, else it is deducted by 1. Make sure the credit is only updated after the slot "animation" is finished to avoid spoiling the player.
    -   The roll button should not be clickable until the character spinning "animation" is finished, so the player can not fire another roll request after the previous request was successful.
    -   Include a button on the screen that says "CASH OUT", but when the user hovers it, there is a 50% chance that the button moves in a random direction by 300px, and a 40% chance that it becomes unclickable (this roll should be done on the client-side). If they succeed to hit it, credits from the session are moved to their account.
    -   Bonus: If you are using `react-query` for client-side server state management (queries and mutations), then come up with an idea / concept of how to design mutations in a type-safe manner which avoid accedently overwriting existing query cache keys with the wrong data type.

### Language and Frameworks

-   Both Backend and Frontend Implementations should be done in Typescript
-   Frontend Code should use the React Framework, while Backend Code should use the Express Framework
-   You are free to use other libraries to facilitate the development (Next, React-Query, Jest, ...)

### Evaluation Criteria

-   Completeness: did you complete the features as briefed?
-   Correctness: Does the solution perform in sensible, thought-out ways?
-   UX: Does the frontend offer a sophisticated user experience without any bigger UX design flaws
-   Maintainability: is the code written in a clean, maintainable way?
-   Testing: was the system adequately tested?

### Code Submission

Please organize, design, test, and document your code as if it were going into production.
Ideally, you should work with Git and provide the solution as a link to the repository on GitHub. Please make sure your implementation lives on the `main` branch.

All the best and happy coding,

The Pricenow Team
