var express=require("express");
var bodyParser=require('body-parser');
const router = express.Router();
var connection = require('./config/database.js');
const path = require('path');
var app = express();
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const auth = require('./routes/auth')(router);
app.use('/auth', auth);



// const property = require('./routes/property')(router);
// app.use('/property', property);

const store = require('./routes/store')(router);
app.use('/store', store);

const employe = require('./routes/employe')(router);
app.use('/employe', employe);

const property_class = require('./routes/property_class')(router);
app.use('/property_class', property_class);

const property = require('./routes/property')(router);
app.use('/property', property);

const property_model = require('./routes/property_model')(router);
app.use('/property_model', property_model);

const request = require('./routes/request')(router);
app.use('/request', request);

const department = require('./routes/department')(router);
app.use('/department', department);



app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {  
    res.sendFile(path.join(__dirname + '/client/index.html'));
});  

 

app.listen(8012);