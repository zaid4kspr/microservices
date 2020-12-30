const router = require("express").Router();

router.use('/v1', require('./modules/adminAuth'));
router.use('/v1', require('./modules/invite'));
router.use('/v1', require('./modules/userAuth'));


module.exports = router;
