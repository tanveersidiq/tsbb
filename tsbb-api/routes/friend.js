var routes = function (router, models) {

    var friendRouter = router.Router();

    friendRouter
        .get('/friend/requests', function (req, res) {
            models.Friends.findAll({
                    where: {
                        UserFriend: req.userId,
                        Accepted: false
                    },
                    include: [{
                        model: models.Users,
                        as: 'FriendUser',
                        required: false
                    }]
                })
                .then(function (friends) {
                    res.status(200).json(friends);
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });
        })
        .get('/friend/requestsent', function (req, res) {
            models.Friends.findAll({
                    where: {
                        User: req.userId,
                        Accepted: false
                    },
                    include: [{
                        model: models.Users,
                        as: 'FriendUser',
                        required: false
                    }]
                })
                .then(function (friends) {
                    res.status(200).json(friends);
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });
        })
        .post('/friend', function (req, res) {
            models.Friends.findOne({
                    where: {
                        User: req.userId,
                        UserFriend: req.body.user
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
                                UserFriend: req.body.user
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
        });

    return friendRouter;
};

module.exports = routes;