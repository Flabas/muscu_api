const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
  updateSet,
  deleteSet
} = require('../controllers/setsController');

/**
 * @swagger
 * /sets/{id}:
 *   patch:
 *     summary: Met à jour une série (set)
 *     tags:
 *       - Séries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la série
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repetitions:
 *                 type: integer
 *                 example: 12
 *               weight:
 *                 type: number
 *                 example: 60
 *     responses:
 *       200:
 *         description: Série mise à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Série non trouvée
 */
router.patch('/:id', authMiddleware, updateSet);

/**
 * @swagger
 * /sets/{id}:
 *   delete:
 *     summary: Supprime une série (set)
 *     tags:
 *       - Séries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la série
 *     responses:
 *       204:
 *         description: Série supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Série non trouvée
 */
router.delete('/:id', authMiddleware, deleteSet);

module.exports = router;
