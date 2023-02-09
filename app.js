const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile')
const passportSetup = require('./config/passportsetup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//set view engine
app.set('view engine','ejs');

//connect to mongo db
mongoose.connect(keys.mongodb.dbURI,()=>{
    app.listen(4000);
})

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(3000,() =>{
    console.log('Started')
})
