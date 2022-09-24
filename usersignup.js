const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/signuplogin');

router.post('/register', Controllers.postuserdata);
router.post('/login',Controllers.postlogin);

module.exports = router;