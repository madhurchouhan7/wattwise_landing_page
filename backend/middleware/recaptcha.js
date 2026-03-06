const fetch = require('node-fetch');

const verifyRecaptcha = async (req, res, next) => {
    // Skip reCAPTCHA verification in development mode
    if (process.env.NODE_ENV === 'development') {
        return next();
    }

    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
        return res.status(400).json({ error: 'reCAPTCHA token is required.' });
    }

    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
            }
        );

        const data = await response.json();

        if (!data.success || data.score < 0.5) {
            return res.status(403).json({
                error: 'reCAPTCHA verification failed. Please try again.',
            });
        }

        next();
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return res
            .status(500)
            .json({ error: 'Failed to verify reCAPTCHA. Please try again.' });
    }
};

module.exports = verifyRecaptcha;
