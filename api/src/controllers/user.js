import User from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";


export const createUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const user = new User({
        email,
        username,
        password: hashedPassword
    });
    try {
        await user.save();
        const token = jsonwebtoken.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY || "TOKEN_KEY",
            {
                expiresIn: "1h",
            }
        );
        user.token = token;
        user.password = undefined;
        const userdatas = {
            id: user._id,
            email: user.email,
            username: user.username,
            token: token,
            nbr_games: user.nbr_games,
            winner: user.winner
        }
        console.log(user);
        res.status(201).json(userdatas);
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({ message: "Cet utilisateur existe déja veillez changer l'emaill et le username" });
        }
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "username ou mot de passe incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "username ou mot de passe incorrect" });
    }
    const token = jsonwebtoken.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY || "TOKEN_KEY",
        {
            expiresIn: "1h",
        }
    );
    user.token = token;
    user.password = undefined;
    const userdatas = {
        id: user._id,
        email: user.email,
        username: user.username,
        token: token,
        winner: user.winner,
        nbr_games: user.nbr_games,
        
    }
    res.status(200).json(userdatas);
}

