5/2022: Please note that the requirements for use of the Songkick API have recently changed. I'm currently in the process of getting a new, working API key, and making sure the project meets the new requirements. This should be back up by mid-May, 2022.

This project was bootstrapped with Create React App (https://github.com/facebook/create-react-app).

Gigue

This project was built by Molly Novash and Alicja Wolak.

Gigue allows you to enter a zip code, and through a series of simple API calls to Google Maps API and Songkick API, it builds a list of music events happening in the area in the near future, displayed chronologically.

Each event displays the artist, supporting artist(s), venue, location, and date of the show. From there, you have the option of being directed to an external website to purchase tickets, or of exploring songs by that particular artist. If you choose the second option, the page rerenders to display the artist's top 3 songs on iTunes, with a playable preview of the song and some track information, from the iTunes API.

To run the application in development mode:

In the project directory, run `npm start`
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

NOTE:

You'll need to install npm if you don't have it already.

First, try running 'npm start' in the project directory. If you get an error relating to react-scripts, do the following:

    Delete the entire 'node_modules' folder
    Delete package-lock.json
    Run 'npm install'
    Run 'npm start'

Other available scripts
npm test

Launches the test runner in the interactive watch mode.
See the section about running tests(https://create-react-app.dev/docs/running-tests/) for more information.
npm run build

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment (https://create-react-app.dev/docs/deployment/) for more information.
npm run eject

Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
Learn More

You can learn more in the Create React App documentation (https://create-react-app.dev/docs/getting-started/).

To learn React, check out the React documentation(https://reactjs.org/).
Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting
Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size
Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration
Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
npm run build fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

Features to be added:
-back buttons on events page and artist pages
-cards all the same size on artist pages
-remove "Track" from track name on artist pages
-multiple sample tracks can be played at once- check if one is playing and pause it if another one starts playing
-get rid of stats on the events page
-add some more info to the events page cards, like genre, at minimum
-make events page look nicer
-fix header so the padding on the bottom isnt so huge
-add link to purchase tickets to individual artist pages

in the future:
-make user accounts? so users can like particular shows to keep track of them
    -also let users like particular artists and get email or text notifications when they come to whatever zip code the user has listed as "home"
        -maybe allow multiple 'home' zip codes
