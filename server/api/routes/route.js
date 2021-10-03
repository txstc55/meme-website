const imageControllers = require("../controllers/imageController");
const gifControllers = require("../controllers/gifController");
const videoControllers = require("../controllers/videoController");

module.exports = (app) => {
    app.route("/image").get(imageControllers.pick_one_image); // get a random image id
    app.route("/image/:id").get(imageControllers.pick_id_image); // get a specific image with id

    app.route("/image/content/:id").get(imageControllers.get_image_by_id); // get the content of image by id

    app.route("/image/explaination/:id")
        .get(imageControllers.get_image_explaination_by_id) // get the image explaination by id
        .post(imageControllers.post_image_explaination_by_id); // post image explaination by id

    app.route("/image/request/:id")
        .get(imageControllers.get_image_request_by_id) // get the image explaination request by id
        .post(imageControllers.post_image_request_by_id); // post the image explaination request by id


    app.route("/gif").get(gifControllers.pick_one_gif); 
    app.route("/gif/:id").get(gifControllers.pick_id_gif); // get a specific gif with id

    app.route("/gif/content/:id").get(gifControllers.get_gif_by_id); 

    app.route("/gif/explaination/:id")
        .get(gifControllers.get_gif_explaination_by_id) 
        .post(gifControllers.post_gif_explaination_by_id); 

    app.route("/gif/request/:id")
        .get(gifControllers.get_gif_request_by_id) 
        .post(gifControllers.post_gif_request_by_id); 


    app.route("/video").get(videoControllers.pick_one_video); 
    app.route("/video/:id").get(videoControllers.pick_id_video); // get a specific video with id

    app.route("/video/content/:id").get(videoControllers.get_video_by_id); 

    app.route("/video/explaination/:id")
        .get(videoControllers.get_video_explaination_by_id) 
        .post(videoControllers.post_video_explaination_by_id); 

    app.route("/video/request/:id")
        .get(videoControllers.get_video_request_by_id) 
        .post(videoControllers.post_video_request_by_id); 
};

// test on 46479771
