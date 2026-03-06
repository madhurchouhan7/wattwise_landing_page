const express = require('express');
const router = express.Router();
const { joinWaitlist, getCount } = require('../controllers/waitlistController');
const verifyRecaptcha = require('../middleware/recaptcha');

// POST /api/waitlist - join the waitlist
router.post('/', verifyRecaptcha, joinWaitlist);

// GET /api/waitlist/count - get total count
router.get('/count', getCount);

module.exports = router;
