const express = require('express');
const cors = require('cors');
require('dotenv').config();

const questsRouter = require('./routes/quests');

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ──
app.use(cors());
app.use(express.json());

// ── ROUTES ──
app.get('/', (req, res) => {
  res.json({ message: 'NEXUS API is running!' });
});

app.use('/api/quests', questsRouter);

// ── START SERVER ──
app.listen(PORT, () => {
  console.log(`NEXUS server running on port ${PORT}`);
});