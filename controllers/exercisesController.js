const supabase = require('../utils/supabase');

exports.getExercises = async (req, res) => {
    const { data, error } = await supabase
        .from('exercises')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

exports.createExercise = async (req, res) => {
    const { name, description, muscle_group } = req.body;

    if (!name || !description || !muscle_group) {
        return res.status(400).json({ error: "Le nom, la description et le groupe musculaire sont requis" });
    }

    const { data, error } = await supabase
        .from('exercises')
        .insert([{ name, description, muscle_group }])
        .select('*')
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

exports.getExerciseById = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Exercice non trouvé" });
    }

    res.json(data);
};

exports.updateExercise = async (req, res) => {
    const { id } = req.params;
    const { name, description, muscle_group } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (muscle_group !== undefined) updateFields.muscle_group = muscle_group;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: "Aucun champ à mettre à jour" });
    }

    const { data, error } = await supabase
        .from('exercises')
        .update(updateFields)
        .eq('id', id)
        .select('*')
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Exercice non trouvé ou erreur lors de la mise à jour" });
    }

    res.json(data);
};

exports.deleteExercise = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(404).json({ error: "Exercice non trouvé ou erreur lors de la suppression" });
    }

    res.json({ success: true });
};
