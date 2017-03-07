var routes = function (router, models) {

    var bulletinRouter = router.Router();

    bulletinRouter
        .get('/bulletin', function (req, res) {
            models.Bulletins.findAll({
                    where: {
                        'User': req.userId
                    },
                    order: 'Title ASC',
                    include: [{
                        model: models.Stickies,
                        as: 'BulletinStickies',
                        required: false
                    }]
                })
                .then(function (bulletins) {
                    res.status(200).json(bulletins);
                })
                .catch(function (error) {
                    res.status(400).json(error);
                });
        })
        .post('/bulletin', function (req, res) {
            models.Bulletins
                .count({
                    where: {
                        Title: req.body.title,
                        User: req.userId
                    }
                })
                .then(function (bulletinCount) {
                    if (bulletinCount > 0) {
                        var error = {
                            'message': "Email already registered."
                        };
                        res.status(409).json(error);

                    } else {
                        models.Bulletins
                            .create({
                                Title: req.body.title,
                                User: req.userId
                            })
                            .then(function (bulletin) {
                                res.status(200).json(bulletin);
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
    return bulletinRouter;
};

module.exports = routes;