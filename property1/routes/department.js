const Department = require("../models/department");

module.exports = (router) => {

    router.get("/requestsd", (req, res) => {
        var dep_id = "it";
        Department.get_requests(dep_id, (response) => {
            res.json(response);
        })
    });


    router.post("/accept", (req, res) => {
        if (!req.body.req_id) {
            res.json({ ststus: false, message: "provide all felds" })
        } else {
            user = 3;
            var req_id = req.body.req_id;
            Department.accept_req(user,req_id,(response)=>{
                res.json(response);
            });
        }
    });


    router.post("/decline", (req, res) => {
        if (!req.body.req_id) {
            res.json({ ststus: false, message: "provide all felds" })
        } else {
            user = 3;
            var req_id = req.body.req_id;
            Department.decline_req(user,req_id,(response)=>{
                res.json(response);
            });
        }
    });


    router.get("/custom_requests", (req, res) => {
        var dep_id = "it";
        Department.get_custom_requests(dep_id, (response) => {
            res.json(response);
        })
    });


    router.post("/accept_custom", (req, res) => {
        if (!req.body.req_id) {
            res.json({ ststus: false, message: "provide all felds" })
        } else {
            user = 3;
            var req_id = req.body.req_id;
            Department.acceptCustom_req(user,req_id,(response)=>{
                res.json(response);
            });
        }
    });

    router.post("/decline_custom", (req, res) => {
        if (!req.body.req_id) {
            res.json({ ststus: false, message: "provide all felds" })
        } else {
            user = 3;
            var req_id = req.body.req_id;
            Department.declineCustom_req(user,req_id,(response)=>{
                res.json(response);
            });
        }
    });

    
    return router
}