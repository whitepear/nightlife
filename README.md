This project is live at: https://immense-island-28217.herokuapp.com/

Responsively-designed full-stack application that allows users to track nightlife activity in their area. Users can search for a town or city, and receive a list of bars local to that area. Each venue entry contains related information, including the number of users planning to attend the bar that particular night. Authenticated users can add themselves to the count of those attending.

This application consists of a user-interface written with React.js, an Express API server, and a MongoDB database consisting of two collections. The application receives JSON data from the *[Yelp API](https://www.yelp.com/developers/documentation/v2/overview)* in order to generate city-specific venue information. The front-end architecture is structured around stateful container components, within which stateless functional components render UI. Front-end routing is handled by React-Router. Database operations within the Express server are mediated by the official MongoDB Node.js driver. A time-to-live index placed on one of the database collections ensures that venue records (which track venue attendee numbers) are deleted at 5am daily.

Express-Session and Connect-Mongo manage session-storage within the database. User passwords are hashed and salted using bcrypt, whilst user input is sanitized via Sanitize-Html. Application styling is achieved through the use of modular Sass stylesheets.

Note: This application is hosted on Heroku. Please allow a few seconds for the hosting server to wake up when attempting to view it live.
