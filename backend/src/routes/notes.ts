import express from 'express';
import Note from '../models/Note';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

interface AuthRequest extends express.Request {
  userId?: string;
}

router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      userId: req.userId
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;