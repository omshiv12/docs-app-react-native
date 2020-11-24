var mongo = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/myApp";


mongo.connect(url,function(err,db){
    if(err) throw err;
    console.log("Database Created");
    var database = db.db('myApp');
    database.createCollection('patients',function(err,res){
        if(err) throw err;
        console.log("Collection Created");
    })
    db.close();
});