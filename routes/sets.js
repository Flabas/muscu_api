const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
  updateSet,
  deleteSet
} = require('../controllers/setsController');

router.patch('/:id', authMiddleware, updateSet);
router.delete('/:id', authMiddleware, deleteSet);

module.exports = router;
