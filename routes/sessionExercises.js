const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
    updateSessionExercise,
    deleteSessionExercise,
    listSets,
    addSet
} = require('../controllers/sessionExercisesController');

/**
 * @swagger
 * /session-exercises/{id}:
 *   patch:
 *     summary: Met à jour un exercice de session
 *     tags:
 *       - Exercices de session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice de session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: "Notes sur l'exercice"
 *     responses:
 *       200:
 *         description: Exercice de session mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice de session non trouvé
 */
router.patch('/:id', authMiddleware, updateSessionExercise);

/**
 * @swagger
 * /session-exercises/{id}:
 *   delete:
 *     summary: Supprime un exercice de session
 *     tags:
 *       - Exercices de session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice de session
 *     responses:
 *       204:
 *         description: Exercice de session supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice de session non trouvé
 */
router.delete('/:id', authMiddleware, deleteSessionExercise);

/**
 * @swagger
 * /session-exercises/{id}/sets:
 *   get:
 *     summary: Récupère les séries d’un exercice de session
 *     tags:
 *       - Exercices de session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice de session
 *     responses:
 *       200:
 *         description: Liste des séries de l'exercice de session
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice de session non trouvé
 */
router.get('/:id/sets', authMiddleware, listSets);

/**
 * @swagger
 * /session-exercises/{id}/sets:
 *   post:
 *     summary: Ajoute une série à un exercice de session
 *     tags:
 *       - Exercices de session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'exercice de session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repetitions:
 *                 type: integer
 *                 example: 10
 *               weight:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Série ajoutée à l'exercice de session
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice de session non trouvé
 */
router.post('/:id/sets', authMiddleware, addSet);

module.exports = router;
