const express = require(`express`);
const path = require(`path`);
const api = require(`./routes/index`);

const PORT = process.env.port || 3001;

const app = express();

const middleware = (req, res, next) => {
  //ANSI escape code that instructs the terminal to print in yellow
  const yellow = `/x1b[33m%s/x1b[0m`;

  //log out the request type and rescource
  console.log(yellow, `${req.method} request to ${req.path}`);

  //built in express method to call next middleware in the stack
  next();
};

//middleware for parsing json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to serve up static assets from public folder
app.use(express.static(`public`));

//send all requests that begin with /api to the index.js in the routes folder
app.use(`/api`, api);

app.get(`/`, (req, res) =>
  res.sendFile(path.join(__dirname, `/public/index.html`))
);

app.get(`/notes`, (req, res) =>
  res.sendFile(path.join(__dirname, `/public/notes.html`))
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
