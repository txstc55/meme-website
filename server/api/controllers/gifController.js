const mongoose = require("mongoose");
const gifs = mongoose.model("gifs");
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


exports.pick_one_gif = async (_, res) => {
  return await gifs.count().exec(async (err1, count) => {
    if (err1) res.send(err1);
    var random = Math.floor(Math.random() * count);
    return await gifs
      .findOne()
      .skip(random)
      .exec(function (err2, result) {
        if (err2) res.send(err2);
        var datetime =
          "Query at: " + new Date().today() + " @ " + new Date().timeNow();
        console.log("gif ", result._id, result.path, datetime);
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

exports.pick_id_gif = async (req, res) => {
  return await gifs.findById(req.params.id).then(async (result) => {
    if (!result) {
      res.status(404).send({
        message: "FAIL TO GET GIF INFO: " + req.params.id,
      });
    } else {
      var datetime =
        "Query at: " + new Date().today() + " @ " + new Date().timeNow();
      console.log("gIF with ID ", result._id, result.path, datetime);
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
  gifs.findByIdAndUpdate(id, { request_explaination: true }, (err, result) => {
    if (err) {
      console.log("gif request explaination error, id: ", id, ", err: ", err);
      res.send({ success: false });
    } else {
      var datetime =
        "Query at: " + new Date().today() + " @ " + new Date().timeNow();
      console.log("gif request explaination for id: ", id, datetime);
      res.send({ success: true });
    }
  });
};

exports.post_gif_explaination_by_id = async (req, res) => {
  const id = parseInt(req.params.id);
  gifs.findByIdAndUpdate(
    id,
    { request_explaination: false, explaination: req.body.text },
    (err, result) => {
      if (err) {
        console.log("gif adding explaination error, id: ", id, ", err: ", err);
        res.send({ success: false });
      } else {
        console.log("gif explaination added for id: ", id);
        res.send({ success: true });
      }
    }
  );
};
