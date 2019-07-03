const Property_class = require('../models/property_class');

module.exports = (router) => {

    router.post("/add_class", (req, res) => {
        if (!req.body.name || !req.body.description) {
            res.json({
                status: false,
                message: "ensert all datas "
            });
        } else {
            var property_class = {
                name: req.body.name,
                description: req.body.description,
                type:req.body.type,
                duration:req.body.duration
            }
            Property_class.add(property_class, (response) => {
                res.json(response)
            });
        }
    });


    router.get("/get_all_property_class", (req, res) => {
        Property_class.get( (response) => {
            res.json(response);
        });
    });



    return router;
}