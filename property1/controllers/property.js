const Property = require('../models/property');

module.exports = (router) => {
    router.post("/add", (req, res) => {
        if (!req.body.isbn || !req.body.name || !req.body.unit_price) {
            res.json({
                status: false,
                message: "fucker ensert all datas "
            });
        } else {
            var property = {
                ISBN: req.body.isbn,
                name: req.body.name,
                unit_price: req.body.unit_price,
            }
            Property.add(property, (response) => {
                res.json(response)
            });
        }

    });


    router.post("/remove",(req,res) =>{
        if (!req.body.isbn) {
            res.json({
                status: false,
                message: "fucker ensert isbn"
            });
        } else {
            Property.remove(req.body.isbn, (response) => {
                res.json(response);
            });
        }
    });

    return router;
}