const Request = require("../models/request");
const Property = require("../models/property");


module.exports = (router) => {

    router.post("/request", (req, res) => {
        if (!req.body.model || !req.body.quantity || !req.body.description) {
            res.json({ status: false, message: "provide all fields" })
        } else {
            var user = req.decoded.user;
            var request = { from_emp: user, 
                model: req.body.model,
                quantity:req.body.quantity,
                description:req.body.description }

            Request.add(request, (response) => {
                res.json(response)
            });
        }
    });

    router.post("/cancel",(req,res)=>{
        if (!req.body.id) {
            res.json({status:false, message:"provide all fields"});
        }else{
            req = req.body.id
            Request.cancel_reques(req,(response)=>{
                res.json(response);
            });
        }
    });

    router.post("/cancelCustom",(req,res)=>{
        if (!req.body.id) {
            res.json({status:false, message:"provide all fields"});
        }else{
            req = req.body.id
            Request.cancelCustom_reques(req,(response)=>{
                res.json(response);
            });
        }
    });
    router.get("/user_requests", (req, res) => {
        var user = req.decoded.user;
        Request.get_request_from_emp(user, (response) => {
            res.json(response)
        });
    });

    router.get("/all_requests", (req, res) => {
        var user = req.decoded.user;
        Request.get_all_requests((response) => {
            res.json(response)
        });
    });


    router.get("/user_custom_requests", (req, res) => {
        var user = req.decoded.user;
        Request.get_custom_request_from_emp(user, (response) => {
            res.json(response)
        });
    });


    router.get("/all_custom_requests", (req, res) => {
        var user = req.decoded.user;
        Request.get_all_custom_requests((response) => {
            res.json(response)
        });
    });


    router.get("/get_dep_acepted_requests", (req,res)=>{
        Request.get_dep_acepted_requests((response)=>{
            res.json(response);
        });
    });


    router.get("/get_dep_acepted_custom_requests", (req,res)=>{
        Request.get_dep_acepted_custom_requests((response)=>{
            res.json(response);
        });
    });


    router.post("/accept_req_department" , (req,res)=>{
        if (!req.body.id) {
            res.json({status:false , message:"provide all fields"});
        }else{
            Request.accept_req_department(id,(response)=>{
                res.json(response);
            });
        }
    });



    router.post("/add_custom_request", (req, res) => {
        if (!req.body.name || !req.body.description || !req.body.model || !req.body.quantity) {
            res.json({
                status: false,
                message: "ensert all datas "
            });
        } else {
            user = req.decoded.user;
            var request = {
                from_emp: user,
                quantity: req.body.quantity,
                name: req.body.name,
                description: req.body.description,
                model: req.body.model
            }
            Request.add_custom_request(request, (response) => {
                res.json(response)
            })
        }
    });


    router.post("/accept_req_dep",(req,res)=>{
        if (!req.body.req_id) {
            res.json({status:false,message:"provide id"});
        }
        else{
        id = req.body.req_id;
        user = req.decoded.user 
        Request.accept_req_department(id,user,(response)=>{
            // res.json(response);
            if(response["status"]){
                Request.getReq(id,(response1)=>{
                    console.log(response1["data"][0]["from_emp"])
                    if (response1["status"]) {
                        u = response1["data"][0]["from_emp"];
                        amount = response1["data"][0]["quantity"];
                        Property.alocate(u,amount,(data)=>{
                            res.json(data);
                        });
                    }
                })
            }else{
                res.json(response);
            }
        });
        }
    });

    router.post("/decline_req_dep",(req,res)=>{
        if (!req.body.req_id) {
            res.json({status:false,message:"provide id"});
        }
        else{
        id = req.body.req_id;
        user = req.decoded.user 
        Request.decline_req_dep(user,id,(response)=>{
            res.json(response);
        });
        }
    });


    router.post("/accept_custom_req_dep",(req,res)=>{
        if (!req.body.req_id) {
            res.json({status:false,message:"provide id"});
        }
        else{
        id = req.body.req_id;
        user = req.decoded.user 
        Request.accept_custom_req_department(id,user,(response)=>{
            res.json(response);
        });
        }
    });


    router.post("/decline_custom_req_dep",(req,res)=>{
        if (!req.body.req_id) {
            res.json({status:false,message:"provide id"});
        }
        else{
        id = req.body.req_id;
        user = req.decoded.user 
        Request.decline_custom_req_dep(user,id,(response)=>{
            res.json(response);
        });
        }
    });


    router.get("/finished",(req,res)=>{
        user = req.decoded.user 
        Request.finished(user,(response)=>{
            res.json(response);
        })
    })


    router.get("/finishedC",(req,res)=>{
        user = req.decoded.user 
        Request.finishedC(user,(response)=>{
            res.json(response);
        });
    })


    return router
}