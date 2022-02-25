const express = require('express');
const router = express.Router();
const mysql  = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'quanlibanhang1',
    multipleStatements: true
});


let bodyParser = require("body-parser");

let urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/home', (req, res) => {
    if (!req.session.loggedin) {
        res.send('Please login to view this page!');
        res.end();
    }
    var sql = "SELECT MaHDB,NgayBan,Noidung,tbl_khachhang.TenKH,tbl_trangthai.kieuTT FROM tbl_khachhang,tbl_hoadonban,tbl_trangthai WHERE tbl_trangthai.maTT = tbl_hoadonban.MaTT; SELECT * FROM tbl_hoadonban WHERE MaTT=0;SELECT * FROM tbl_hoadonban WHERE MaTT=1;SELECT * FROM tbl_hoadonban WHERE MaTT=2";
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error);
        }else{
            var name = req.session.username;
            var sumOrder = results[0].length;
            var processingOrder = results[1].length;
            var preparedOrder = results[2].length;
            var deliveryOrder = results[3].length;
            res.render('index', {
                name: name,
                sumOrder: sumOrder,
                processingOrder: processingOrder,
                preparedOrder: preparedOrder,
                deliveryOrder: deliveryOrder,
                data: results[0]
            });
        }
    });
});

router.get('/product', (req,res) =>{
    if (!req.session.loggedin) {
        res.send('Please login to view this page!');
        res.end();
    }
    var sql = "SELECT MaMH,TenMH,SL,DonGia,DVT,HinhAnh,tbl_mathang.GhiChu,tbl_mathang.MaLH, TenLH FROM tbl_mathang, tbl_loaihang WHERE tbl_loaihang.MaLH = tbl_mathang.MaLH ; SELECT MaLH, TenLH FROM tbl_loaihang";
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            var name = req.session.username;
            res.render('product', {
                name: name,
                data: results[0],
                loaihang: results[1],
                message: req.flash('message')
            });
        }
    });
});

let multer = require("multer");

const storageByProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image/product')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        let str = file.originalname.split('.')[0];
        cb(null, str + '-' + uniqueSuffix +'.'+ file.originalname.split('.')[1])
    }
});

const upload = multer({ storage: storageByProduct }).single('uploadfile');

router.post('/product/add', urlencodedParser, (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.send("error 1");
        } else {
            if(req.file == undefined){
                return res.send("File loi");
            }else{
                var tenMH = req.body.TenMH;
                var image = req.file.filename;
                var SL = req.body.SL;
                var DonGia = req.body.DonGia;
                var DVT = req.body.DVT;
                var ghichu = req.body.GhiChu;
                var MaLH = req.body.MaLH;
                var sql = "INSERT INTO tbl_mathang (TenMH, SL, DonGia, DVT,HinhAnh, GhiChu, MaLH) VALUES ('"+tenMH+"', '"+SL+"','"+DonGia+"','"+DVT+"','"+image+"','"+ghichu+"','"+MaLH+"')";
                connection.query(sql, function (err, result) {
                    if (err) {
                        return res.send(err.message);
                        res.end();
                    }
                    console.log("1 record inserted");
                    req.flash('message',"Add successfully");
                    return res.redirect('/product');
                });
            }
        }
    });
});

router.get('/product/delete/:id', (req, res) =>{
    connection.query('delete from tbl_mathang where MaMH = ' + req.params.id, function (err, result) {
        if (err) {
            return res.send('Loi');
            res.end();
        }
        req.flash('message',"Deleted successfully");
        return res.redirect('/product');
    });
});

