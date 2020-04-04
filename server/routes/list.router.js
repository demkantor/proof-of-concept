const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  console.log("in server /list/GET");
  const queryText = `SELECT * FROM "list" ORDER BY "id" ASC`;
  pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error on GET query ${error}`);
        res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
  console.log("in server /list/POST with: ", req.body.payload);
  const task = req.body.payload;
  const queryText = `INSERT INTO "list" ("tasks") VALUES ($1)`;
  pool.query(queryText, [task])
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing new task POST', err);
      res.sendStatus(500);
    });
});


router.delete('/:id', (req, res) => {
  console.log("in server /list/DELETE with: ", req.params.id);
   const queryText = `DELETE FROM "list" WHERE id=$1`;
  pool.query(queryText, [Number(req.params.id)])
  .then(() => {
    res.sendStatus(200);
  }).catch(err => {
      console.log("Error deleting task", err);
      res.sendStatus(500);
    });
});


module.exports = router;