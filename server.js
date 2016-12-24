var express = require('express');
var ejs = require('ejs');
var path = require('path');
var mongoose = require('mongoose');
var shortid = require('shortid');

mongoose.connect();

var urls = require('./models/urlModel');

var app = express()
app.set('view engine', 'ejs');
app.use('/views', express.static(path.join(__dirname, 'views')))

app.get('/', function (req, res) {
  res.render('index')
})

//get around favicon request
app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

app.get('/new/:url(*)', function(req, res){
       //set pattern and check if url is valid
        var urlPatt = /^(ftp|http|https):\/\/[^ "]+$/
        var url = req.params.url
        var test = urlPatt.test(url.toString());
      // if not valid alert user
        if(!test){
          res.send("Please enter a valid URL.");
        }
        else{
          var UrlSave = urls({
          url: url
       }) 
      // save url to db.
        UrlSave.save(function(err){
          if(err){return err};
          
        })
        
        // return original url and saved url, which happens to be the id of the record.
        var data = {
          'original_url' : url,
          'short_url' : req.protocol + '://' + req.get('host') + '/' + UrlSave._id
        }
    
    res.send(JSON.stringify(data));
      }
})

app.get('/:test', function(req, res){
        var id = req.params.test;
        console.log(id);
        
        //redirect to url on id
        urls.findById(id, function(err, url){
          if(err){return err};
          console.log(url);
          res.redirect(url.url);
        })
        
    
  
})

app.listen(process.env.PORT || 80, function () {
  console.log('listening on port 8080!')
})