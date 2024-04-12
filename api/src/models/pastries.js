import mongoose from "mongoose";

const pastrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    quantityWon: {
        type: Number,
        default: 0
    },
});

const Pastry = mongoose.model("Pastrie", pastrySchema);

export default Pastry;
