const mongoose = require("mongoose");
const images = mongoose.model("images");
const gifs = mongoose.model("gifs");
const videos = mongoose.model("videos");
const fs = require("fs");
// For todays date;
Date.prototype.today = function () {
    return (
        (this.getDate() < 10 ? "0" : "") +
        this.getDate() +
        "/" +
        (this.getMonth() + 1 < 10 ? "0" : "") +
        (this.getMonth() + 1) +
        "/" +
        this.getFullYear()
    );
};

// For the time now
Date.prototype.timeNow = function () {
    return (
        (this.getHours() < 10 ? "0" : "") +
        this.getHours() +
        ":" +
        (this.getMinutes() < 10 ? "0" : "") +
        this.getMinutes() +
        ":" +
        (this.getSeconds() < 10 ? "0" : "") +
        this.getSeconds()
    );
};

exports.pick_one_image = async (_, res) => {
    return await images.count().exec(async (err1, count) => {
        if (err1) res.send(err1);
        var random = Math.floor(Math.random() * count);
        return await images
            .findOne()
            .skip(random)
            .exec(function (err2, result) {
                if (err2) res.send(err2);
                const imgdata = fs.readFileSync(result.path);
                const imgExtension = result.path.split(".").at(-1);
                console.log(result._id, result.path);
                res.contentType = "image/png";
                res.setHeader(
                    "Content-Disposition",
                    'attachment; filename="' +
                        result._id +
                        "." +
                        imgExtension +
                        '"'
                );
                res.send(imgdata);
                // res.json({ id: result._id, data: imgdata });
                res.end();
                res.connection.end();
            });
    });
};

exports.pick_one_gif = async (_, res) => {
    return await gifs.count().exec(async (err1, count) => {
        if (err1) res.send(err1);
        var random = Math.floor(Math.random() * count);
        return await gifs
            .findOne()
            .skip(random)
            .exec(function (err2, result) {
                if (err2) res.send(err2);
                const gifdata = fs.readFileSync(result.path);
                const gifExtension = "gif";
                console.log(result._id, result.path);
                res.contentType = "image/gif";
                res.setHeader(
                    "Content-Disposition",
                    'attachment; filename="' +
                        result._id +
                        "." +
                        gifExtension +
                        '"'
                );
                res.send(gifdata);
                // res.json({ id: result._id, data: imgdata });
                res.end();
                res.connection.end();
            });
    });
};