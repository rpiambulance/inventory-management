# ITWS-group1-section2
ITWS Web Science Group 1 Section 2

Members: Logan Ramos, Andrew Qu, Jeff Fang, Jelly Wang

To run please ensure you have Docker, Docker-Compose, and NPM on your system.

This inventory website utilizes the latest Node.js version, latest Angular version, and latest MongoDB version.

In the root directory run docker-compose up. The first time you use it, it will take quite awhile as it fetches all the packages.
If you would like to not have red squigglys in your code editor then I recommend you run npm install in angular-app and express-server so that 
your code editor is able to find the packages, however, this is not necessary.

After your docker has started any changes you make will auto update and restart the necessary servers.

Angular Server: localhost:4200
Express Server: lobaclhost:3000
MongoDB: localhost:27017
Mongo's Express interface (sort of like PhpMyAdmin): localhost:8081