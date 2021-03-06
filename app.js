var express  = require('express');
var app = express();


app.set('port', (process.env.PORT || 3000));


app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html')
});


app.listen(app.get('port'), function(){
    console.log("listening on port " + app.get('port'));
});
