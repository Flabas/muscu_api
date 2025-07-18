const supabase = require('../utils/supabase');

exports.updateSessionExercise = async (req, res) => {
    const { id } = req.params;
    const { order, exercise_id } = req.body;

    if (order === undefined && exercise_id === undefined) {
        return res.status(400).json({ error: 'Au moins un des champs "order" ou "exercise_id" est requis' });
    }

    const updateObj = {};
    if (order !== undefined) updateObj.order = order;
    if (exercise_id !== undefined) updateObj.exercise_id = exercise_id;

    const { data, error } = await supabase
        .from('session_exercises')
        .update(updateObj)
        .eq('id', id)
        .select('*')
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Exercice de séance non trouvé ou erreur lors de la mise à jour" });
    }

    res.json(data);
};

exports.deleteSessionExercise = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('session_exercises')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(404).json({ error: "Exercice de séance non trouvé ou erreur lors de la suppression" });
    }

    res.json({ message: "Exercice de séance supprimé avec succès" });
};

exports.listSets = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('sets')
        .select('*')
        .eq('session_exercise_id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

exports.addSet = async (req, res) => {
    const { id } = req.params;
    const { set_number, weight, reps, rest_time} = req.body;


   const insertObj = {
    session_exercise_id: id,
   };
   if (set_number !== undefined) insertObj.set_number = set_number;
   if (weight !== undefined) insertObj.weight = weight;
   if (reps !== undefined) insertObj.reps = reps;
   if (rest_time !== undefined) insertObj.rest_time = rest_time;

   const { data, error } = await supabase
    .from('sets')
    .insert([insertObj])
    .select('*')
    .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};
