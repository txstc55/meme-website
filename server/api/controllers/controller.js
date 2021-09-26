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
                console.log("Image ", result._id, result.path);
                res.send({
                    id: result._id,
                    explaination: result.explaination,
                    request_explaination: result.request_explaination,
                });
                res.end();
                res.connection.end();
            });
    });
};

exports.get_image_by_id = async (req, res) => {
    return await images.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET IMAGE " + id,
            });
        } else {
            const imgdata = fs.readFileSync(result.path);
            const imgExtension = result.path.split(".").at(-1);
            res.contentType = "image/png";
            res.setHeader(
                "Content-Disposition",
                'attachment; filename="' + result._id + "." + imgExtension + '"'
            );
            res.send(imgdata);
            res.end();
            res.connection.end();
        }
    });
};

exports.get_image_explaination_by_id = async (req, res) => {
    return await images.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET IMAGE " + id,
            });
        } else {
            const explaination = result.explaination;
            res.send({ explaination: explaination });
            res.end();
            res.connection.end();
        }
    });
};

exports.get_image_request_by_id = async (req, res) => {
    return await images.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET IMAGE " + id,
            });
        } else {
            const request_explaination = result.request_explaination;
            res.send({ request_explaination: request_explaination });
            res.end();
            res.connection.end();
        }
    });
};

exports.post_image_request_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    images.findByIdAndUpdate(
        id,
        { request_explaination: true },
        (err, result) => {
            if (err) {
                console.log(
                    "Image request explaination error, id: ",
                    id,
                    ", err: ",
                    err
                );
                res.send({ success: false });
            } else {
                console.log("Image request explaination for id: ", id);
                res.send({ success: true });
            }
        }
    );
};

exports.post_image_explaination_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    images.findByIdAndUpdate(
        id,
        { request_explaination: false, explaination: req.body.text },
        (err, result) => {
            if (err) {
                console.log(
                    "Image adding explaination error, id: ",
                    id,
                    ", err: ",
                    err
                );
                res.send({ success: false });
            } else {
                console.log("Image explaination added for id: ", id);
                res.send({ success: true });
            }
        }
    );
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
                console.log("gif ", result._id, result.path);
                res.send({
                    id: result._id,
                    explaination: result.explaination,
                    request_explaination: result.request_explaination,
                });
                res.end();
                res.connection.end();
            });
    });
};

exports.get_gif_by_id = async (req, res) => {
    return await gifs.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET gif " + id,
            });
        } else {
            const gifdata = fs.readFileSync(result.path);
            const gifExtension = result.path.split(".").at(-1);
            res.contentType = "image/gif";
            res.setHeader(
                "Content-Disposition",
                'attachment; filename="' + result._id + "." + gifExtension + '"'
            );
            res.send(gifdata);
            res.end();
            res.connection.end();
        }
    });
};

exports.get_gif_explaination_by_id = async (req, res) => {
    return await gifs.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET gif " + id,
            });
        } else {
            const explaination = result.explaination;
            res.send({ explaination: explaination });
            res.end();
            res.connection.end();
        }
    });
};

exports.get_gif_request_by_id = async (req, res) => {
    return await gifs.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET gif " + id,
            });
        } else {
            const request_explaination = result.request_explaination;
            res.send({ request_explaination: request_explaination });
            res.end();
            res.connection.end();
        }
    });
};

exports.post_gif_request_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    gifs.findByIdAndUpdate(
        id,
        { request_explaination: true },
        (err, result) => {
            if (err) {
                console.log(
                    "gif request explaination error, id: ",
                    id,
                    ", err: ",
                    err
                );
                res.send({ success: false });
            } else {
                console.log("gif request explaination for id: ", id);
                res.send({ success: true });
            }
        }
    );
};

exports.post_gif_explaination_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    gifs.findByIdAndUpdate(
        id,
        { request_explaination: false, explaination: req.body.text },
        (err, result) => {
            if (err) {
                console.log(
                    "gif adding explaination error, id: ",
                    id,
                    ", err: ",
                    err
                );
                res.send({ success: false });
            } else {
                console.log("gif explaination added for id: ", id);
                res.send({ success: true });
            }
        }
    );
};

exports.pick_one_video = async (_, res) => {
    return await videos.count().exec(async (err1, count) => {
        if (err1) res.send(err1);
        var random = Math.floor(Math.random() * count);
        return await videos
            .findOne()
            .skip(random)
            .exec(function (err2, result) {
                if (err2) res.send(err2);
                const videodata = fs.readFileSync(result.path);
                console.log("video ", result._id, result.path);
                res.send({
                    id: result._id,
                    explaination: result.explaination,
                    request_explaination: result.request_explaination,
                });
                res.end();
                res.connection.end();
            });
    });
};

exports.get_video_by_id = async (req, res) => {
    return await videos.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET video " + id,
            });
        } else {
            const path = result.path;
            const stat = fs.statSync(path);
            const fileSize = stat.size;
            const range = req.headers.range;
            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunksize = end - start + 1;
                const file = fs.createReadStream(path, { start, end });
                const head = {
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    "Content-Length": fileSize,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(200, head);
                fs.createReadStream(path).pipe(res);
            }
        }
    });
};

exports.get_video_explaination_by_id = async (req, res) => {
    return await videos.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET video " + id,
            });
        } else {
            const explaination = result.explaination;
            res.send({ explaination: explaination });
            res.end();
            res.connection.end();
        }
    });
};

exports.get_video_request_by_id = async (req, res) => {
    return await videos.findById(req.params.id).then(async (result) => {
        if (!result) {
            res.status(404).send({
                message: "FAIL TO GET video " + id,
            });
        } else {
            const request_explaination = result.request_explaination;
            res.send({ request_explaination: request_explaination });
            res.end();
            res.connection.end();
        }
    });
};

exports.post_video_request_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    videos.findByIdAndUpdate(
        id,
        { request_explaination: true },
        (err, result) => {
            if (err) {
                console.log(
                    "video request explaination error, id: ",
                    id,
                    ", err: ",
                    err
                );
                res.send({ success: false });
            } else {
                console.log("video request explaination for id: ", id);
                res.send({ success: true });
            }
        }
    );
};

exports.post_video_explaination_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    videos.findByIdAndUpdate(
        id,
        { request_explaination: false, explaination: req.body.text },
        (err, result) => {
            if (err) {
                console.log(
                    "video adding explaination error, id: ",
                    id,
                    ", err: ",
                    err
                );
                res.send({ success: false });
            } else {
                console.log("video explaination added for id: ", id);
                res.send({ success: true });
            }
        }
    );
};
