var express = require('express');
var router = express.Router();
var model = require('../model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/regist', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('users').insertOne(data,function(err,success){
        if(err){
          // console.log('err',err)
          res.send('注册失败');
        }else{
          // console.log('success',success)
          res.send({
            resCode: 1,
            des: "注册成功"
          });
        }
      })
  })
});

router.post('/login', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
    db.collection('users').find(data).count(function (err, result) {
      if(err){
        console.log("err",err)
      }else{
        if(result!==0){
          res.send({
            resCode: 1,
            des: "登陆成功",
            token: data.role,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            role: data.role,
            username: data.username
          });
        }else{
          res.send({
            resCode: 0,
            des: "登录失败"
          });
        }
      }
    });
  })
});

router.post('/postUserDetail', function(req, res, next) {
  let data = req.body
  let  newSubmit = data.newSubmit
  delete data.newSubmit
  model.connect(function(db){
      if(newSubmit) {
        db.collection('userDetail').insertOne(data,function (err, result) {
          if(err){
              res.send({
                  resCode: 0,
                  des: "提交信息失败"
              })
          }else {
            res.send({
                resCode: 1,
                des: "提交信息成功"
            }) 
          }
        })
      }else{
        db.collection('userDetail').updateOne({username: data.username},{$set:{
          name: data.name,
          age: data.age,
          birthData: data.birthData,
          sex: data.sex,
          telNumber: data.telNumber,
          region: data.region
        }},function (err, result) {
          if(err){
            console.log(err)
              res.send({
                  resCode: 0,
                  des: "更新信息失败"
              })
          }else {
            res.send({
                resCode: 1,
                des: "更新信息成功"
            }) 
          }
        })
      }
     
  })
});

router.post('/getUserDetail', function(req, res, next) {
  let data = req.body
  model.connect(function(db){
      db.collection('userDetail').find(data).toArray(function (err, result) {
        if(err){
            res.send({
                resCode: 0,
                des: "查询用户详细信息失败"
            })
        }else {
          res.send({
              resCode: 1,
              des: "查询用户详细信息成功",
              userDetail: result
          }) 
        }
      })
  })
});

module.exports = router;
