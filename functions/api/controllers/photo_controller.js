const firebase = require('../services/firebase')
const galleryRef = firebase.database.ref("/galleries")
const GalleryResource = require('../resources/GalleryResource')
const ImageHelper = require('./helpers/image_helper')

exports.getPhoto = (req, res) => {
    ImageHelper.getImage(req.params.imageId)
        .then(url => res.status(200).send(url))
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}

exports.uploadPhotos = (req, res) => {
    ImageHelper.uploadImages(req.files)
        .then(imageRefs => imageRefs.map($0 => $0[1].name))
        .then((ids) => Promise.all([ImageHelper.removeLocalImages(req.files), ids]))
        .then(([_, ids]) => Promise.all([galleryRef.child(req.params.galleryId).once('value'), ids]))
        .then(([gallery, ids]) => {
            const imageIds = [gallery.val().images, ids].flatMap($0 => $0)
            return galleryRef.child(req.params.galleryId).update({ images: imageIds })
        })
        .then(_ => galleryRef.child(req.params.galleryId).once('value'))
        .then(item => res.status(200).send(GalleryResource.createResource(item.key, item.val())))
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}

exports.deletePhoto = (req, res) => {
    ImageHelper.deleteImages([req.query.imageId])
        .then(_ => galleryRef.child(req.params.galleryId).once('value'))
        .then(snap => {
            const images = snap.val().images.filter($0 => $0 !== req.query.imageId)
            return galleryRef.child(req.params.galleryId).update({ images: images })
        })
        .then(_ => res.status(204).send())
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}