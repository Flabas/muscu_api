const express = require('express');
const router = express.Router();
const { getPrograms, createProgram, updateProgram, deleteProgram, getProgramSessions, createProgramSession } = require('../controllers/programsController');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Récupère la liste des programmes
 *     tags:
 *       - Programmes
 *     responses:
 *       200:
 *         description: Liste des programmes
 *       401:
 *         description: Non autorisé
 */
router.get('/', authMiddleware, getPrograms);

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Crée un nouveau programme
 *     tags:
 *       - Programmes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Programme été
 *               description:
 *                 type: string
 *                 example: Programme pour la prise de masse
 *     responses:
 *       201:
 *         description: Programme créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post('/', authMiddleware, createProgram);

/**
 * @swagger
 * /programs/{id}:
 *   put:
 *     summary: Met à jour un programme
 *     tags:
 *       - Programmes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du programme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Programme modifié
 *               description:
 *                 type: string
 *                 example: Description modifiée
 *     responses:
 *       200:
 *         description: Programme mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Programme non trouvé
 */
router.put('/:id', authMiddleware, updateProgram);

/**
 * @swagger
 * /programs/{id}:
 *   delete:
 *     summary: Supprime un programme
 *     tags:
 *       - Programmes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du programme
 *     responses:
 *       204:
 *         description: Programme supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Programme non trouvé
 */
router.delete('/:id', authMiddleware, deleteProgram);

/**
 * @swagger
 * /programs/{id}/sessions:
 *   get:
 *     summary: Récupère les sessions d’un programme
 *     tags:
 *       - Programmes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du programme
 *     responses:
 *       200:
 *         description: Liste des sessions du programme
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Programme non trouvé
 */
router.get('/:id/sessions', authMiddleware, getProgramSessions);

/**
 * @swagger
 * /programs/{id}/sessions:
 *   post:
 *     summary: Ajoute une session à un programme
 *     tags:
 *       - Programmes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du programme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Séance 1
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-01
 *     responses:
 *       201:
 *         description: Session ajoutée au programme
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Programme non trouvé
 */
router.post('/:id/sessions', authMiddleware, createProgramSession);

module.exports = router;