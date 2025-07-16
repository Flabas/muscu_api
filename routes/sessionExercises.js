const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
    updateSessionExercise,
    deleteSessionExercise,
    listSets,
    addSet
} = require('../controllers/sessionExercisesController');

router.patch('/:id', authMiddleware, updateSessionExercise);
router.delete('/:id', authMiddleware, deleteSessionExercise);
router.get('/:id/sets', authMiddleware, listSets);
router.post('/:id/sets', authMiddleware, addSet);

module.exports = router;
