const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/authController');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags:
 *       - Authentification
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post('/logout', logout);

module.exports = router;
