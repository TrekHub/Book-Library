if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// importing the packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')


//importing our routes
const indexRoutes = require('./routes/index');
const authorRoutes = require('./routes/authors')
const bookRoutes = require('./routes/books')


//initialize express app
const app = express();


//set the views engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


//connecting to our models 
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL , {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))




//using our routes
app.use('/', indexRoutes);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes)



// firing the up the server
app.listen(process.env.PORT || 5000);