// Requires
const express = require('express');

// Init vars
const app = express();

app.get('/health', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'Service alive.'
    });
});


module.exports = app;
