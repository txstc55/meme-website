const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
    {
        _id: {
            type: Number,
            required: "each image has a unique id",
        },
        path: {
            type: String,
            required: "Each image has a path leading to where it is stored",
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
    { collection: "images" }
);

module.exports = mongoose.model("images", imageSchema);
