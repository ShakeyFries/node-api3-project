const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});
//=================================================================================================
router.post('/:id/posts', (req, res) => {
  // do your magic!
});
//=================================================================================================
router.get('/', (req, res) => {
  // do your magic!
});
//=================================================================================================
router.get('/:id', (req, res) => {
  // do your magic!
});
//=================================================================================================
router.get('/:id/posts', (req, res) => {
  // do your magic!
});
//=================================================================================================
router.delete('/:id', (req, res) => {
  // do your magic!
});
//=================================================================================================
router.put('/:id', (req, res) => {
  // do your magic!
});
//=================================================================================================

//custom middleware

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

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
