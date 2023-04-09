// index.js
// where your node app starts
// require environment variables
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let date;
  if (req.params.date === undefined) {
    date = new Date();
  } else if (!isNaN(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const PORT = process.env.PORT || 3000;

// listen for requests :)
var listener = app.listen(PORT, () => {
  console.log(`Timestamp microservice is listening on port http://localhost:${listener.address().port}/`);
});
