const controllers = require("../controllers/controller");

module.exports = (app) => {
    app.route("/image").get(controllers.pick_one_image); // get a random image id

    app.route("/image/content/:id").get(controllers.get_image_by_id); // get the content of image by id

    app.route("/image/explaination/:id")
        .get(controllers.get_image_explaination_by_id) // get the image explaination by id
        .post(controllers.post_image_explaination_by_id); // post image explaination by id

    app.route("/image/request/:id")
        .get(controllers.get_image_request_by_id) // get the image explaination request by id
        .post(controllers.post_image_request_by_id); // post the image explaination request by id
    // app.route("/gif").get(controllers.pick_one_gif);

    // app.route("/gif/content/:id").get(controllers.get_gif_by_id);

    // app.route("/gif/explaination/:id")
    //     .get(controllers.get_gif_explaination_by_id)
    //     .post(controllers.post_gif_explaination_by_id);
    // app
    //     .route('/video')
    //     .get(controllers.pick_one_video)
};


// test on 46479771