const express = require('express');
const router = express.Router();
const { getPrograms, createProgram, updateProgram, deleteProgram, getProgramSessions, createProgramSession } = require('../controllers/programsController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, getPrograms);
router.post('/', authMiddleware, createProgram);
router.put('/:id', authMiddleware, updateProgram);
router.delete('/:id', authMiddleware, deleteProgram);
router.get('/:id/sessions', authMiddleware, getProgramSessions);
router.post('/:id/sessions', authMiddleware, createProgramSession);

module.exports = router;