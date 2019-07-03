const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (router) => {


    
    router.get("/publicProfile/:id", (req, res) => {
        if(!req.params.id){
            res.json({ status: false, message: "provide user id "})
        }else{
        User.GetUser(req.params.id,(data)=>{
            res.json(data);
        });
        }
    });

    router.post("/register", (req, res) => {
        if (!req.body.name || !req.body.middle_name || !req.body.last_name || !req.body.emp_id || !req.body.department) {
            res.json({
                status: false,
                message: "fucker ensert all datas "
            });
        } else {
            var user = {
                name: req.body.name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                emp_id: req.body.emp_id,
                department: req.body.department
            }
            User.register(user, (response) => {
                res.json(response)
            });
        }

    });


    router.post("/login", (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({ status: false, message: "provide username and password" })
        } else {
            username = req.body.username;
            password = req.body.password;
            User.GetUserByUsername(username, (response) => {
                if (response["status"]) {
                    if (response["data"][0]["username"] == username && response["data"][0]["password"] == password) {
                        // res.json(response)
                        const token = jwt.sign({ user: response["data"][0]["id"] }, "lxd", { expiresIn: '24h' });

                        var pages = {
                            manager: "u/propertyManger.html",
                            store: "u/storeKeeper.html",
                            department: "u/departmentManager.html",
                            employe: "u/employe.html"
                        }
                        if (response["data"][0]["position"] == "manager") {
                            res.json({ status: true, page: pages["manager"], token: token })
                        } else if (response["data"][0]["position"] == "store") {
                            res.json({ status: true, page: pages["store"], token: token })
                        } else if (response["data"][0]["position"] == "employe") {
                            res.json({ status: true, page: pages["employe"], token: token })
                        } else if (response["data"][0]["position"] == "department") {
                            res.json({ status: true, page: pages["department"], token: token })
                        }
                    }
                }
            });
        }
    });


    router.use((req,res,next)=>{
        const token = req.headers['authorization'];
        if(!token){
            res.json({ success : false, message : "No token providede"});
        }else{
            jwt.verify(token,"lxd", (err, decoded)=>{
                if(err){
                    res.json({success : false , message : "invalid token " + err});
                }else{
                    req.decoded = decoded;
                    next();
                }
            })
        }
    });

    router.get("/profile",(req,res)=>{
        console.log(req.decoded.user)
        User.GetUser(req.decoded.user,(user)=>{
            res.json(user);
        })
    })
    
    return router;
}