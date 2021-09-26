const controllers = require('../controllers/controller');

module.exports = app => {
    app
        .route('/image')
        .get(controllers.pick_one_image)

    app
        .route('/gif')
        .get(controllers.pick_one_gif)


    // app
    //     .route('/video')
    //     .get(controllers.pick_one_video)

};