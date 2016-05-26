var express = require('express');
var bodyParser = require('body-parser');
var app     = express();


app.use(bodyParser.urlencoded({ extended: true })); 



app.post('/ifsc', function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/banks';
MongoClient.connect(url, function (err, db) {
    if(err){
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
 
    console.log('Connection established to', url);

  
  //  var bankAddr ="SAMRIDDHI BHAVAN, 4TH FLOOR, 1, STRAND ROAD, KOLKATA - 700001";
  var latitude = parseFloat(req.body.lati);
  var longitude = parseFloat(req.body.long);
 var arr= [longitude,latitude];
// console.log(arr);
   // console.log(db.collection("sbi").find({"ADDRESS":bankAddr}).toArray());
   // var cursor = db.collection("sbi").find({loc: {$near:arr}}).limit(9);
   var cursor = db.collection("sbi").find({loc: {$near:arr,$maxDistance:30/111.12}}).limit(9);
    cursor.toArray(function(err,docs){
        console.log(docs);
       if(err){
            throw err;
        }
        if(docs.length>0){
            res.write("<html>");
        docs.forEach(function(doc) {
           // res.send("Bank: "+doc['BANK']+"\n \n"+"Branch: "+doc['BRANCH']+"\n\n"+"Address: "+doc['ADDRESS']+"\n\n"+"IFSC code:"+doc['IFSC']);
          res.write("<p>Bank:"+doc['bank']+"</p>"+"<p>Branch:"+doc['branch']+"</p>"+"<p>Address:"+doc['address']+"</p>"+"<p>IFSC code:"+doc['ifsc']+"</p>");
        
            res.write("<hr>");
        });
         res.write("</html>");
         res.end();
        }
        else{
            res.send("No records found");
            res.end();
        }
        db.close();
         //Close connection
            
        });
    

   
     
  }

});

});

app.listen(3000, function() {
  console.log('Server running at http://127.0.0.1:3000/');
});
