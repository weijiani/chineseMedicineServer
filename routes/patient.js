var express = require('express');
var router = express.Router();
var model = require('../model');
/* GET users listing. */
function postPayRecord (data,res){
  let { username,createTime,pay,payWay,payDes,depName} = data
  console.log(data)
  model.connect(function(db){
      db.collection('payRecord').insertOne({ username,createTime,pay,payWay,payDes,depName},function(err,success){
        if(err){
          res.send({
            resCode: 0,
            des: "支付信息提交失败"
          });
          console.log('错误')
        }else{
          res.send({
            resCode: 1,
            des: "支付信息提交成功"
          });
          console.log("成功")
        }
      })
  })
}

  
  router.post('/appointment', function(req, res, next) {
    let data = req.body
    let updateFlag = data.updateFlag
    console.log(data)
    model.connect(function(db){
        if(!updateFlag){
          db.collection('appointmentRecord').insertOne(data,function(err,success){
            if(err){
              res.send('支付失败');
            }else{
              res.send({
                resCode: 1,
                des: "预约成功"
              });
            }
          })
        }else{
          db.collection('appointmentRecord').updateOne({
            username: data.patientName,
            doctorName: data.doctorName,
            overFlag: false
          },{$set:{
            overFlag: true
          }},function (err, result) {
            if(err){
                res.send({
                    resCode: 0,
                    des: "更新预约失败"
                })
            }else {
              res.send({
                  resCode: 1,
                  des: "更新预约成功"
              }) 
            }
          })
        }
    })
  });

  router.post('/postPayRecord', function(req, res, next) {
    let data = req.body
    postPayRecord (data,res)
  });

  

  router.post('/getPayRecordList', function(req, res, next) {
    let data = req.body
    console.log(data)
    model.connect(function(db){
      if(data=={}){
        db.collection('payRecord').find().toArray(function (err, result) {
          if(err){
              res.send({
                  resCode: 0,
                  des: "查询费用记录失败"
              })
          }else {
            res.send({
                resCode: 1,
                payRecordList: result
            }) 
          }
        })
      }else{
        db.collection('payRecord').find(data).toArray(function (err, result) {
          if(err){
              res.send({
                  resCode: 0,
                  des: "查询费用记录失败"
              })
          }else {
            res.send({
                resCode: 1,
                payRecordList: result
            }) 
          }
        })
      }
       
    })
  });
  router.post('/getAppointRecordList', function(req, res, next) {
    let data = req.body
    model.connect(function(db){
      if(data=={}){
        db.collection('appointmentRecord').find().toArray(function (err, result) {
          if(err){
              res.send({
                  resCode: 0,
                  des: "查询预约记录失败"
              })
          }else {
            res.send({
                resCode: 1,
                appointRecordList: result
            }) 
          }
        })
      }else{
        db.collection('appointmentRecord').find(data).toArray(function (err, result) {
          if(err){
              res.send({
                  resCode: 0,
                  des: "查询预约记录失败"
              })
          }else {
            res.send({
                resCode: 1,
                appointRecordList: result
            }) 
          }
        })
      }
       
    })
  });
  router.post('/cancelAppoint', function(req, res, next) {
    let data = req.body
    model.connect(function(db){
        db.collection('appointmentRecord').deleteOne(data,function (err, result) {
          if(err){
              res.send({
                  resCode: 0,
                  des: "取消预约失败"
              })
          }else {
            console.log(11,result)
            res.send({
                resCode: 1,
                des: "取消预约成功"
            }) 
          }
        })
    })
  });

 


module.exports = router;
