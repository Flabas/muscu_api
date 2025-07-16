require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sessionsRoutes = require('./routes/sessions');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const programRoutes = require('./routes/programs');
const exercisesRoutes = require('./routes/exercises');
const sessionExercisesRoutes = require('./routes/sessionExercises');
const setsRoutes = require('./routes/sets');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./api/swagger');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/programs', programRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/session-exercises', sessionExercisesRoutes);
app.use('/sets', setsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));