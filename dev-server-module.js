var conf = JSON.parse(require('fs').readFileSync(__dirname + '/package.json'));

module.exports = {
    load: function(app, shared, options) {

        function registerService() {
            var service = conf.devServer.service;
            console.log("service", service.source);
            app.get(service.source + '/test', function (req, res) {
                res.json({message: "this is a test"});
            });
        }

        registerService();
    }
};
