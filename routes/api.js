const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');


//Routes
router.get('/', (req, res) => {
    // const data = {
    //     username: 'shanruan',
    //     age: '33'
    // }
    BlogPost.find({})
        .then((data) => {
            // console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });

    // res.json(data);
});

router.post('/save', (req, res) => {
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

router.get('/name', (req, res) => {
    const data = {
        username: 'aoaoaoao',
        age: '33'
    }
    res.json(data);
});




module.exports = router;