router.post('/product/edit', urlencodedParser, (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.send("error 1");
        } else {
            if (req.file == undefined) {
                var maMH = req.body.MaMH;
                var tenMH = req.body.TenMH;
                var SL = req.body.SL;
                var DonGia = req.body.DonGia;
                var DVT = req.body.DVT;
                var ghichu = req.body.GhiChu;
                var MaLH = req.body.MaLH;
                connection.query("UPDATE tbl_mathang SET TenMH='" + tenMH + "',SL='" + SL + "',DonGia='" + DonGia + "',DVT='" + DVT + "',GhiChu='" + ghichu + "',MaLH='" + MaLH + "' WHERE MaMH=" + maMH, function (err, result) {
                    if (err) {
                        return res.send(err.message);
                        res.end();
                    }
                    console.log("1 record inserted");
                    req.flash('message', "Update successfully");
                    return res.redirect('/product');
                });
            } else {
                var maMH = req.body.MaMH;
                var tenMH = req.body.TenMH;
                var image = req.file.filename;
                var SL = req.body.SL;
                var DonGia = req.body.DonGia;
                var DVT = req.body.DVT;
                var ghichu = req.body.GhiChu;
                var MaLH = req.body.MaLH;
                connection.query("UPDATE tbl_mathang SET TenMH='" + tenMH + "',SL='" + SL + "',DonGia='" + DonGia + "',DVT='" + DVT + "',HinhAnh='"+image+"',GhiChu='" + ghichu + "',MaLH='" + MaLH + "' WHERE MaMH=" + maMH, function (err, result) {
                    if (err) {
                        return res.send(err.message);
                        res.end();
                    }
                    console.log("1 record inserted");
                    req.flash('message', "Update successfully");
                    return res.redirect('/product');
                });
            }
        }
    })
});

router.get('/category', (req,res) =>{
    if (!req.session.loggedin) {
        res.send('Please login to view this page!');
        res.end();
    }
    var sql = "SELECT * FROM tbl_loaihang";
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            var name = req.session.username;
            res.render('category', {
                name: name,
                data: results,
                message: req.flash('message')
            });
        }
    });
});

router.get('/cart', (req,res) =>{
    if (!req.session.loggedin) {
        res.send('Please login to view this page!');
        res.end();
    }
    var sql = "SELECT MaHDB,NgayBan,Noidung,tbl_khachhang.TenKH,tbl_trangthai.KieuTT,tbl_trangthai.MaTT FROM tbl_khachhang,tbl_hoadonban,tbl_trangthai WHERE tbl_trangthai.MaTT = tbl_hoadonban.MaTT; SELECT * FROM tbl_trangthai";
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            var name = req.session.username;
            res.render('cart', {
                name: name,
                data: results[0],
                trangthai: results[1],
                message: req.flash('message')
            });
        }
    });
});

router.post('/cart/edit', urlencodedParser, (req,res) =>{
    var MaHDB = req.body.MaHDB;
    var MaTT = req.body.MaTT;
    connection.query("UPDATE tbl_hoadonban SET MaTT='"+MaTT+"' WHERE MaHDB= " + MaHDB, function (err, result) {
        if (err) {
            return res.send(err.message);
            res.end();
        }
        req.flash('message',"Update successfully");
        return res.redirect('/cart');
    });
});

router.post('/category/add', urlencodedParser, (req, res) => {
    var tenLH = req.body.TenLH;
    var mota = req.body.MoTa;
    var ghichu = req.body.GhiChu;
    var sql = "INSERT INTO tbl_loaihang (TenLH, MoTa, GhiChu) VALUES ('"+tenLH+"', '"+mota+"','"+ghichu+"')";
    connection.query(sql, function (err, result) {
        if (err) {
            return res.send(err.message);
            res.end();
        }
        console.log("1 record inserted");
        req.flash('message',"Add successfully");
        return res.redirect('/category');
    });
});

router.post('/category/edit', urlencodedParser, (req, res) => {
    var tenLH = req.body.TenLH;
    var mota = req.body.MoTa;
    var ghichu = req.body.GhiChu;
    var maLH = req.body.MaLH
    connection.query("UPDATE tbl_loaihang SET TenLH='"+tenLH+"',MoTa='"+mota+"',GhiChu='"+ghichu+"' WHERE MaLH=" + maLH, function (err, result) {
        if (err) {
            return res.send(err.message);
            res.end();
        }
        console.log("1 record inserted");
        req.flash('message',"Update successfully");
        return res.redirect('/category');
    });
});

router.get('/category/delete/:id', (req, res) =>{
    connection.query('delete from tbl_loaihang where MaLH = ' + req.params.id, function (err, result) {
        if (err) {
            return res.send('Loi');
            res.end();
        }
        req.flash('message',"Deleted successfully");
        return res.redirect('/category');
    });
});

router.get('/user', (req,res) =>{
    if (!req.session.loggedin) {
        res.send('Please login to view this page!');
        res.end();
    }
    var sql = "SELECT * FROM tbl_khachhang";
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            var name = req.session.username;
            res.render('user', {
                name: name,
                data: results,
                message: req.flash('message')
            });
        }
    });
});
module.exports = router;