const mongoose = require("mongoose");
const { Schema } = mongoose;

const gifSchema = new Schema(
    {
        _id: {
            type: Number,
            required: "each gif has a unique id",
        },
        path: {
            type: String,
            required: "Each gif has a path leading to where it is stored",
        },
        request_explaination: {
            type: Boolean,
            default: false,
        },
        explaination: {
            type: String,
            default: "",
        },
    },
    { collection: "gifs" }
);

module.exports = mongoose.model("gifs", gifSchema);
