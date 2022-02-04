const express = require("express");
const http = require("http");
const passport = require("passport");
const IpfsCreator = require('./routes/ipfs-creator');
let myfunc = require('./export/export.js');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const { async } = require("recursive-fs/lib/copy");

var connection_string = "**********";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(async (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next();

})
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// // our server instance
app.use(IpfsCreator);

const server = http.createServer(app);
/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */
server.listen(port, () => console.log(`Listening on port ${port}`));
