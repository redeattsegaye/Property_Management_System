const Property = require('../models/property');
const Request = require('../models/request');

module.exports = (router) => {

    router.post("/request_property", (req, res) => {
        if (!req.body.name || !req.body.quantity) {
            res.json({
                status: false,
                message: "fucker ensert all datas " + req.body.name 
            });
        } else {
            var request = {
                property_name : req.body.name,
                quantity : req.body.quantity,
                from_emp: "nginx"
            }
            Request.add(request, (response) => {
                res.json(response)
            });
        }
    });




    router.get("/get_all_propertys", (req, res) => {
        Property.get_all_propertys( (response) => {
            res.json(response);
        });
    });


    router.get("/view_requests", (req, res) => {
        var emp_id = "nginx"
        Request.get_request_from_emp( emp_id, (response) => {
            res.json(response);
        });
    });

    router.post("/cancel_requests", (req, res) => {
        if (!req.body.req_id) {
            res.json({
                status: false,
                message: "fucker ensert all datas " + req.body.name 
            });
        }
        Request.cancel_reques( req.body.req_id, (response) => {
            res.json(response);
        });
    });
    
    


    
    return router;
}