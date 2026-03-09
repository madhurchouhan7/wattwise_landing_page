const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');

// Internal Admin Dashboard Route
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 50;
        const skip = (page - 1) * limit;

        const totalWaitlistCount = await Waitlist.countDocuments();

        // Fetch users sorted by latest
        const waitlistUsers = await Waitlist.find()
            .sort({ joinedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // Pass to template
        res.render('adminDashboard', {
            title: 'Wattwise Admin Dashboard',
            users: waitlistUsers,
            totalCount: totalWaitlistCount,
            currentPage: page,
            hasMore: totalWaitlistCount > skip + limit,
        });

    } catch (error) {
        console.error('Admin route error:', error);
        res.status(500).send('An error occurred rendering the admin dashboard.');
    }
});

module.exports = router;
