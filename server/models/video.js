// Here we have the blue print of the object in our database MongoDB.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: String,
    url: String,
    description: String
});

// Here we have created a model from the Schema.
// The first argument is the name of our model.
// The last argument 'videos' is the name of the collection from our database MongoDB.
// The second argument is our schema.

//module.exports = mongoose.model('video', videoSchema, 'videos')

module.exports = mongoose.model('video', videoSchema)
