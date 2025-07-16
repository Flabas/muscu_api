require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sessionsRoutes = require('../routes/sessions');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');
const programRoutes = require('../routes/programs');
const exercisesRoutes = require('../routes/exercises');
const sessionExercisesRoutes = require('../routes/sessionExercises');
const setsRoutes = require('../routes/sets');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/programs', programRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/session-exercises', sessionExercisesRoutes);
app.use('/sets', setsRoutes);

module.exports = app;
