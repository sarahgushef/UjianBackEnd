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

    var zod_signs = ["Capricorn" , "Aquarius", "Pisces", "Aries",
"Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio",
"Sagitarius"];
    
var zodiacSign = "";
switch(bulan_req)
{
	case 1: {//January
			 if(hari_req < 20)
		 		zodiacSign = zod_signs[0];
			 else
		 		zodiacSign = zod_signs[1];
		    }break;
	case 2: {//February
			 if(hari_req < 19)
		 		zodiacSign = zod_signs[1];
			 else
		 		zodiacSign = zod_signs[2];
			}break;
	case 3: {//March
			 if(hari_req < 21)
			 	zodiacSign = zod_signs[2];
			 else
			 	zodiacSign = zod_signs[3];
			}break;
	case 4: {//April
			 if(hari_req < 20)
		 		zodiacSign = zod_signs[3];
			 else
		 		zodiacSign = zod_signs[4];
			}break;
	case 5: {//May
			 if(hari_req < 21)
		 		zodiacSign = zod_signs[4];
			 else
		 		zodiacSign = zod_signs[5];
			}break;
	case 6: {//June
			 if(hari_req < 21)
		 		zodiacSign = zod_signs[5];
			 else
		 		zodiacSign = zod_signs[6];
			}break;
	case 7: {//July
			 if(hari_req < 23)
		 		zodiacSign = zod_signs[6];
			 else
		 		zodiacSign = zod_signs[7];
			}break;
 	case 8: {//August
			 if(hari_req < 23)
		 		zodiacSign = zod_signs[7];
			 else
		 		zodiacSign = zod_signs[8];
			}break;
	case 9: {//September
			 if(hari_req < 23)
		 		zodiacSign = zod_signs[8];
			 else
		 		zodiacSign = zod_signs[9];
			}break;
	case 10: {//October
			 if(hari_req < 23)
		 		zodiacSign = zod_signs[9];
			 else
		 		zodiacSign = zod_signs[10];
			}break;
	case 11: {//November
			 if(hari_req < 22)
		 		zodiacSign = zod_signs[10];
			 else
		 		zodiacSign = zod_signs[11];
			}break;
	case 12: {//December
			 if(hari_req< 22)
		 		zodiacSign = zod_signs[11];
			 else
		 		zodiacSign = zod_signs[0];
			}break;
 }
    
    var data = {
        no: 'Null',
        nama: nama_req,
        hari: hari_req,
        bulan: bulan_req,
        tahun: tahun_req,
        zodiak: zodiacSign,
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




