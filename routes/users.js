const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { userDetails, updateUser, deleteUser } = require('../controllers/usersController');

router.get('/', (req, res) => {
    res.send('Users route works!');
});

router.get('/:id', authMiddleware, userDetails);

router.patch('/:id', authMiddleware, updateUser);

router.delete('/:id', authMiddleware, deleteUser);




module.exports = router;