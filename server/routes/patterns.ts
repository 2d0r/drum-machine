import { Router } from 'express';
import { Pattern } from '../models/Pattern';

const router = Router();

// GET all patterns
router.get('/', async (_, res) => {
  try {
    const patterns = await Pattern.find();
    res.json({ data: patterns });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patterns', error });
  }
});

// GET single pattern by ID
router.get('/:id', async (req, res) => {
  try {
    const pattern = await Pattern.findById(req.params.id);
    if (!pattern) return res.status(404).json({ error: 'Pattern not found' });
    res.json({ data: pattern });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pattern', error });
  }
});

// POST a new pattern
router.post('/', async (req, res) => {
  try {
    const newPattern = new Pattern(req.body);
    const savedPattern = await newPattern.save();
    res.status(201).json({ data: savedPattern });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create pattern', error });
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
    res.json({ data: updatedPattern });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update pattern', error });
  }
});

// DELETE a pattern
router.delete('/:id', async (req, res) => {
  try {
    const deletedPattern = await Pattern.findByIdAndDelete(req.params.id);
    if (!deletedPattern) return res.status(404).json({ error: 'Pattern not found' });
    res.json({ message: 'Pattern deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete pattern', error });
  }
});

export default router;