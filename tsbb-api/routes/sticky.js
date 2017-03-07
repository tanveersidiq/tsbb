var routes = function (router, models) {

    var stickyRouter = router.Router();

    stickyRouter
        .post('/sticky', function (req, res) {

            models.Stickies
                .count({
                    where: {
                        Title: req.body.title,
                        Bulletin: req.body.bulletin
                    }
                })
                .then(function (stickyCount) {
                    if (stickyCount > 0) {
                        var error = {
                            'message': "Sticky note with the title already added."
                        };
                        res.status(409).json(error);

                    } else {
                        models.Stickies
                            .create({
                                Title: req.body.title,
                                Content: req.body.content,
                                Bulletin: req.body.bulletin,
                                User: req.userId,
                                Left: req.body.left,
                                Top: req.body.top
                            })
                            .then(function (sticky) {
                                res.status(200).json(sticky);
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
        .put('/sticky', function (req, res) {

            models.Stickies
                .findById(req.body.id)
                .then(function (sticky) {
                    if (!sticky) {
                        var error = {
                            'message': "Sticky note does not exist."
                        };
                        res.status(404).json(error);

                    } else {
                        models.Stickies
                            .update({
                                Left: req.body.left,
                                Top: req.body.top
                            }, {
                                where: {
                                    Id: req.body.id
                                }
                            })
                            .then(function (sticky) {
                                res.status(200).json(sticky);
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
        .delete('/sticky', function (req, res) {

            models.Stickies
                .count({
                    where: {
                        Id: req.query.Id
                    }
                })
                .then(function (stickyCount) {
                    if (stickyCount < 1) {
                        var error = {
                            'message': "Sticky note does not exist."
                        };
                        res.status(404).json(error);

                    } else {
                        models.Stickies
                            .destroy({
                                where: {
                                    Id: req.query.Id
                                }
                            })
                            .then(function (recordCount) {
                                res.status(200).json(recordCount);
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
    return stickyRouter;
};

module.exports = routes;