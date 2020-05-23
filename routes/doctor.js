var express = require('express');
var router = express.Router();
var model = require('../model');
/* GET users listing. */

  
router.post('/getDepOfDoctor', function(req, res, next) {
    let data = req.body
    model.connect(function(db){
        db.collection('depOfDoctor').find(data).toArray(function (err, result) {
          if(err){
            console.log("err",err)
          }else{
           res.send(result)
          }
        });
      })
});
router.post('/getDragList', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('doctorDrug').find(data).toArray(function (err, result) {
        if(err){
          console.log("err",err)
        }else{
         res.send(result)
        }
      });
    })
});
// postDragList
router.post('/postDragList', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('doctorDrug').insertOne(data,function(err,success){
        if(err){
          res.send({
            resCode: 0,
            des: "添加药方失败"
          });
        }else{
          res.send({
            resCode: 1,
            des: "添加药方成功"
          });
        }
      })
  })
});
router.post('/deleteDrug', function(req, res, next) {
  let reqData = req.body
  let data = {
    username: reqData.username,
    dragname: reqData.dragname
  }
  model.connect(function(db){
      db.collection('doctorDrug').deleteOne(data,function (err, result) {
        if(err){
            res.send({
                resCode: 0,
                des: "删除药方失败"
            })
        }else {
          res.send({
              resCode: 1,
              des: "删除药方成功"
          }) 
        }
      })
  })
});
router.post('/uptateDrug', function(req, res, next) {
  let reqData = req.body
  console.log(reqData)
  let findData = {
    drugId: reqData.drugId,
    username: reqData.username
  }
  console.log(findData)
  model.connect(function(db){
    db.collection('doctorDrug').updateOne(findData,{$set:{
      dragname: reqData.dragname,
      ingredient: reqData.ingredient,
      usage: reqData.usage,
    }},function (err, result) {
      if(err){
          res.send({
              resCode: 0,
              des: "更新药方失败"
          })
      }else {
        res.send({
            resCode: 1,
            des: "更新药方成功"
        }) 
      }
    })
  })
});
router.post('/postMedicalRecord', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('medicalRecord').insertOne(data,function(err,success){
        if(err){
          res.send({
            resCode: 0,
            des: "提交病历失败"
          });
        }else{
          res.send({
            resCode: 1,
            des: "提交病历成功"
          });
        }
      })
  })
});

// 获取病历列表
router.post('/getMedicalRecordList', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('medicalRecord').find(data).toArray(function (err, result) {
        if(err){
          res.send({
            resCode: 0,
            des: "查询患者病历失败",
          })
        }else{
         res.send({
           resCode: 1,
           des: "查询患者病历成功",
           medicalRecordList: result
         })
        }
      });
    })
});

module.exports = router;
