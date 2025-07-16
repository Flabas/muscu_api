const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { 
  getSession, 
  updateSession, 
  deleteSession,
  getSessionExercises,
  addExerciseToSession
} = require('../controllers/sessionsController');


router.get('/:id', authMiddleware, getSession);
router.patch('/:id', authMiddleware, updateSession);
router.delete('/:id', authMiddleware, deleteSession);
router.get('/:id/exercises', authMiddleware, getSessionExercises);
router.post('/:id/exercises', authMiddleware, addExerciseToSession);

module.exports = router;