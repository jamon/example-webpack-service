var conf = JSON.parse(require('fs').readFileSync(__dirname + '/package.json'));
var bodyParser = require('body-parser');

var accounts = {
    "1234567890123456": {account: {
        "accountNumber": "1234567890123456",
        "status": "ACTIVE",
        "authorizedUsers": [
            {
                "name": "Ford Prefect",
                "primary": "true"
            },
            {
                "name": "Tricia McMillian",
                "primary": "false"
            }
        ],
        "billingAddress": {
            "street1": "1 High Street",
            "street2": "",
            "city": "London",
            "state": "UK",
            "zip": "123456789"
        },
        "ppvLimit": "123.45",
        "bulkFlag": true,
        "paperlessFlag": true,
        "customer": {
            "id": "1234567890123",
            "firstName": "Arthur",
            "lastName": "Dent",
            "ssn": "123456789",
            "type": "RES",
            "employeeFlag": true,
            "primaryTelephoneNumber": "1234567890",
            "alternateTelephoneNumber": "5432109876",
            "email": "arthur.dent@hhg2tg.com",
            "securityCode": "1234"
        },
        "location": {
            "id": "12345678901234",
            "routingArea": "12345600",
            "sysPrin": "12345678",
            "agentId": "1234",
            "rateCenter": "London",
            "headend": "X1 - Not Tail End",
            "comments": "Disguised by SEP field, you need to concentrate",
            "serviceAddress": {
                "street1": "42 High Street",
                "street2": "",
                "city": "London",
                "state": "UK",
                "zip": "123456789"
            }
        }
    }}
};
module.exports = {
    load: function(app, shared, options) {

        function registerService() {
            var service = conf.devServer.service;
            console.log("service", service.source);
            app.get(service.source + '/account/:id', function (req, res) {
                console.log("GET /account/:id", req.params.id);
                if(typeof accounts[req.params.id] === "undefined") {
                    res.status(404).send();
                } else {
                    res.json(accounts[req.params.id]);
                }
            });
            app.post(service.source + '/account/:id/customer', bodyParser.json(), function (req, res) {
                var account = accounts[req.params.id].account;
                if(typeof account === "undefined") {
                    res.status(404).send();
                } else {
                    account.customer = req.body;
                    console.log("updated customer", account.customer);
                    res.status(204).send();

                }
            });
        }

        registerService();
    }
};
