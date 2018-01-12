var {User} = require('./../models/users');

var authenticate = (req, res, next) => {
    console.log('Auth called');
    var token = req.cookie('user-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};
