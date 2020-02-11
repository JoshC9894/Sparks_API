const gallery_controller = require('../controllers/gallery_controller')
const photo_controller = require('../controllers/photo_controller')
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './tmp/'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
var upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 32 // 32mb
} })

module.exports = (app) => {
    app.route('/gallery')
        .get(gallery_controller.getAllGalleries)
        .post(upload.array('photos', 50), gallery_controller.createGallery)

    app.route('/gallery/:galleryId')
        .get(gallery_controller.getGallery)
        .put(gallery_controller.editGallery)
        .delete(gallery_controller.deleteGallery)
        .patch(upload.array('photos', 50), photo_controller.uploadPhotos)


    app.route('/gallery/:galleryId/images/:imageId')
        .delete(photo_controller.deletePhoto)

    app.route('/image/:imageId')
        .get(photo_controller.getPhoto)
}