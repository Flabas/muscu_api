# 🏋️‍♂️ API — Suivi de séances de musculation

API RESTful pour gérer des utilisateurs, des programmes d’entraînement, des séances, des exercices et des séries.

---

## 📄 Table des matières

- [🔗 Authentification](#-authentification)
- [👤 Utilisateurs](#-utilisateurs)
- [🗓️ Programmes d’entraînement](#-programmes-dentraînement)
- [📝 Séances](#-séances)
- [🏋️ Exercices (catalogue)](#-exercices-catalogue)
- [📋 Exercices d’une séance](#-exercices-dune-séance)
- [🔁 Séries pour un exercice](#-séries-pour-un-exercice)
- [🔷 Notes](#-notes)
- [📚 Documentation Swagger](#-documentation-swagger)

---

## 🔗 Authentification

| Méthode | Endpoint           | Description                 |
|---------|--------------------|-----------------------------|
| POST    | `/auth/register`   | Créer un utilisateur        |
| POST    | `/auth/login`      | Se connecter                |
| POST    | `/auth/logout`     | Se déconnecter              |

---

## 👤 Utilisateurs

| Méthode | Endpoint           | Description                        |
|---------|--------------------|------------------------------------|
| GET     | `/users`           | Liste des utilisateurs (admin)    |
| GET     | `/users/:id`       | Détails d’un utilisateur          |
| PATCH   | `/users/:id`       | Modifier un utilisateur           |
| DELETE  | `/users/:id`       | Supprimer un utilisateur          |

---

## 🗓️ Programmes d’entraînement

| Méthode | Endpoint           | Description                              |
|---------|--------------------|------------------------------------------|
| GET     | `/programs`        | Lister les programmes de l’utilisateur |
| POST    | `/programs`        | Créer un programme                     |
| GET     | `/programs/:id`    | Voir un programme                      |
| PATCH   | `/programs/:id`    | Modifier un programme                  |
| DELETE  | `/programs/:id`    | Supprimer un programme                 |

---

## 📝 Séances

| Méthode | Endpoint                                 | Description                        |
|---------|------------------------------------------|------------------------------------|
| GET     | `/programs/:programId/sessions`         | Lister les séances d’un programme |
| POST    | `/programs/:programId/sessions`         | Créer une séance                   |
| GET     | `/sessions/:id`                         | Détails d’une séance              |
| PATCH   | `/sessions/:id`                         | Modifier une séance               |
| DELETE  | `/sessions/:id`                         | Supprimer une séance              |

---

## 🏋️ Exercices (catalogue)

| Méthode | Endpoint           | Description                          |
|---------|--------------------|--------------------------------------|
| GET     | `/exercises`       | Liste des exercices disponibles      |
| POST    | `/exercises`       | Ajouter un exercice au catalogue    |
| GET     | `/exercises/:id`   | Détails d’un exercice               |
| PATCH   | `/exercises/:id`   | Modifier un exercice                |
| DELETE  | `/exercises/:id`   | Supprimer un exercice               |

---

## 📋 Exercices d’une séance

| Méthode | Endpoint                                 | Description                       |
|---------|------------------------------------------|-----------------------------------|
| GET     | `/sessions/:sessionId/exercises`        | Lister les exercices d’une séance|
| POST    | `/sessions/:sessionId/exercises`        | Ajouter un exercice à la séance |
| PATCH   | `/session-exercises/:id`                | Modifier un exercice de séance  |
| DELETE  | `/session-exercises/:id`                | Retirer un exercice d’une séance|

---

## 🔁 Séries pour un exercice

| Méthode | Endpoint                                             | Description                   |
|---------|------------------------------------------------------|-------------------------------|
| GET     | `/session-exercises/:sessionExerciseId/sets`        | Lister les séries             |
| POST    | `/session-exercises/:sessionExerciseId/sets`        | Ajouter une série             |
| PATCH   | `/sets/:id`                                          | Modifier une série            |
| DELETE  | `/sets/:id`                                          | Supprimer une série           |

---

## 📚 Documentation Swagger

La documentation interactive de l’API est disponible via Swagger à l’URL suivante :

- [`/api-docs`](http://localhost:3000/api-docs)

---

## 🔷 Notes

✅ Tous les endpoints REST suivent la convention **verbe HTTP + ressource**.  
✅ Les endpoints protégés nécessitent un JWT dans l’en-tête `Authorization: Bearer <token>`.  
✅ Les routes sont conçues pour être hiérarchiques et intuitives. 