const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
  getExercises,
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise
} = require('../controllers/exercisesController');


router.get('/', authMiddleware, getExercises);
router.post('/', authMiddleware, createExercise);
router.get('/:id', authMiddleware, getExerciseById);
router.patch('/:id', authMiddleware, updateExercise);
router.delete('/:id', authMiddleware, deleteExercise);

module.exports = router;
