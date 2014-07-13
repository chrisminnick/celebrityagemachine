var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Celebrity Age Machine' });
});

/* GET Celebritylist page. */
router.get('/celebrities', function(req, res) {
    var db = req.db;
    var collection = db.get('celebrities');
    collection.find({},{},function(e,docs){
        res.render('celebritylist', {
            "celebritylist" : docs
        });
    });
});

/* GET New Celebrity page. */
router.get('/celebrities/add', function(req, res) {
    res.render('addcelebrity', { title: 'Add New Celebrity' });
});

/* POST to New Celebrity Service */
router.post('/savecelebrity', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var birthDate = req.body.birthdate;


    // Set our collection
    var collection = db.get('celebrities');

    // Submit to the DB
    collection.insert({
        "first_name" : firstName,
        "last_name" : lastName,
        "birthdate" : birthDate
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("celebrities");
            // And forward to success page
            res.redirect("celebrities");
        }
    });
});

module.exports = router;
