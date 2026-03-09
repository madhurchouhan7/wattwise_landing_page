const Waitlist = require('../models/Waitlist');
const { sendWaitlistConfirmationEmail } = require('../services/emailService');

// POST /api/waitlist
const joinWaitlist = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email address is required.' });
        }

        const ipAddress =
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress ||
            null;

        const userAgent = req.headers['user-agent'] || null;

        const entry = await Waitlist.create({ email, ipAddress, userAgent });

        // Send confirmation email asynchronously (does not block response)
        sendWaitlistConfirmationEmail(email);

        return res.status(201).json({
            success: true,
            message: "You're on the list! We'll be in touch soon. 🎉",
            joinedAt: entry.joinedAt,
        });
    } catch (error) {
        if (error.code === 11000 || error.message?.includes('duplicate')) {
            return res.status(409).json({
                error: "You're already on the waitlist! We'll notify you when we launch.",
            });
        }

        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors)
                .map((e) => e.message)
                .join(', ');
            return res.status(400).json({ error: message });
        }

        console.error('Waitlist error:', error);
        return res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

// GET /api/waitlist/count
const getCount = async (req, res) => {
    try {
        const count = await Waitlist.countDocuments();
        return res.status(200).json({ count });
    } catch (error) {
        console.error('Count error:', error);
        return res.status(500).json({ error: 'Server error.' });
    }
};

module.exports = { joinWaitlist, getCount };
