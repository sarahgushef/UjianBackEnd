var express = require('express');
var app = express();


var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'toko3'
})

var bodyParser = require('body-parser');
app.use(bodyParser.json());
db.connect();



app.post('/karyawan', function(req, res){
    var a = new Date()
    var tahun = a.getFullYear()
    var nama_req = req.body.nama
    var hari_req = req.body.tglLahir.substr(0, 2)
    var bulan_req = req.body.tglLahir.substr(3, 2)
    var tahun_req = req.body.tglLahir.substr(6, 4)
    var usia_req = tahun - tahun_req
    
    var data = {
        no: 'Null',
        nama: nama_req,
        hari: hari_req,
        bulan: bulan_req,
        tahun: tahun_req,
        usia: usia_req
    }



    var sql = 'insert into karyawan set ?'    
        db.query(sql, data, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Data sukses diinput!')
        });
});

app.get('/karyawan', function(req, res){
    var sql = 'SELECT * FROM karyawan';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server aktif @port 3000')
});




