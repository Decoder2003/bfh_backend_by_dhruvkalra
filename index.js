const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// POST endpoint
app.post('/bfhl', (req, res) => {
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

    res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
