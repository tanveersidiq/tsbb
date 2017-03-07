var jwt = require("jsonwebtoken");

var routes = function (router, models) {

    var accountRouter = router.Router();

    accountRouter
        .get('/account/users', function (req, res) {
            models.Users.findAll({
                    order: 'Email ASC',
                    include: [{
                        model: models.Friends,
                        as: 'Friends',
                        required: false
                    }]
                })
                .then(function (users) {
                    res.status(200).json(users);
                })
                .catch(function (error) {
                    res.status(500).json(error);
                });
        })
        .post('/account/register', function (req, res) {
            models.Users
                .count({
                    where: {
                        Email: req.body.email
                    }
                })
                .then(function (userCount) {
                    if (userCount > 0) {
                        var error = {
                            'message': "Email already registered."
                        };
                        res.status(409).json(error);

                    } else {
                        models.Users.create({
                                Email: req.body.email,
                                Password: req.body.password
                            })
                            .then(function (user) {

                                user.token = jwt.sign({
                                    id: user.dataValues.Id,
                                    email: user.dataValues.Email
                                }, process.env.JWT_SECRET);

                                res.status(200).json(user);
                            })
                            .catch(function (error) {
                                res.status(406).json(error);
                            });
                    }
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });

        })
        .post('/account/login', function (req, res) {
            models.Users.findOne({
                    where: {
                        Email: req.body.email,
                        Password: req.body.password,
                    }
                })
                .then(function (user) {
                    if (user === null) {
                        var error = {
                            'message': 'Authentication failed.'
                        };
                        res.status(401).json(error);

                    } else {

                        user.dataValues.token = jwt.sign({
                            id: user.dataValues.Id,
                            email: user.dataValues.Email
                        }, process.env.JWT_SECRET);

                        res.status(200).json(user);

                    }
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });
        })
        .post('/account/requestfriendship', function (req, res) {
            models.Friends.findOne({
                    where: {
                        User: req.userId,
                        Password: req.body.user,
                    }
                })
                .then(function (user) {
                    if (user === null) {
                        var error = {
                            'message': 'Authentication failed.'
                        };
                        res.status(401).json(error);

                    } else {

                        user.dataValues.token = jwt.sign({
                            id: user.dataValues.Id,
                            email: user.dataValues.Email
                        }, process.env.JWT_SECRET);

                        res.status(200).json(user);

                    }
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });
        });

    return accountRouter;
};

module.exports = routes;