var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// //View Engine
// app.set('views', path.join(__dirname, 'client/dist'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'client/dist')));

// app.use('/', index);
app.use('/api/', todos);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(3000, function(){
  console.log('Server started at port 3000');
});
