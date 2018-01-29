var {User} = require('./../models/users');


var authenticate = (req, res, next) => {
    console.log('Auth called');
    var token = req.cookies['user-auth'];
    console.log(token);

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject("Invalid Token");
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        console.log(e);
        res.status(401).send();
    });
};

module.exports = {authenticate};
