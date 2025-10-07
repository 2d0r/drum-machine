import { Router } from 'express';
import Pattern from '../models/Pattern.ts';

const router = Router();

// GET all patterns
router.get('/', async (req, res) => {
  try {
    const patterns = await Pattern.find();
    res.json(patterns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patterns' });
  }
});

// GET single pattern by ID
router.get('/:id', async (req, res) => {
  try {
    const pattern = await Pattern.findById(req.params.id);
    if (!pattern) return res.status(404).json({ error: 'Pattern not found' });
    res.json(pattern);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pattern' });
  }
});

// POST a new pattern
router.post('/', async (req, res) => {
  try {
    const newPattern = new Pattern(req.body); // expects { name: string, steps: string[] }
    const savedPattern = await newPattern.save();
    res.status(201).json(savedPattern);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create pattern' });
  }
});

// PUT / update a pattern
router.put('/:id', async (req, res) => {
  try {
    const updatedPattern = await Pattern.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPattern) return res.status(404).json({ error: 'Pattern not found' });
    res.json(updatedPattern);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update pattern' });
  }
});

// DELETE a pattern
router.delete('/:id', async (req, res) => {
  try {
    const deletedPattern = await Pattern.findByIdAndDelete(req.params.id);
    if (!deletedPattern) return res.status(404).json({ error: 'Pattern not found' });
    res.json({ message: 'Pattern deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete pattern' });
  }
});

export default router;