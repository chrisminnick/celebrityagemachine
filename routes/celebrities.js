var express = require('express');
var router = express.Router();

router.get('/celebrities.json', function(req, res) {
    var db = req.db;
    db.collection('celebrities').find().toArray(function (err, items) {
        res.json(items);
    });
});


/*
 * DELETE to deletecelebrity.
 */

router.delete('/deletecelebrity/:id', function(req, res) {
    var db = req.db;
    var celebrityToDelete = req.params.id;
    db.collection('celebrities').removeById(celebrityToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
