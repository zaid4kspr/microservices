const router = require("express").Router();

router.use('/v1', require('./modules/adminAuth'));


module.exports = router;
