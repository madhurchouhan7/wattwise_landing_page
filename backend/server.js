require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const waitlistRoutes = require('./routes/waitlist');

const app = express();
const PORT = process.env.PORT || 5001;

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g. mobile apps, curl)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS policy: origin ${origin} not allowed.`));
            }
        },
        methods: ['GET', 'POST'],
        credentials: true,
    })
);

// ─── BODY PARSER ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── RATE LIMITING ────────────────────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' },
});
app.use('/api/', limiter);

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/waitlist', waitlistRoutes);

// ─── 404 HANDLER ──────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
});

// ─── DATABASE + SERVER START ──────────────────────────────────────────────────
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => {
            console.log(`🚀 Wattwise backend running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
