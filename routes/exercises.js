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


/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Récupère la liste des exercices
 *     tags:
 *       - Exercices
 *     responses:
 *       200:
 *         description: Liste des exercices
 *       401:
 *         description: Non autorisé
 */
router.get('/', authMiddleware, getExercises);

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Crée un nouvel exercice
 *     tags:
 *       - Exercices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Développé couché
 *               description:
 *                 type: string
 *                 example: Exercice pour les pectoraux
 *     responses:
 *       201:
 *         description: Exercice créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post('/', authMiddleware, createExercise);

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Récupère les détails d’un exercice
 *     tags:
 *       - Exercices
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’exercice
 *     responses:
 *       200:
 *         description: Détails de l’exercice
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice non trouvé
 */
router.get('/:id', authMiddleware, getExerciseById);

/**
 * @swagger
 * /exercises/{id}:
 *   patch:
 *     summary: Met à jour un exercice
 *     tags:
 *       - Exercices
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’exercice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Développé incliné
 *               description:
 *                 type: string
 *                 example: Exercice modifié
 *     responses:
 *       200:
 *         description: Exercice mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice non trouvé
 */
router.patch('/:id', authMiddleware, updateExercise);

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Supprime un exercice
 *     tags:
 *       - Exercices
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’exercice
 *     responses:
 *       204:
 *         description: Exercice supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Exercice non trouvé
 */
router.delete('/:id', authMiddleware, deleteExercise);

module.exports = router;
