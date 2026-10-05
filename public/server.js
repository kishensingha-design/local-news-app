const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
// Serve your frontend files from the public folder
app.use(express.static('public'));

// Secure connection pool to CockroachDB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test Database Connection Route
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ success: true, currentTime: result.rows[0].now });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Route to get a user's wallet balance
app.get('/api/wallet/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query('SELECT diamonds, earnings_inr FROM wallets WHERE user_id = $1', [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Wallet not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});