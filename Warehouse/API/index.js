const express = require('express')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const bodyParser = require('body-parser');
const cors = require('cors');

const url = "mongodb://admin:delladmin1@ds255320.mlab.com:55320/dell"

const app = express()

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

MongoClient.connect(url,function(err,db){
  if(err){
    throw err
  }
  var dbo = db.db("dell")
  app.post('/addprod',function(req,res){
    const product = {
      "name": req.body.name,
      "descrip": req.body.descrip,
      "features": req.body.features,
      "options": req.body.options,
      "quantity": req.body.quantity
    }
    dbo.collection("proddata").insertOne(product,function(err,result){
      if(err){
        throw err
      }
      res.send(result.ops[0])
    })
  })
  app.post('/addtrans',function(req,res){
    const trans = {
      "id": req.body.id,
      "placedby": req.body.placedby
    }
    dbo.collection("transdata").insertOne(trans,function(err,result){
      if(err){
        throw err
      }
      res.send(result.ops[0])
    })
  })
  app.get('/gettrans',function(req,res){
    dbo.collection("transdata").find({}).toArray(function(err,result){
      if(err){
        throw err
      }
      res.send(result)
    })
  })
  app.get('/getprod',function(req,res){
    dbo.collection("proddata").find({}).toArray(function(err,result){
      if(err){
        throw err
      }
      res.send(result)
    })
  })
})

app.listen(PORT,function(){
  console.log("Listening to " + PORT)
})
