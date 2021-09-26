const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema(
    {
        _id: {
            type: Number,
            required: "each video has a unique id",
        },
        path: {
            type: String,
            required: "Each video has a path leading to where it is stored",
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
    { collection: "videos" }
);

module.exports = mongoose.model("videos", videoSchema);
