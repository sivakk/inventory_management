var express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const verifyToken = require('./Auth/auth')
var index = require('./routes/index')
var stock = require('./routes/stock')
var login = require('./routes/login')
var entries = require('./routes/entries')
var kitchen = require('./routes/kitchen')
var users = require('./routes/users')
var dash = require('./routes/dashboard')
var orders = require('./routes/orders')
var carts = require('./routes/carts')
const transactions = require('./routes/transactions');
const issueRoutes = require("./backend/routes/issues");
const timeRoutes = require("./backend/routes/times");
const userRoutes = require("./backend/routes/users");
const mongoose = require("mongoose");


var port = 3000

var app = express();
mongoose
  .connect(
    "mongodb://avin:avin123@ds161790.mlab.com:61790/spaatinv", {
      useNewUrlParser: true
    })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use("/images", express.static(path.join("backend/images")));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

// Body Parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/api', index)
app.use('/api/issues', issueRoutes)
app.use('/api/time', timeRoutes)
app.use('/api/userss', userRoutes)
app.use('/api/stock', verifyToken, stock)
app.use('/api/login', login)
app.use('/api/entries', entries.router)
app.use('/api/kitchen', verifyToken, kitchen)
app.use('/api/users', verifyToken, users)
app.use('/api/dash', verifyToken, dash)
app.use('/api/order', verifyToken, orders)
app.use('/api/cart', verifyToken, carts)
app.use('/api/transactions', verifyToken, transactions)

// Serve only the static files form the dist directory
app.use(express.static('./dist/inventory'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/inventory/index.html'))
})

app.listen(port, function () {
  console.log('Server started on port ' + port)
})