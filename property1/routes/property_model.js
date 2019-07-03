const Property_model = require('../models/property_model');
const Property = require('../models/property');
const mutler = require('multer');
const path = require('path');

module.exports = (router) => {


    const storage = mutler.diskStorage({
        destination: './client/images/',
        filename: (req, file, cb) => {
            cb(null,  Date.now() + path.extname(file.originalname));
        }
    });

    const upload = mutler({
        storage: storage
    }).single('file-select');


    router.post("/add_Property_model", (req, res) => {

        upload(req, res, (err) => {
            if (err) {
                res.json({ status: false, message: "can not upload file", error: err })
            } else{
                if (!req.body.name || !req.body.description || !req.body.model || !req.body.class || !req.body.propertys) {
                    res.json({
                        status: false,
                        message: "ensert all datas "
                    });
                }else if(req.file == undefined){
                    res.json({
                        status: false,
                        message: "ensert image datas "
                    });
                }else {

                    var propertys = JSON.parse(req.body.propertys);
                    var len = 0;
                    for (p in propertys) {
                        len += 1
                    }
                    var property_model = {
                        class: req.body.class,
                        name: req.body.name,
                        description: req.body.description,
                        model: req.body.model,
                        quantity_: len,
                        image: req.file.filename
                    }

                    Property_model.add(property_model, (response) => {
                        if (response["status"]) {
                            proprty = []
                            for (p in propertys) {
                                item = [propertys[p]["isbn"], propertys[p]["seri"], response["data"]["insertId"], Date.now()]
                                proprty.push(item)
                            }
                            Property.add_bulk(proprty, (response) => {
                                res.json(response)
                            });
                        }

                    });
                }
            }
        });
    });


    router.get("/get_all_property_model", (req, res) => {
        Property_class.get((response) => {
            res.json(response);
        });
    });

    router.get("/get_all_property_model_in_class/:class_id", (req, res) => {
        if (!req.params.class_id) {
            res.json({ status: false, message: "provide class id " })
        } else {
            var class_id = req.params.class_id;
            Property_model.getPropertysInClass(class_id, (response) => {
                res.json(response);
            });
        }
    });

    router.get("/searchPropertyInClass/:class_id/:key", (req, res) => {
        if (!req.params.class_id || !req.params.key) {
            res.json({ status: false, message: "provide class id " })
        } else {
            var class_id = req.params.class_id;
            var key = req.params.key;
            Property_model.searchPropertyInClass(class_id,"%"+key+"%", (response) => {
                res.json(response);
            });
        }
    });



    return router;
}