const firebase = require('../services/firebase')
const galleryRef = firebase.database.ref("/galleries")
const GalleryResource = require('../resources/GalleryResource')
const ImageHelper = require('./helpers/image_helper')

exports.getAllGalleries = (req, res) => {
    galleryRef.once('value')
        .then(value => res.status(200).send(GalleryResource.createResourceArray(value)))
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}

exports.getGallery = (req, res) => {
    const id = req.params.galleryId
    galleryRef.child(id).once('value')
        .then(value => res.status(200).send(GalleryResource.createResource(value.key, value.val())))
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}

// ADD VALIDATION
exports.editGallery = (req, res) => {
    const id = req.params.galleryId
    galleryRef.child(id).update(req.body)
        .then(() => ref.child(id).once('value'))
        .then(value => res.status(200).send(GalleryResource.createResource(value.key, value.val())))
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}

exports.deleteGallery = (req, res) => {
    const id = req.params.galleryId
    galleryRef.child(id).once('value')
        .then(value => ImageHelper.deleteImages(value.val().images))
        .then(_ => galleryRef.child(id).remove())
        .then(() => res.status(204).send())
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}

exports.createGallery = (req, res) => {
    ImageHelper.uploadImages(req.files)
        .then(imageRefs => imageRefs.map($0 => $0[1].name))
        .then(imageIds => Promise.all([ImageHelper.removeLocalImages(req.files), imageIds]))
        .then(([_, ids]) => {
            let item = JSON.parse(JSON.stringify(req.body))
            item.images = ids
            return galleryRef.push(item)
        })
        .then(value => value)
        .then(link => Promise.all([link.once('value'), link.key]))
        .then(([item, id]) => res.status(201).send(GalleryResource.createResource(id, item.val())))
        .catch(error => res.status(500).send(error))
        .finally(() => res.end())
}

