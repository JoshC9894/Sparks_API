const firebase = require('../../services/firebase')
const storageRef = firebase.storage.bucket()
const fs = require('fs-extra')

exports.getImage = (id) => {
    return storageRef.file(id).download()
}

exports.uploadImages = (images) => {
    let imagePromises = images.map($0 => storageRef.upload(`${$0.path}`))
    return Promise.all(imagePromises)
}

exports.deleteImages = (ids) => {
    let imagePromises = ids.map($0 => storageRef.file($0).delete())
    return Promise.all(imagePromises)
}

exports.removeLocalImages = (images) => {
    let removePromises = images.map($0 => fs.remove($0.path))
    return Promise.all(removePromises)
}