const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Route includes
const listRouter = require('./routes/list.router');


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/list', listRouter);


/** ---------- START SERVER ---------- **/
/** Listen * */
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });