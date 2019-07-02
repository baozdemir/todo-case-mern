/**
 * App Specific Configs
 */

module.exports = {
    token: {
        access: {
            secret: "pFZT^iirE2E#zh7]RNvYd9Q2",
            options: {
                expiresIn: 3 * 24 * 60 * 60 // 3 days
            }
        },
        refresh: {
            options: {
                expiresIn: 15 * 24 * 60 * 60 // 15 days
            }
        }
    }
};
