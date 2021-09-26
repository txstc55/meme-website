const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

global.Images = require("./api/models/imageModel");
global.Gifs = require("./api/models/gifModel");
global.Videos = require("./api/models/videoModel");

const routes = require("./api/routes/route");

mongoose.Promise = global.Promise;
// mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost/meme", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = process.env.PORT || 5001;

routes(app);

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
