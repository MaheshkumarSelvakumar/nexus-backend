const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

// All quest routes require authentication
router.use(authMiddleware);

// GET all quests for logged-in user
router.get('/', async (req, res) => {
  try {
    const quests = await prisma.quest.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, quests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a quest for logged-in user
router.post('/', async (req, res) => {
  try {
    const { title, subject, difficulty } = req.body;

    if (!title || !subject || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'All fields required'
      });
    }

    const quest = await prisma.quest.create({
      data: {
        title,
        subject,
        difficulty,
        userId: req.userId
      }
    });

    res.status(201).json({ success: true, quest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH update quest status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const quest = await prisma.quest.update({
      where: {
        id: parseInt(id),
        userId: req.userId
      },
      data: { status }
    });

    res.json({ success: true, quest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a quest
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.quest.delete({
      where: {
        id: parseInt(id),
        userId: req.userId
      }
    });

    res.json({ success: true, message: 'Quest deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;