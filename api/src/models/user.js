import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        default: 'user'
    },
    nbr_games: {
        type: Number,
        default: 0
    },
    winner: {
        type: Array,
        default: [],
    }
});

const User = mongoose.model("User", userSchema);

export default User;
