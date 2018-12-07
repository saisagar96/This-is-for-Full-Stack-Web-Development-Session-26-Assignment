var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;
var router = express.Router();

app.set('view engine', 'ejs');

app.use('/', router);    
app.listen(port);
console.log('REST API is runnning at ' + port);

router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request will be done here');
    next(); // make sure we go to the next routes and don't stop here
});
 
router.route('/Products').get(function (req, res) {
     MongoClient.connect(url, function(err, db){
         if(err)
            throw err;
            var dbo = db.db("Mobilesdb");
        dbo.collection("MobilePhones").find({}).toArray(function(err, result){
        if(err)
            throw err;
        res.send(result);
        db.close();
        })
     })
});

router.route('/').get(function(req, res){
    res.sendFile(__dirname + '/index.html');
})

router.route('/addProduct').post(function (req, res) {
    MongoClient.connect(url, function(err, db){ // Connecting to Database
        if(err)
           throw err;
           var dbo = db.db("Mobilesdb");
           var myObj = { name: req.body.Productname, price: req.body.Prodprice, availability: req.body.Prodstock};
       dbo.collection("MobilePhones").insert(myObj, function(err, result){ // Inserting data entered into collections
       if(err)
           throw err;
            console.log("New product added");

            // login to display records from database after post and render in Product Details HTML page
            dbo.collection("MobilePhones").find({}).toArray(function(err, docs){
                if(err)
                    throw err;
                res.render('products', {data: docs});
           }); 
            // end here

       db.close();
       })
    })
});