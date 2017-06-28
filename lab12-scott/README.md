##Express Middleware##

**Author**
Scott McCoy

**Description**

*how to install*
Clone the repository
Run in console
  npm i
  npm run lint

*how to start server*
Run in console
  npm run start

*how to turn db on/off*
Run in console
  npm run start-db
  npm run stop-db

*routes*
POST: 3 requests made by superagent that will create a new hike successfully, return a 400 if bad content is passed in, and return a 409 if a duplicate value is identified.
GET: 2 request made by superagent that will retrieve a hike in the db and send a 404 if the id is not found.
PUT: 3 requests made by superagent that will update a hike in the db, return a 400 if bad content is passed in, and return a 409 if a duplicate value is identified.
DELETE: 2 requests made by superagent that will delete a hike in the db or return a 404 if the id is not found.
