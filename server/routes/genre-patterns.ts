import { Router } from 'express';
import { GenrePattern } from '../models/Pattern';

const router = Router();

// GET all genre patterns
router.get('/', async (_, res) => {
  try {
    const patterns = await GenrePattern.find();
    res.json({ data: patterns });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patterns', error });
  }
});

// POST a new genre pattern
router.post('/', async (req, res) => {
  try {
    const newPattern = new GenrePattern(req.body);
    const savedPattern = await newPattern.save();
    res.status(201).json({ data: savedPattern });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create pattern', error });
  }
});

export default router;
