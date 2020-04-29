const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');
const User = require('../models/User');
const UserSession = require('../models/UserSession');


// Blog Routes
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

// login routes

/*
 * Sign up
 */
router.post('/account/signup', (req, res, next) => {
    const { body } = req;
    // body = req.body;
    console.log(body);
    const {
        firstName,
        lastName,
        password
    } = body;
    let {
        email
    } = body;
    if (!firstName) {
        return res.send({
            success: false,
            message: 'Error: Missing first name.'
        });
    }
    if (!lastName) {
        return res.send({
            success: false,
            message: 'Error: Missing last name.'
        });
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    email = email.toLowerCase();
    //email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }
        // Save the new user
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName
        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        });
    });
});
// end of sign up 

/*
 * Sign in
 */
router.post('/account/signin', (req, res, next) => {
    const { body } = req;
    const {
        password
    } = body;
    let {
        email
    } = body;
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    email = email.toLowerCase();
    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error: server error"
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: "Error: Invalid!"
            });
        }
        const user = users[0];
        console.log(user);
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: "Error: Invalid!"
            });
        }

        //Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }

            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id,
                firstName: user.firstName,
                lastName: user.lastName,
                cart: user.cart
            });
        });
    });
});
// end of sign in

// verify
router.get('/account/verify', (req, res, next) => {
    // get the token
    const { query } = req;
    const { token } = query;
    //?token = test

    // verify the token
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            //console.log(err);
            return res.send({
                success: false,
                message: "Error: server error"
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: "Error: Invalid"
            });
        } else {
            return res.send({
                success: true,
                message: "Good"
            });
        }
    });
})
// end of verify

/*
 * Log out
 */
router.get('/account/logout', (req, res, next) => {
    // get the token
    const { query } = req;
    const { token } = query;
    //?token = test

    // verify the token
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: { isDeleted: true }
    }, null, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: "Error: server error"
            });
        }
        return res.send({
            success: true,
            message: "Good"
        });
    });
})
// end of log logout

module.exports = router;