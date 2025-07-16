const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { userDetails, updateUser, deleteUser } = require('../controllers/usersController');

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère les informations d’un utilisateur
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’utilisateur
 *     responses:
 *       200:
 *         description: Détails de l’utilisateur
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', authMiddleware, userDetails);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Met à jour les informations d’un utilisateur
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: nouvel@email.com
 *               password:
 *                 type: string
 *                 example: nouveaumotdepasse
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch('/:id', authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’utilisateur
 *     responses:
 *       204:
 *         description: Utilisateur supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;