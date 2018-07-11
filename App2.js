var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://sarahgushef:1234@localhost:27017/dataCPU';


var os = require('os');
var namaCPU = os.hostname()
var osTipe = os.type()
var osPlatform ='os.platform()'
var osRilis = os.release()
var dirAwal =  os.homedir()
var ramSisa = os.freemem()
var ramTotal= os.totalmem()


MongoClient.connect(url, function(err, db){
    console.log("Terhubung ke MongoDB!");
})

app.post('/data', (req,res) => {
    MongoClient.connect(url, (err, db) => {
        var data = {namacpu: namaCPU, tipe: osTipe, platform: osPlatform, rilis: osRilis, ramSisa: ramSisa, ramTotal: ramTotal}
        var collection = db.collection('data');
        collection.insert(data, (err, result) => {
            console.log(result);
            res.send(result);
        });
    });
})

app.get('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection('data');
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
            res.send(docs);
        });
    });
});


app.listen(3210, () => {
    console.log('Server aktif di port 3210')
});