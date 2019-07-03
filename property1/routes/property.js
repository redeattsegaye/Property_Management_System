const Property = require("../models/property");
const Request = require("../models/request");
const Property_model = require("../models/property_model");



module.exports = (router) => {

    router.get("/getProperties", (req, res) => {
        Property.getProperties((data) => {
            res.json(data);
        });
    });

    router.get("/get_properties_in_class/:class", (req, res) => {
        var class_ = req.params.class
        Property.get_all_propertys_in_class(class_, (data) => {
            res.json(data);
        });
    });

    router.get("/get_properties_in_model/:model", (req, res) => {
        var class_ = req.params.model
        Property.get_all_propertys_in_model(class_, (data) => {
            res.json(data);
        });
    });

    router.get("/getProperty/:id", (req, res) => {
        if (!req.params.id) {
            res.json({ status: false, message: "you did not provide id" });
        }
        else {
            var id = req.params.id
            Property.getProperty(id, (data) => {
                res.json(data);
            });
        }
    });

    router.delete("/deleteProperty/:id", (req, res) => {
        if (!req.params.id) {
            res.json({ status: false, message: "you did not provide id" });
        } else {
            var id = req.params.id
            Property.deleteProperty(id, (data) => {
                res.json(data);
            });
        }
    });

    router.post("/saveProperty", (req, res) => {
        if (!req.body.name || !req.body.type ||
            !req.body.quantity || !req.body.price || !req.body.level
            || !req.body.store || !req.body.manager) {
            res.json({ status: false, message: "you did not provide all datas", ls: req.body });
        }
        else {
            var property = {
                // _id: req.body._id,
                name: req.body.name,
                type: req.body.type,
                quantity: req.body.quantity,
                price: req.body.price,
                level: req.body.level,
                store: req.body.store,
                manager: req.body.manager

            }
            Property.add(property, (data) => {
                res.json(data);
            });
        }
    });


    router.get("/owned", (req, res) => {
        user = req.decoded.user
        Property.owned(user, (response) => {
            res.json(response);
        })
    });

    router.get("/ownedC", (req, res) => {
        user = req.decoded.user
        Property.ownedC(user, (response) => {
            res.json(response);
        })
    });


    router.post("/saveKey", (req, res) => {
        if (!req.body.key_ || !req.body.isbn) {
            res.json({ status: false, message: "provide all feilds" });
        } else {
            key_ = req.body.key_
            isbn = req.body.isbn
            Property.saveKey(key_, isbn, (response) => {
                res.json(response);
            });
        }
    });

    router.post("/saveKeyC", (req, res) => {
        if (!req.body.key_ || !req.body.isbn) {
            res.json({ status: false, message: "provide all feilds" });
        } else {
            key_ = req.body.key_
            isbn = req.body.isbn
            Property.saveKeyC(key_, isbn, (response) => {
                res.json(response);
            });
        }
    });


    router.post("/addRequested", (req, res) => {
        if (!req.body.req_id || !req.body.propertys) {
            res.json({
                status: false,
                message: "ensert all datas "
            });
        } else {
            var propertys = JSON.parse(req.body.propertys);

            id = req.body.req_id
            Request.getCreq(id, (response) => {
                if (response["status"]) {
                    name = response["data"][0]["name"]
                    model = response["data"][0]["model"]
                    requester = response["data"][0]["from_emp"]
                    user = req.decoded.user
                    proprty = []
                    for (p in propertys) {
                        item = [propertys[p]["isbn"], propertys[p]["seri"], requester, Date.now(), id]
                        proprty.push(item)
                    }
                    Property.add_bulk1(proprty, (response1) => {
                        // res.json(response)
                        if (response["status"]) {
                            Request.accept_custom_req_department(id, user, (response2) => {
                                res.json(response);
                            })
                        }
                    });
                }

            });
        }
    });


    router.post("/saveOne", (req, res) => {
        if (!req.body.isbn || !req.body.seri ||
            !req.body.model) {
            res.json({ status: false, message: "you did not provide all datas", ls: req.body });
        }
        else {
            var property = {
                // _id: req.body._id,
                ISBN: req.body.isbn,
                serial_number: req.body.seri,
                model: req.body.model,
                key_: Date.now,
            }
            Property.add(property, (data) => {
                if (data["status"]) {
                    Property_model.addProperty(req.body.model, (response) => {
                        res.json(response);
                    })
                }
                else {
                    res.json({ status: false, message: "try later again" });
                }
            })
            // Property_model.addProperty(req.body.model,(response)=>{
            //     if (response["status"]) {
            //         Property.add(property,(data)=>{
            //             res.json(data);
            //         });
            //     }else{
            //         res.json({status:false ,message:"try later again"});
            //     }
            // })
        }
    });

    return router
}