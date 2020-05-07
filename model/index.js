const MongoClient = require('mongodb').MongoClient

let url = 'mongodb://localhost:27017'
let dbName = 'ChineseMedicine'

function connect(callback) {
    MongoClient.connect(url,function(err,client){
        if(err){
            console.log('数据库连接错误',err)
        }else{
            let db = client.db(dbName)
            callback&&callback(db)
            client.close()
        }
    })
}

module.exports = {
    connect
}