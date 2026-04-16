const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET all quests
router.get('/', async (req, res) => {
  try {
    const quests = await prisma.quest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, quests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a quest
router.post('/', async (req, res) => {
  try {
    const { title, subject, difficulty } = req.body;

    if (!title || !subject || !difficulty) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const quest = await prisma.quest.create({
      data: { title, subject, difficulty }
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
      where: { id: parseInt(id) },
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
      where: { id: parseInt(id) }
    });

    res.json({ success: true, message: 'Quest deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;