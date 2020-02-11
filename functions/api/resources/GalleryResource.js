exports.createResource = (id, item) => {
    item.id = id
    return item
}

exports.createResourceArray = (snapshot) => {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.id = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}