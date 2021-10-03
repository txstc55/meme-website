const mongoose = require("mongoose");
const images = mongoose.model("images");
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
        var datetime =
          "Query at: " + new Date().today() + " @ " + new Date().timeNow();
        console.log("Image Select ", result._id, result.path, datetime);
        res.send({
          id: result._id,
        });
        res.end();
        res.connection.end();
      });
  });
};

exports.pick_id_image = async (req, res) => {
  return await images.findById(req.params.id).then(async (result) => {
    if (!result) {
      this.pick_one_image(res);
    } else {
      var datetime =
        "Query at: " + new Date().today() + " @ " + new Date().timeNow();
      console.log("Image with ID ", result._id, result.path, datetime);
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
        var datetime =
          "Query at: " + new Date().today() + " @ " + new Date().timeNow();
        console.log("Image request explaination for id: ", id, datetime);
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