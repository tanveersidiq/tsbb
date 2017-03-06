var authorize = function (req, res, next) {
    
    if (req.isAuthenticated()) // if user is authenticated in the session, carry on
        return next();

    res.redirect('/'); // if they aren't redirect them to the home page
};

module.exports = authorize;