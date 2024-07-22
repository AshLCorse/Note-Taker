const router = require(`express`).Router();

//require routes
const notesRouter = require(`./notes`);

router.use(`/notes`, notesRouter);

module.exports = router;
