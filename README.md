# Welcome To CinemaX!

CinemaX is a web application created for managing a cinema general data such as: movies, users and members, and provides subscriptions management options.


## Application Flow

At first, CinemaX consumes two APIs for initial movies and members data, and integrate it in MongoDB collections.
By the time a user logging into CinemaX, all the data is managed in Redux store as well as in databases, files and other data sources.
From that point, depending on the user premissions we can: 
- Create new movies, members and users.
- Edit & Delete them if necessary.
- Make members to subscribe new movies.
until user decides to log out.


## Appliction Structure

The appliction is built of two REST APIs developed in Python Flask for backend and React.js for frontend.

server-side:
cinemaWS Flask app as the main server, which handling all the system users needs and uses the other server - the subscriptionsWS (another Flask app) - for movies, members & subscriptions related requests.
cinemaWS data sources contain two json files and one database
subscriptionsWS data sources contain one database
Each server is built code layers such as: data, business and routing.

client-side:
React.js application integrated with Redux and Matirial-UI for design.
Uses react-router-dom for routing.