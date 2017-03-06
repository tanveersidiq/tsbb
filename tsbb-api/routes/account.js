var routes = function (router, user) {

    var accountRouter = router.Router();

    accountRouter
        .post('/account/register', function (req, res) {

            user
                .findOne({
                        'local.email': req.body.email
                    },
                    function (err, users) {
                        if (users) {
                            res
                                .status(409)
                                .json({
                                    'message': "Email already registered."
                                });
                        } else {

                            new user({
                                    'local.email': req.body.email,
                                    'local.password': req.body.password
                                })
                                .save(
                                    function (err, user, count) {
                                        res
                                            .status(201)
                                            .json({
                                                'message': "User created.",
                                                'data': user
                                            });
                                    });
                        }
                    });
        })
        .post('/account/login', function (req, res) {
            user
                .findOne({
                        'local.email': req.body.email,
                        'local.password': req.body.password
                    },
                    function (err, users) {
                        if (!users) {
                            res
                                .status(401)
                                .json({
                                    'message': "Authentication failed."
                                });
                        } else {
                            res
                                .status(200)
                                .json({
                                    'data': users
                                });
                        }
                    });
            // var token = req.body.token;
            // jwt.verify(token, process.env.JWT_SECRET, {
            //     ignoreExpiration: false
            // }, function (err, decoded) {
            //     if (err) {
            //         return res.status(403).json({
            //             success: false,
            //             message: 'Invalid token.'
            //         });
            //     } else {
            //         var userModel = {
            //             token: token,
            //             userName: decoded.userName
            //         };
            //         res.status(200).json(userModel);
            //     }
            // });
        });

    return accountRouter;
};

module.exports = routes;