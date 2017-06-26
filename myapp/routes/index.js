var express = require('express');
var router = express.Router();

/* GET home page. */
//getting user session
router.get('/',function(req,res){
    sess = req.session;
    console.log('Index:' + sess.email);
    if(sess.email) {
        /*
        * This line check Session existence.
        * If it existed will do some action.
        */
            res.redirect('/admin');
        }
        else {
            res.render('index');
    }
});

module.exports = router;
