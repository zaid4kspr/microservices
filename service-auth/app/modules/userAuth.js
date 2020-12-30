require('dotenv').config();
const express = require('express'),
    mongoose = require('mongoose'),
    Admin = require('../models/Admin'),

    router = express.Router(),
    upload = require('../helpers/upload'),
    axios = require('axios'),
    messages = require('../helpers/messages'),
    hat = require('hat'),
    adminAuth = require("../middlewares/JWT").adminAuth,
    winston = require("winston");
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({
            filename: 'log/error.log',
            level: 'error'
        }),
    ]
});

const 
    
    uploader = upload.storage();

const filter = {
    password: 0,
    reset_token: 0,
    reset_exp: 0,
    updated_at: 0,
    facebookId: 0,
    googleId: 0

};


// **user THINGS
// LOGIN
router.post('/users/login', async (req, res) => {
    try {
        userPassport.authenticate('user-local', function (err, user, info) {
            let token;
            if (err) {
                console.log(err)
                return res.status(401).json({
                    message: "missing cred"
                });
            }

            if (user) {
                console.log(user.constructor.modelName);
                token = user.generateJwt();

                return res.status(200).json({
                    "user": user,
                    "token": "Bearer " + token
                });
            } else {
                res.status(401).json(info);
            }
        })(req, res)

    } catch (reason) {

        logger.error("=====================================")
        logger.error(reason)
        logger.error(JSON.stringify(req.body))
        logger.error(req.url)
        logger.error("=====================================")

        res.status(501).json({
            message: messages.contact
        })
    }
})


//user SIGN UP

router.get('/users/:id/:userType', adminAuth, async (req, res) => {
    try {
        let user
    
        if (req.params.userType == "Admin") {
            user = await Admin.findById(req.params.id, filter).exec();

        }


        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({
                message: messages.not_found
            });
        }
    } catch (reason) {

        logger.error("=====================================")
        logger.error(reason)
        logger.error(JSON.stringify(req.body))
        logger.error(req.url)
        logger.error("=====================================")

        res.status(400).json({
            "message": messages.contact
        });
    }
});
router.post('/filter/users/:userType', adminAuth, async (req, res) => {
    try {
        const options = {
            page: req.body.page,
            limit: 10,
            populate: ' business',
            sort: "-createdAt",
            select: " -password -reset_token   "

        };

        let query = {}
        if (req.body.name) {
            query["name"] = {
                $regex: '.*' + req.body.name + '.*',
                $options: 'i'
            }
        }
        if (req.body.email) {
            query["email"] = {
                $regex: '.*' + req.body.email + '.*',
                $options: 'i'
            }
        }

        if (req.body["business"]) {
            query["business"] = req.body.business
        }

        let users = []
   
        if (req.params.userType == "Admin") {
            users = await Admin.paginate(query, options);

        }
  
   

        if (users) {
            return res.status(200).json(users);
        } else {
            return res.status(400).json({
                message: messages.contact
            });
        }
    } catch (reason) {
        logger.error("=====================================")
        logger.error(reason)
        logger.error(JSON.stringify(req.body))
        logger.error(req.url)
        logger.error("=====================================")

        res.status(400).json({
            "message": messages.contact
        });
    }
});


// **user THINGS
module.exports = router;
