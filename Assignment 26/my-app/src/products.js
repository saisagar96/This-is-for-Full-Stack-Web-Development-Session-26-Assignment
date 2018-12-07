var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Mobilesdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Productsdb");
  var myobj = [
    {
        name:"Learning javascript Data Structures And Algorithms",
        Description:"Understand common data structures and the associated algorithms, as well as the context they are used",
        price:898.00,
        Availability:true
    },
    {
        name:"LG 7.0 KG SEMI-AUTOMATIC TOP LOADING WASHING MACHINE",
        Description:"Semi-automatic top-loading washing machine",
        price:12500.00,
        Availability:true
    },
    {
        name:"YONEX VOLTRIC 7DG BADMINTON RACQUET",
        Description:"It is easy to play",
        price:550.00,
        Availability:true
    }
  ];
  dbo.collection("Products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res);
    db.close();
  });
});