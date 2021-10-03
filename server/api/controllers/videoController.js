const mongoose = require("mongoose");
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

exports.pick_one_video = async (_, res) => {
  return await videos.count().exec(async (err1, count) => {
    if (err1) res.send(err1);
    var random = Math.floor(Math.random() * count);
    return await videos
      .findOne()
      .skip(random)
      .exec(function (err2, result) {
        if (err2) res.send(err2);
        var datetime =
          "Query at: " + new Date().today() + " @ " + new Date().timeNow();
        console.log("Video Select ", result._id, result.path, datetime);
        res.send({
          id: result._id,
        });
        res.end();
        res.connection.end();
      });
  });
};

exports.pick_id_video = async (req, res) => {
  return await videos.findById(req.params.id).then(async (result) => {
    if (!result) {
      res.status(404).send({
        message: "FAIL TO GET VIDEO INFO: " + req.params.id,
      });
    } else {
      var datetime =
        "Query at: " + new Date().today() + " @ " + new Date().timeNow();
      console.log("Video with ID ", result._id, result.path, datetime);
      res.send({
        id: result._id,
        explaination: result.explaination,
        request_explaination: result.request_explaination,
      });
      res.end();
      res.connection.end();
    }
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
        var datetime =
          "Query at: " + new Date().today() + " @ " + new Date().timeNow();
        console.log("video request explaination for id: ", id, datetime);
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
