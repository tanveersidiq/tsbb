var routes = function (router, models) {

    var shareRouter = router.Router();

    shareRouter
        .get('/share', function (req, res) {
            models.BulletinShares
                .findAll({
                    include: [{
                            model: models.Bulletins,
                            as: 'BulletinShare',
                            required: false,
                            include: [{
                                model: models.Stickies,
                                as: 'BulletinStickies',
                                required: false
                            }]
                        },
                        {
                            model: models.Friends,
                            as: 'FriendShared',
                            required: true,
                            where: {
                                User: req.userId
                            }
                        }
                    ]
                })
                .then(function (bulletinShares) {
                    res.status(200).json(bulletinShares);
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });

        })
        .post('/share', function (req, res) {
            var bulletinShares = [];
            for (var i = 0; i < req.body.bulletinShare.length; i++) {
                var bs = req.body.bulletinShare[i];
                models.BulletinShares
                    .findOne({
                        where: {
                            Bulletin: bs.bulletin,
                            User: bs.user
                        }
                    })
                    .then(function (bulletinShare) {
                        if (bulletinShare === null) {

                            models.BulletinShares
                                .create({
                                    Bulletin: bs.bulletin,
                                    User: bs.user,
                                })
                                .then(function (bulletinShares) {
                                    res.status(200).json(bulletinShares);
                                })
                                .catch(function (error) {
                                    res.status(406).json(error);
                                });

                        }
                    })
                    .catch(function (error) {
                        res.status(406).json(error);
                    });

            }

        });
    return shareRouter;
};

module.exports = routes;