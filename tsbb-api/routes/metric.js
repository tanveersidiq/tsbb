 var request = require('request');

 var routes = function (router, models) {

     var metricRouter = router.Router();

     metricRouter
         .get('/metric/cpuutilization', function (req, res) {
             var options = {
                 uri: process.env.ADMIN_GATEWAY_URL + '/cpuutilization',
                 method: 'GET'
             };
             request(options, function (error, response, body) {
                 if (error) {
                     res.status(400).json(error);
                 } else {
                     res.status(200).json(body);
                 }
             });

         });

     return metricRouter;
 };

 module.exports = routes;