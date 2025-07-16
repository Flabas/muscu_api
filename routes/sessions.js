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


/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Récupère les informations d’une session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la session
 *     responses:
 *       200:
 *         description: Détails de la session
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Session non trouvée
 */
router.get('/:id', authMiddleware, getSession);

/**
 * @swagger
 * /sessions/{id}:
 *   patch:
 *     summary: Met à jour une session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Séance modifiée
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-02
 *     responses:
 *       200:
 *         description: Session mise à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Session non trouvée
 */
router.patch('/:id', authMiddleware, updateSession);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Supprime une session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la session
 *     responses:
 *       204:
 *         description: Session supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Session non trouvée
 */
router.delete('/:id', authMiddleware, deleteSession);

/**
 * @swagger
 * /sessions/{id}/exercises:
 *   get:
 *     summary: Récupère les exercices d’une session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la session
 *     responses:
 *       200:
 *         description: Liste des exercices de la session
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Session non trouvée
 */
router.get('/:id/exercises', authMiddleware, getSessionExercises);

/**
 * @swagger
 * /sessions/{id}/exercises:
 *   post:
 *     summary: Ajoute un exercice à une session
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exerciseId:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Exercice ajouté à la session
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Session non trouvée
 */
router.post('/:id/exercises', authMiddleware, addExerciseToSession);

module.exports = router;