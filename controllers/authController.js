const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('../utils/jwt');
const supabase = require('../utils/supabase');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Récupérer l'utilisateur par username
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !user) {
        return res.status(400).json({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    // Comparer le mot de passe fourni avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    const token = generateToken(user);

    res.status(200).json({ 
        success: true,
        message: 'Utilisateur connecté avec succès',
        user: {
            id: user.id,
            username: user.username,
        },
        token: token,
    });
};

exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Vérifier si un utilisateur avec ce username existe déjà
    const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Nom d\'utilisateur déjà utilisé' });
    }
    // Si une erreur autre que "no rows" (c'est-à-dire, pas trouvé), retourner l'erreur
    if (selectError && selectError.code !== 'PGRST116') {
        // PGRST116 = no rows found, donc c'est ok
        return res.status(400).json({ success: false, message: selectError.message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const { data, error } = await supabase
        .from('users')
        .insert([{ id, username, password: hashedPassword }])
        .select()
        .single();

    if (error) {
        return res.status(400).json({ success: false, message: error.message });
    }

    const user = data;
    const token = generateToken(user);
    res.status(200).json({ 
        success: true,
        message: 'Utilisateur créé avec succès',
        user: {
            id: user.id,
            username: user.username,
        },
        token: token,
     });
};

exports.logout = async (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Utilisateur déconnecté avec succès',
    });
};
