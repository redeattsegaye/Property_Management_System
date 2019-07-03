const Store = require("../models/store");

module.exports = (router) => {

    router.get("/requests",(req,res)=>{
        user= 4
        store = 1
        Store.requests(store,(response)=>{
            res.json(response)
        });
    });


    router.post("/checkOut",(req,res)=>{
        if (!req.body.emp_id || !req.body.isbn || !req.body.key) {
            res.json({status:false , message:"provide all fields"});
        }else{
            emp = req.body.emp_id
            isbn = req.body.isbn
            key = req.body.key

            Store.preCheckOut(key,isbn,(response)=>{
                if (response["status"]) {
                    Store.checkOut(emp,isbn,(response)=>{
                        res.json(response);
                    });
                }else{
                    res.json(response)
                }
            })
        }
    });
    

    router.get("/requestsC",(req,res)=>{
        user= 4
        store = 1
        Store.requestsC(store,(response)=>{
            res.json(response)
        });
    });


    router.post("/checkOutC",(req,res)=>{
        if (!req.body.emp_id || !req.body.isbn || !req.body.key) {
            res.json({status:false , message:"provide all fields"});
        }else{
            emp = req.body.emp_id
            isbn = req.body.isbn
            key = req.body.key

            Store.preCheckOutC(key,isbn,(response)=>{
                if (response["status"]) {
                    Store.checkOutC(emp,isbn,(response)=>{
                        res.json(response);
                    });
                }else{
                    res.json(response)
                }
            })
        }
    });
    


    return router;
}