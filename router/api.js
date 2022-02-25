const express = require('express');
const router = express.Router();
const mysql  = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'quanlibanhang1'
});


let bodyParser = require("body-parser");

let urlencodedParser = bodyParser.urlencoded({extended: false});


router.get("/api/products", (req, res) =>{
    var sql;
    if(req.query.limit == undefined){
        sql = "SELECT MaMH, TenMH, SL, DonGia, DVT, HinhAnh, tbl_mathang.GhiChu, tbl_loaihang.TenLH FROM tbl_mathang, tbl_loaihang WHERE tbl_loaihang.MaLH = tbl_mathang.MaLH";
    }else{
        if(req.query.offset == undefined){
            sql = "SELECT MaMH, TenMH, SL, DonGia, DVT, HinhAnh, tbl_mathang.GhiChu, tbl_loaihang.TenLH FROM tbl_mathang, tbl_loaihang WHERE tbl_loaihang.MaLH = tbl_mathang.MaLH LIMIT "+req.query.limit;
        }else{
            sql = "SELECT MaMH, TenMH, SL, DonGia, DVT, HinhAnh, tbl_mathang.GhiChu, tbl_loaihang.TenLH FROM tbl_mathang, tbl_loaihang WHERE tbl_loaihang.MaLH = tbl_mathang.MaLH LIMIT " + req.query.limit+" OFFSET " +req.query.offset ;
        }
    }
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            if(results < 1){
                res.statusCode = 404;

                return res.send({
                    statusCode: res.statusCode,
                    data: "not found"
                });
            }else{
                return res.send({
                    statusCode: res.statusCode,
                    data: results
                });
            }
        }
    });
});

router.get("/api/products/:id", (req,res) => {
    var sql = "SELECT MaMH, TenMH, SL, DonGia, DVT, HinhAnh, tbl_mathang.GhiChu, tbl_loaihang.TenLH FROM tbl_mathang, tbl_loaihang WHERE tbl_loaihang.MaLH = tbl_mathang.MaLH AND MaMH =  " + req.params.id;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            if(results < 1){
                res.statusCode = 404;

                return res.send({
                    statusCode: res.statusCode,
                    data: "not found"
                });
            }else{
                return res.send({
                    statusCode: res.statusCode,
                    data: results
                });
            }
        }
    });
});

router.get("/api/category", (req, res) => {
    var sql = "SELECT * FROM tbl_loaihang";
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            if(results < 1){
                res.statusCode = 404;

                return res.send({
                    statusCode: res.statusCode,
                    data: "not found"
                });
            }else{
                return res.send({
                    statusCode: res.statusCode,
                    data: results
                });
            }
        }
    });
});

router.get("/api/productbycategory/:id", (req,res) =>{
    var sql = "SELECT MaMH, TenMH, SL, DonGia, DVT, HinhAnh, tbl_mathang.GhiChu, tbl_loaihang.TenLH FROM tbl_mathang, tbl_loaihang WHERE tbl_loaihang.MaLH = tbl_mathang.MaLH AND tbl_mathang.MaLH =  " + req.params.id;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }else{
            if(results < 1){
                res.statusCode = 404;

                return res.send({
                    statusCode: res.statusCode,
                    data: "not found"
                });
            }else{
                return res.send({
                    statusCode: res.statusCode,
                    data: results
                });
            }
        }
    });
});

router.get('/api/test', function(req, res){
    var sql;
    if(req.query.id == undefined){
        sql = "Hello workd";
    }else{
        sql = "Hello world: "+ req.query.id;
    }
    return res.send("test" + sql);
});

module.exports = router;