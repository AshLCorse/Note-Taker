const fb = require(`express`).Router();

//helper for unique ids
const uuid = require(`../helpers/uuid`);

//helper for reading and writing to json
const { readFromFile, readAndAppend } = require(`../helpers/fsUtils`);

//GET route for retreiving all the notes
fb.get(`/`, (req, res) => {
  console.info(`${req.method} request recieved for note`);
  readFromFile(`./db/notes.json`).then((data) => res.json(JSON.parse(data)));
});

//POST route for creating a new note
fb.post(`/`, (req, res) => {
  //log that a POST request pas recieved
  console.info(`${req.method} request received for note`);
  //deconstructuring assignment for items in req.body
  const { title, text } = req.body;

  // if all require properties present
  if (title && text) {
    //generate a unique id for the note
    const newNote = { note_id: uuid(), title, text };

    readAndAppend(newNote, `./db/notes.js`);

    const response = {
      status: `success`,
      body: newNote,
    };

    res.json(response);
  } else {
    res.json(`Error in posting note`);
  }
});
