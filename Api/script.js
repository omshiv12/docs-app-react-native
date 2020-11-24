
const args = argv.shift();

const arr = argv.join(" ");

const params = arr.split(',');

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

if(params['0']== 'insert'){
    const data = JSON.parse(params['2']);
    if(data.length!=0){
        query = db.collection(params['1']).insertOne(data,function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
    }
}