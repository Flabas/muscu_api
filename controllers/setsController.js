const supabase = require('../utils/supabase');

exports.updateSet = async (req, res) => {
    const { id } = req.params;
    const { set_number, weight, reps, rest_time } = req.body;

    // Build update object dynamically to allow partial updates
    const updateObj = {};
    if (set_number !== undefined) updateObj.set_number = set_number;
    if (weight !== undefined) updateObj.weight = weight;
    if (reps !== undefined) updateObj.reps = reps;
    if (rest_time !== undefined) updateObj.rest_time = rest_time;

    if (Object.keys(updateObj).length === 0) {
        return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
    }

    const { data, error } = await supabase
        .from('sets')
        .update(updateObj)
        .eq('id', id)
        .select('*')
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Série non trouvée ou erreur lors de la mise à jour" });
    }

    res.json(data);
};

exports.deleteSet = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('sets')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(404).json({ error: "Série non trouvée ou erreur lors de la suppression" });
    }

    res.json({ message: "Série supprimée avec succès" });
};
