const supabase = require('../utils/supabase');

exports.getSession = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Séance non trouvée" });
    }

    res.json(data);
};

exports.updateSession = async (req, res) => {
    const { id } = req.params;
    const { notes, date } = req.body;

    const updateFields = {};
    if (notes !== undefined) updateFields.notes = notes;
    if (date !== undefined) updateFields.date = new Date(date);

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: "Aucun champ à mettre à jour" });
    }

    const { data, error } = await supabase
        .from('workout_sessions')
        .update(updateFields)
        .eq('id', id)
        .select('*')
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Séance non trouvée ou erreur lors de la mise à jour" });
    }

    res.json(data);
};

exports.deleteSession = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('workout_sessions')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(404).json({ error: "Séance non trouvée ou erreur lors de la suppression" });
    }

    res.json({ message: "Séance supprimée avec succès" });
};

exports.getSessionExercises = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('session_exercises')
        .select(`
            id,
            session_id,
            exercise_id,
            order,
            exercise:exercises (
                id,
                name,
                description,
                muscle_group
            )
        `)
        .eq('session_id', id)
        .order('order', { ascending: true });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

exports.addExerciseToSession = async (req, res) => {
    const { id } = req.params; 
    const { exercise_id, order } = req.body;

    if (!exercise_id) {
        return res.status(400).json({ error: "L'identifiant de l'exercice est requis" });
    }
    if (order === undefined) {
        return res.status(400).json({ error: 'Le champ "order" est requis' });
    }

    const insertObj = {
        session_id: id,
        exercise_id,
        order
    };

    const { data, error } = await supabase
        .from('session_exercises')
        .insert([insertObj])
        .select('*')
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};


