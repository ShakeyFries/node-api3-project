const express = require('express');
const User = require('./userDb');
// const Posts = require('../posts/postDb');

const router = express.Router();

router.use((req,res,next) => {
  console.log('User Router!');
  next();
});

//============================= Post =================================================
router.post('/', (req, res) => {
  const comment = {...req.body, user_id: req.params.id};

  console.log(comment);

  User.insert(comment)
    .then(use => {
      if(use) {
        res.status(201).json(comment);
      } else {
        res.status(404).json({
          errorMessage: `The post with the specified ID does not exist`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error adding to the database',
      });
    });
});;
//================================ Post Id ================================================
router.post('/:id/users', ( req,res ) => {
  const usersInfo = {...req.body, user_id: req.params.id };

  User.add(usersInfo)
    .then(user => {
      res.status(210).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error getting the users!',
      });
    });
});
//================================= Get =======================================================
router.get('/:id/posts', validatePost, ( req,res ) => {
  res.status(200).json(req.use);
});
//=================================================================================================
router.get('/', (req, res) => {
  User.get(req.query)
    .then(use => {
      res.status(200).json(use);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users'
      });
    });
});
//=================================================================================================
router.get('/:id', validateUserId, ( req, res ) => {
  res.status(200).json(req.use);
});
//=================================================================================================
router.delete('/:id', ( req, res ) => {
  User.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'This user has been nuked'});
      } else {
        res.status(404).json({message: 'The user could not be found'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub'
      });
    });
});
//=================================================================================================
router.put('/:id', (req, res) => {
  User.update(req.params.id, req.body)
    .then(use => {
      if (use) {
        res.status(200).json(use);
      } else {
        res.status(404).json({message: 'The user could not be found'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updated the user',
      });
    });
});
//=================================================================================================

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  
  User.getById(id)
    .then(use => {
      if(use) {
        req.use = use;
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
  const body = req.body;
  const { name } = body;

  if(!body) {
    res.status(400).json({message: "user error"});
  }
  if (!name) {
    res.status(400).json({message: "user error"});
  }
  next();
}

function validatePost(req, res, next) {
  const {id} = req.params;
  
  User.getUserPosts(id)
    .then(use => {
      if(use) {
        req.use = use;
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
