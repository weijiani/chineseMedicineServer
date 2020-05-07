var express = require('express');
var router = express.Router();
var model = require('../model');

/* GET home page. */

router.post('/postMedicalPay', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
    db.collection('medicalPay').insertOne(data,function(err,success){
      if(err){
        res.send({
          resCode: 0,
          des: "提交失败"
        })
      }else{
        res.send({
          resCode: 1,
          des: "提交成功"
        })
      }
    })
  })
});
router.post('/getMedicalPay', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('medicalPay').find(data).toArray(function (err, result) {
        if(err){
            res.send({
                resCode: 0,
                des: "操作失败"
            })
        }else {
          result.forEach((item) => {
            item.allPay = item.TCMTreatmentPay + item.drugPay
          });
          res.send({
              resCode: 1,
              medicinePayList: result,
              des: "操作成功（诊间缴费）"
          }) 
        }
      })
  })
});

router.post('/deleMedicalPay', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('medicalPay').deleteOne(data,function (err, result) {
        if(err){
            res.send({
                resCode: 0,
                des: "删除诊间缴费失败"
            })
        }else {
          console.log(11,result)
          res.send({
              resCode: 1,
              des: "删除诊间缴费成功"
          }) 
        }
      })
  })
});


module.exports = router;
