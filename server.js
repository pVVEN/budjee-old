//used for testing app in browser
//To run...
//1. Open NodeJS terminal
//2. Browse to project folder
//3. Run:
//    node server.js
//4. Open browser
//5. Go to http://localhost:8080/

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);