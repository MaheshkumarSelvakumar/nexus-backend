const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require("morgan");

const questsRouter = require('./routes/quests');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ──
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true,
}));
app.use(express.json());

// ── ROUTES ──
app.get('/', (req, res) => {
  res.json({ message: 'NEXUS API is running!' });
});

app.use('/api/auth', authRouter);
app.use('/api/quests', questsRouter);

// ── START SERVER ──
app.listen(PORT, () => {
  console.log(`NEXUS server running on port ${PORT}`);
});