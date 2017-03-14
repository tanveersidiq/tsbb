var routes = function (router, models) {

    var friendRouter = router.Router();

    friendRouter
        .get('/friend', function (req, res) {
            models.Friends
                .findAll({
                    where: {
                        UserFriend: req.userId
                    },
                    include: [{
                            model: models.Users,
                            as: 'FriendUser',
                            required: false
                        },
                        {
                            model: models.Users,
                            as: 'FriendUser2',
                            required: false
                        }
                    ]
                })
                .then(function (friends) {
                    res.status(200).json(friends);
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });
        })
        .post('/friend', function (req, res) {
            models.Friends
                .findOne({
                    where: {
                        User: req.userId,
                        UserFriend: req.body.id
                    }
                })
                .then(function (friend) {
                    if (friend !== null) {
                        var error = {
                            'message': 'Friend request already sent.'
                        };
                        res.status(401).json(error);

                    } else {

                        models.Friends
                            .create({
                                User: req.userId,
                                UserFriend: req.body.id
                            })
                            .then(function (friend) {
                                res.status(200).json(friend);
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
        .delete('/friend', function (req, res) {

            models.Friends
                .findOne({
                    where: {
                        Id: req.query.id
                    }
                })
                .then(function (friend) {
                    if (!friend) {
                        var error = {
                            'message': "Friend does not exist."
                        };
                        res.status(404).json(error);

                    } else {
                        models.Friends
                            .destroy({
                                where: {
                                    Id: friend.Id
                                }
                            })
                            .then(function (recordCount) {
                                models.Friends
                                    .destroy({
                                        where: {
                                            User: friend.UserFriend,
                                            UserFriend: friend.User
                                        }
                                    })
                                    .then(function (recordCount) {
                                        res.status(200).json(recordCount);
                                    })
                                    .catch(function (error) {
                                        res.status(406).json(error);
                                    });
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
        .patch('/friend', function (req, res) {

            models.Friends
                .count({
                    where: {
                        Id: req.body.id
                    }
                })
                .then(function (friendCount) {
                    if (friendCount < 1) {
                        var error = {
                            'message': "Friend does not exist."
                        };
                        res.status(404).json(error);

                    } else {
                        models.Friends
                            .update({
                                Accepted: true
                            }, {
                                where: {
                                    Id: req.body.id
                                }
                            })
                            .then(function (recordCount) {

                                models.Friends
                                    .findOne({
                                        where: {
                                            Id: req.body.id
                                        }
                                    })
                                    .then(function (friend) {
                                        models.Friends
                                            .create({
                                                User: friend.UserFriend,
                                                UserFriend: friend.User,
                                                Accepted: true
                                            })
                                            .then(function (friend) {
                                                res.status(200).json(friend);
                                            })
                                            .catch(function (error) {
                                                res.status(406).json(error);
                                            });
                                    })
                                    .catch(function (error) {
                                        res.status(406).json(error);
                                    });
                            })
                            .catch(function (error) {
                                res.status(406).json(error);
                            });
                    }
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });
        });

    return friendRouter;
};

module.exports = routes;