const passport = require('passport');
const GithubStrategy = require('passport-github2');
const keys = require('./keys')
const User = require('../models/users')

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then((user)=>{
            done(null,user);
        })
})

passport.use(
    new GithubStrategy({
        callbackURL: '/auth/github/redirect',
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        //fires after code has been exchanged for info
        //if already have a user
        User.findOne({githubId:profile.id})
            .then((currentUser)=>{
                if(currentUser){
                    console.log('user is:', currentUser)
                    done(null, currentUser)
                }else{
                    new User({
                        username: profile.username,
                        githubId: profile.id
                    }).save().then((newUser)=>{
                        console.log('new user created:'+ newUser)
                        done(null, newUser)
                    })
                }
            })  
    })
)