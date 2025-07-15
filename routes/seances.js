const express = require('express');
const router = express.Router();

// Define your routes here, e.g.:
router.get('/', (req, res) => {
  res.send('Seances route works!');
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Seance with id ${id} works!`);
});



module.exports = router;
