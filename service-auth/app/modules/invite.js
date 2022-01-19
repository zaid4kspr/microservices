const router = require('express').Router(),
    mongoose = require('mongoose'),
    hat = require("hat"),
    messages = require('../helpers/messages'),
    Admin = require('../models/Admin'),
    axios = require('axios'),
    adminAuth = require("../middlewares/JWT").adminAuth;

const winston = require('winston');
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

router.post('/users/invitation', adminAuth, async (req, res) => {
    try {
        if (req.body.userType === "Admin") {
            let admin = await Admin.findOne({
                email: req.body.email
            }).exec();
            if (admin) {
                return res.status(400).json({
                    message: messages.user_already_exists
                });
            } else {
                let newAdmin = new Admin({
                    email: req.body.email,
                    register_token: hat(),
                    tel: req.body.tel
                });
                await newAdmin.save();
                let data = {
                    user: newAdmin,
                    type: "register",
                    onModel: req.body.onModel

                };
                res.status(201).json([newAdmin]);
                await axios.post(process.env.NOTIFICATION_HOST + "/notifications/email", data);
            }
        }
      
        return;

    } catch (err) {
        logger.error("=====================================")
        logger.error(err)
        logger.error(JSON.stringify(req.body))
        logger.error(req.url)
        logger.error("=====================================")

        res.status(400).json({
            message: messages.contact
        });
        return;
    }
});
router.post('/users/inviteverification', async (req, res) => {
    try {
        if (req.body.userType === "Admin") {
            let admin = await Admin.findOne({
                register_token: req.body.register_token
            }).exec();
            if (admin) {
                return res.status(200).json([admin]);
            } else {
                return res.status(400).json({
                    message: messages.expired_invalid_token
                });
            }
        }
 
    } catch (err) {
        logger.error("=====================================")
        logger.error(err)
        logger.error(JSON.stringify(req.body))
        logger.error(req.url)
        logger.error("=====================================")
        return res.status(400).json({
            message: messages.catch_error
        });

    }

});
router.post('/users/registration', async (req, res) => {
    try {
        if (req.body.userType === "Admin") {
            let admin = await Admin.findOne({
                _id: req.body._id
            }).exec();
            if (admin && admin.password) {
                return res.status(400).json({
                    message: messages.user_already_exists
                });
            } else if (admin && !admin.password) {
                Object.assign(admin, req.body);
                admin.name = req.body.firstName + " " + req.body.lastName;
                admin.setPassword(req.body.password);
                admin.register_token = undefined;
                await admin.save();
                admin.password = undefined;
                return res.status(201).json(admin);
            }
        }

    } catch (err) {
        logger.error("=====================================")
        logger.error(err)
        logger.error(JSON.stringify(req.body))
        logger.error(req.url)
        logger.error("=====================================")
        return res.status(400).json({
            message: messages.catch_error
        });
    }
});

module.exports = router
