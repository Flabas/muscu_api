require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const seanceRoutes = require('./routes/seances');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const { createClient } = require('@supabase/supabase-js');

app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

app.use('/seances', seanceRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));