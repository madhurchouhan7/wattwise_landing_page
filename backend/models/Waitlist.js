const mongoose = require('mongoose');
const validator = require('validator');

const waitlistSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v) => validator.isEmail(v),
                message: 'Please provide a valid email address',
            },
        },
        ipAddress: {
            type: String,
            default: null,
        },
        userAgent: {
            type: String,
            default: null,
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Waitlist', waitlistSchema);
