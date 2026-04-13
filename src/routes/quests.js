const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let quests = [
  { id: 1, title: "Learn Node.js", subject: "Backend", difficulty: "hard", status: "todo" },
  { id: 2, title: "Build REST API", subject: "Backend", difficulty: "legendary", status: "todo" },
];

// GET all quests
router.get('/', (req, res) => {
  res.json({ success: true, quests });
});

// POST create a quest
router.post('/', (req, res) => {
  const { title, subject, difficulty } = req.body;

  if (!title || !subject || !difficulty) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const newQuest = {
    id: Date.now(),
    title,
    subject,
    difficulty,
    status: 'todo'
  };

  quests.push(newQuest);
  res.status(201).json({ success: true, quest: newQuest });
});

// PATCH update quest status
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const quest = quests.find(q => q.id === parseInt(id));

  if (!quest) {
    return res.status(404).json({ success: false, message: 'Quest not found' });
  }

  quest.status = status;
  res.json({ success: true, quest });
});

// DELETE a quest
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  quests = quests.filter(q => q.id !== parseInt(id));
  res.json({ success: true, message: 'Quest deleted' });
});

module.exports = router;