const router = require('express').Router();
const passport = require('passport')

//auth login
router.get('/login',(req,res)=>{
    res.render('login');
})

//auth logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})

//auth with github
router.get('/github',passport.authenticate('github',{
    scope: ['user:email']
}))

//callback
router.get('/github/redirect',passport.authenticate('github'),(req,res)=>{
    res.redirect('/profile/');
})

module.exports = router;