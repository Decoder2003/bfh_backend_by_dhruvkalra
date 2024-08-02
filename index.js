const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input' });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1 && /^[a-zA-Z]$/.test(item));
        const highestAlphabet = alphabets.length ? [alphabets.slice().sort().pop()] : [];

        const response = {
            is_success: true,
            user_id: "dhruv_kalra_13072003",
            email: "da4496@srmist.edu.in",
            roll_number: "RA2111003030194",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        };

        console.log('POST /bfhl response:', response);
        res.json(response);
    } catch (error) {
        console.error('Error handling POST /bfhl:', error);
        res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    try {
        const response = { operation_code: 1 };
        console.log('GET /bfhl response:', response);
        res.json(response);
    } catch (error) {
        console.error('Error handling GET /bfhl:', error);
        res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});

module.exports.handler = serverless(app);
