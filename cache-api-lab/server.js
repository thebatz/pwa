

const express = require('express');
const appexpress = express();
const https = require('https');
const fs = require('fs');
// // This serves static files from the specified directory
appexpress.use(express.static(__dirname));

// // we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'helloworldhelloworld'
}, appexpress)
.listen(8887);




// const express = require('express');
// const app = express();

// // This serves static files from the specified directory
// app.use(express.static(__dirname));

// const server = app.listen(8081, () => {

//   const host = server.address().address;
//   const port = server.address().port;

//   console.log('App listening at http://%s:%s', host, port);
// });




// const fs = require('fs');

// const options = {
//   key: fs.readFileSync(__dirname + '/localhost-key.pem'),
//   cert: fs.readFileSync(__dirname + '/localhost.pem')
// };

// require('https').createServer(options, (req, res) => {
//   res.writeHead(200)
//   res.end(`Got SSL?`)
// }).listen(443);