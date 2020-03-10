const express = require("express");

const Posts = require("../data/db.js");

const router = express.Router();

//POST request to create a post
router.post("/", (req, res) => {

    const createdPost = req.body;

    if (!createdPost.title || !createdPost.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        });
    }
    else {
        Posts.insert(req.body)
        .then(post => {
            console.log(post)
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "There was an error while saving the post to the database. "
            })
        })
    }

})

//POST a comment to a post
router.post("/:id/comments", (req, res) => {
    const userRequested = req.params;
    const createdComment = req.body;

    const foundUser = users.find(user => user.id === userRequested.id); //<---- issue. how to get our "array" of posts here?

    if (!foundUser) {
        res.status(404).json({message: "The post with the specified ID does not exist. "})
    }
    else if (!createdComment.text) {
        res.status(400).json({errorMessage: "Please provide text for the comment. "})
    }
    else {
        
        Posts.insertComment(req.body)
            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(error => {
                // log error to database
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the comment to the database",
                });
            });
    }

  });


  //GET request to get all posts
  router.get("/", (req, res) => {
    Posts.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: "The posts information cold not be retrieved. ",
        });
      });
  });



module.exports = router;