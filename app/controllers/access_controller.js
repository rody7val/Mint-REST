var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;
var path = require('path');
/**
 * Check logged status in order to
 * give permission to following links.
 */
exports.confirmToken = function (req, res, next) {
    console.log("Somebody logged into system");
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // Check if token exists.
    if (token) {
        jsonwebtoken.verify(token, secretKey, function (err, decoded) {
            if (err) {
                res.status(403).send({success: false, message: "Failed to authenticate"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).send({success: false, message: "No valid token provided"});
    }
};

/**
 * Documentation apidoc view
 */
exports.apidoc = function (req, res, next) {  
    var options = {
        root: config.dir + '/app/routes/doc/',
        dotfiles: 'deny',
        headers:{
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile('index.html', options, function(err){
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else{
            console.log('Sent: apidoc')
        }
    });
}