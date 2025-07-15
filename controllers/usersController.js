const supabase = require('../utils/supabase');

exports.userDetails = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('users')
        .select('id, username, created_at')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(data);
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    const { data, error } = await supabase
        .from('users')
        .update({ username })
        .eq('id', id)
        .select('id, username, created_at')
        .single();

    if (error || !data) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(data);
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
}