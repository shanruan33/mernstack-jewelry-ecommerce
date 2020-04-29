// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./routes/api');

// Step 2
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelry', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// treat requests as json requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// // Schema
// const Schema = mongoose.Schema;
// const BlogPostSchema = new Schema({
//     title: String,
//     body: String,
//     date: {
//         type: String,
//         default: Date.now()
//     }
// });

// // Model
// const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// //Save data to mongoDB
// const data = {
//     title: 'mern stack test again',
//     body: 'again again again again'
// }
// //.save
// const newBlogPost = new BlogPost(data); // instance of model
// newBlogPost.save((error) => {
//     if (error) {
//         console.log('oops, something happened');
//     } else {
//         console.log('data has been saved!!!!');
//     }
// });

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

// step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));