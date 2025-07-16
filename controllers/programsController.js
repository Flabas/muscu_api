const supabase = require('../utils/supabase');
const jwt = require('jsonwebtoken');


exports.getPrograms = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token manquant ou invalide" });
    }
    const token = authHeader.split(' ')[1];

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ error: "Token invalide" });
    }

    const { data, error } = await supabase
        .from('workout_programs')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
}

exports.createProgram = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token manquant ou invalide" });
    }
    const token = authHeader.split(' ')[1];

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ error: "Token invalide" });
    }

    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: "Le nom et la description sont requis" });
    }

    const created_at = new Date();

    const { data, error } = await supabase
        .from('workout_programs')
        .insert([{ name, description, created_at, user_id: userId }])
        .select('*')
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
}

exports.updateProgram = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: "Le nom et la description sont requis" });
    }

    const { data, error } = await supabase
        .from('workout_programs')
        .update({ name, description })
        .eq('id', id)
        .select('*')
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

exports.deleteProgram = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('workout_programs')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({ success: true });
};

exports.getProgramSessions = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('program_id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

exports.createProgramSession = async (req, res) => {
    const { id } = req.params;
    const { notes, date } = req.body;

    if (!date) {
        return res.status(400).json({ error: "La date de la séance est requise" });
    }

    const { data, error } = await supabase
        .from('workout_sessions')
        .insert([
            {
                program_id: id,
                date: new Date(date),
                notes: notes || ''
            }
        ])
        .select('*')
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};