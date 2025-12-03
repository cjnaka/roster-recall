# Roster Recall 

Roster Recall is an interactive sports trivia game built with React. Users select a professional sports team and race against a 60-second clock to name as many current players on the roster as possible before time runs out. The application has real-time data validation, user authentication, and a user high-score system.

## Tech Stack
* **Frontend:** React, Vite
* **Styling:** CSS Modules / Standard CSS
* **API:** TheSportsDB (free version for fetching teams and live rosters, came with restrictions which are mentioned in "Known Issues" below)
* **Backend:** Firebase Auth & Firestore 

## Key Features 
* **League & Team Selection:** Dynamic fetching of team rosters based on selected league.
* **Game Logic:** 60-second countdown timer.
* **Player Name Logic:** Handles accents and case-sensitivity (e.g., "Dončić" matches with "doncic")
* **Visual Feedback:** Input box shakes and turns red on an incorrect guess; successes have green color and animation for the player name.
* **User Accounts:** Sign-up/Login functionality using firebase.
* **High Scores:** Saves best runs to firestore and then displays them on a separate dashboard.
* **Debug Option:** Displays a "Show Roster" toggle to verify API data being grabbed during testing.

## Pages
* **Home Page**
* **Game Page**
* **High Score Page**
* **Login Page**

## Known Issues
Using the free version for TheSportsDB only gives me access to a maximum of 10 players from each of the professional rosters. As a result, the pool of players that the user is guessing from is a randomly selected 10 from each roster. Using the "Show Roster" toggle, the user can view which 10 those are. Ideally, I would want full rosters for this project, but this was how I was restricted to stay on the free version of the API.

## AI Statement
I used Google Gemini when I had issues grabbing the API and using the data from it, mainly with looking into each league and displaying the teams. I also received helped to figure out the "shake" animation when the user got a guess wrong, it was a feature I didn't know how to implement and AI helped me with that. AI also helped me blur the background at the end of the game page when the score pops up, this was to signal that the round was over. I also had an issue displaying the names of the teams in the history of games and AI helped me display the team names, rather than their team IDs from the API. The last thing I had AI help me with was reading in the old high scores from Firestore, allowing that information to be updated within the High Scores page.

## Personal Reflection
During the project, I learned how important it is to plan out my projects. I initially tried to attack it by creating all the files immediately which was very unorganized. I then attacked it by drawing out the file tree structure that I wanted which included all the pages, components, css, and such. This helped me look at what I was trying to do and the steps I needed to take in order for each page to be accomplished. This also helped me learn the importance for organization when it comes to these files and being able to easily access each file needed.

Additionally, I learned a lot about working with React's components. Building the game page made me learn how to work with multiple complex pieces of state like tracking user input, managing the countdown timer, and validating the guesses. 

Another thing I learned was to slow my thinking process down. To start out I had a very good idea of how I wanted my application to look, work, and function. Upon building it, I struggled to keep it moving and editing the styles. I learned that I should start out with the basic functionality of it and then once that is working smoothly, I can move on to design the looks how I prefer. I also didn't realize the scope of how fancy some of the designs could get, especially when I implemented the shake effects on the wrong answers.

## Discussion
Overall, this project helped me develop my web development skills by just working with the tools. It was cool to think of ideas and then learn how to make them come to life. I never knew how storing user information worked, but now I was able to see what I feel like was behind the curtain with Firebase Auth managing the account and then Firestore managing the data that the account/user produces.