const express = require('express');

const db = require('./postDb');

const router = express.Router();
//=================================================================================================
router.get('/', (req, res) => {
  db.get(req.query)
    .then(go => {
      res.status(200).json(go);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'error retrieving the database'
      });
    });
});
//=================================================================================================
router.get('/:id', validateUserId,( req, res ) => {
  res.status(200).json(req.go);
});
//=================================================================================================
router.delete('/:id', validateUserId, ( req, res ) => {
  db.remove(req.params.id)
    .then( count => {
      if (count > 0) {
        res.status(200).json({ message: 'The database has been nuked'});
      } else {
        res.status(404).json({ message: 'The database could not be found'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error removing the db', err});
    });
});
//=================================================================================================
router.put('/:id', validateUserId, ( req, res ) => {
  db.update(req.params.id, req.body)
    .then(go => {
      if (go) {
        res.status(200).json(go);
      } else {
        res.status(404).json({ message: 'The database could not be found'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error updating the database', err});
    });
});
//=================================================================================================

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
  const {id} = req.params;
  db.getById(id)
    .then(go => {
      if(go) {
        req.go = go;
        next();
      } else {
        res.status(404).json({message: 'does not exist'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'exception', err})
    });
}


module.exports = router;
