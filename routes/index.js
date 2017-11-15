var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

// Connect to the DB.
mongoose.connect('mongodb://localhost/phoneNumberDB', { useMongoClient: true });

var phoneNumberSchema = mongoose.Schema({ //Defines the Schema for this DB
  Name: String,
  PhoneNumber: String
});

var PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema); 

var db = mongoose.connection; //Stores the connection as variable we can use
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {//Lets us know when we are connected
  console.log('Connected to DB');
});

/* DELETE phone numbers from database */
router.delete('/phonenumber', function(req, res, next) {
  console.log("DELETE phone number route");
  db.collection("phonenumbers").remove({});
  res.sendStatus(200);
});


/* GET phone numbers from database */
router.get('/phonenumber', function(req, res, next) {
  console.log("In the GET route");
  PhoneNumber.find(function(err,phoneNumberList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
        else {
          console.log(phoneNumberList); //Otherwise console log the comments you found              
    	  res.json(phoneNumberList);
        }
  })

});

/* POST (add) phone number to database */
router.post('/phonenumber', function(req, res, next) {
  console.log("POST phone number route");
  console.log(req.body);
  var newphonenumber = new PhoneNumber(req.body); //[3]
  console.log(newphonenumber); //[3]
  newphonenumber.save(function(err, post) { //[4]
    if (err) return console.error(err);
      console.log(post);
        res.sendStatus(200);
  });
});
module.exports = router;
