// Here we make the connection to the database.
// All the database requests are going to be managed here.

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb+srv://omkardesai901:omkardesai901@cluster0.dviossl.mongodb.net/videoplayer";
mongoose.Promise = global.Promise; // This is just to avoid the warnings that mongoose is going to throw at us.

//Here we make the actual connection to the datasbase.
mongoose.connect(db).then(() => console.log('Connection Successful'))
.catch((err) => console.log("Error!" + err)) 

// router.get('/', function(req, res) {
//     res.send('api works');
// })

// To fetch all the videos
router.get('/videos', function(req, res) {
    console.log('Get request for all videos');
    Video.find({}).then((videos) => {
        res.json(videos);
    }).catch((err) => {
        console.log("Error retrieving videos" + err);
    })
});

// To fetch a single videos
router.get('/videos/:id', function(req, res) {
    console.log('Get request for a single video');
    Video.findById(req.params.id).then((video) => {
        res.json(video);
    }).catch((err) => {
        console.log("Error retrieving video" + err);
    })
});

//Insert a new video into the database.
router.post('/video', function(req, res) {
    console.log('Post a video');
    let newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save().then((insertedVideo) => {
        res.json(insertedVideo);
    }).catch((err) => {
        console.log('Error saving video');
    })
});

// Update a video in the database.
router.put('/video/:id', function(req, res) {
    console.log('Update a video');
    Video.findByIdAndUpdate(req.params.id, 
        {
            $set: {title: req.body.title, url: req.body.url, description: req.body.description}
        },
        {
            new: true
        }).then((updatedVideo) => {
            res.json(updatedVideo);
        }).catch((err) => {
            res.send('Error updating video');
        })
});

// Delete a data from the database.
router.delete('/video/:id', function(req, res) {
   console.log('Deleting a video'); 
   Video.findByIdAndRemove(req.params.id)
    .then((deletedVideo) => {
        res.json(deletedVideo);
   }).catch((err) => {
        res.send('Error deleting video');
   })
});

// router.get('/videos', function(req, res) {
//     console.log('Get request for all videos');
//     Video.find({}).exec(function(err, videos) {
//         if(err) {
//             console.log("Error retrieving videos");
//         } else {
//             res.json(videos);
//         }
//     })
// });

module.exports = router;