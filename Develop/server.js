const express = require(`express`);
const path = require(`path`);
const api = require(`./routes/index`);

const port = process.env.port || 3001;

const app = express();

//middleware for parsing json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to serve up static assets from public folder
app.use(express.static(`public`));

//send all requests that begin with /api to the index.js in the routes folder
app.use(`/api`, api);

app.get(`*`, (req, res) =>
  res.sendFile(path.join(__dirname, `/Develop/public/index.html`))
);

app.get(`/notes`, (req, res) =>
  res.sendFile(path.join(__dirname, `/Develop/public/notes.html`))
);
