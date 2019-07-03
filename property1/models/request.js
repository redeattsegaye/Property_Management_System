var connection = require('../config/database.js');
const Property = require("../models/property");

var request = ({
    add: (request, call_back) => {
        connection.query('INSERT INTO request SET ?', request, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'request registered sucessfully'
                });
            }
        });
    },

    add_custom_request: (request, call_back) => {
        connection.query('INSERT INTO custom_request SET ?', request, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'request registered sucessfully'
                });
            }
        });
    },


    cancel_reques: (req_id, call_back) => {
        connection.query('DELETE FROM request WHERE req_id = ?', req_id, function (error, results, fields) {
            if (error) {
                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });
            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'request canceld successfully'
                });
            }
        });
    },

    cancelCustom_reques: (req_id, call_back) => {
        connection.query('DELETE FROM custom_request WHERE req_id = ?', req_id, function (error, results, fields) {
            if (error) {
                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });
            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'request canceld successfully'
                });
            }
        });
    },

    accept_req: (req_id) => {
        console.log("sl");
    },


    get_all_requests: (call_back) => {
        connection.query('SELECT * FROM request LEFT JOIN property_model on property_model.id = request.model', function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },

    get_request_from_emp: (emp_id, call_back) => {
        connection.query('SELECT * FROM request LEFT JOIN property_model on property_model.id = request.model WHERE request.from_emp = ?', emp_id, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },


    get_custom_request_from_emp: (emp_id, call_back) => {
        connection.query('SELECT * FROM custom_request WHERE from_emp = ?', emp_id, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },


    get_all_custom_requests: (call_back) => {
        connection.query('SELECT * FROM custom_request ', function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },



    accept_req_department: (req_id, emp_id, call_back) => {
        connection.query('UPDATE request,property_model SET quantity_ = cast(property_model.quantity_ as unsigned) - cast(request.quantity as unsigned) , step_2_aprover = ? ,step_2 = "accepted", status=2 WHERE req_id = ?', [emp_id, req_id], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },

    // accept_req_manager: (req_id, call_back) => {
    //     connection.query('UPDATE request SET from_dep_head = ? ,manager_status = ? WHERE req_id = ?', ["ls", "vi", 1], function (error, results, fields) {
    //         if (error) {

    //             call_back({
    //                 status: false,
    //                 message: 'there are some error with query',
    //                 error: error
    //             });

    //         } else {
    //             call_back({
    //                 status: true,
    //                 data: results,
    //                 message: 'you accepted the request successfully'
    //             });
    //         }
    //     });
    // },

    get_dep_acepted_requests: (call_back) => {
        connection.query('SELECT * FROM employes,request LEFT JOIN property_model on property_model.id = request.model,(SELECT COUNT(*) FROM property,property_model WHERE property.status = "store" AND property.model = property_model.id)as ls WHERE employes.id=request.from_emp and step_1= "accepted" ORDER by step_2 DESC', function (error, results, fields) {
            if (error) {
                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'geted requestes accepted  by department successfully'
                });
            }
        });
    },

    get_dep_acepted_custom_requests: (call_back) => {
        connection.query('SELECT * FROM custom_request,employes WHERE employes.id = custom_request.from_emp AND custom_request.step_1 ="accepted" ORDER by step_2 DESC', function (error, results, fields) {
            if (error) {
                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'geted requestes accepted  by department successfully'
                });
            }
        });
    },


    decline_req_dep: (emp_id, req_id, call_back) => {
        connection.query('UPDATE request SET step_2_aprover = ? ,step_2 ="declined",status = 0 WHERE req_id = ?', [emp_id, req_id], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you update request successfully'
                });
            }
        });
    },

    decline_custom_req_dep: (emp_id, req_id, call_back) => {
        connection.query('UPDATE custom_request SET step_2_aprover = ? ,step_2 ="declined" WHERE req_id = ?', [emp_id, req_id], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you update request successfully'
                });
            }
        });
    },

    accept_custom_req_department: (req_id, emp_id, call_back) => {
        connection.query('UPDATE custom_request SET step_2_aprover = ? ,step_2 = "accepted" WHERE req_id = ?', [emp_id, req_id], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                // connection.query('UPDATE property,request SET property.status=request.from_emp WHERE request.req_id = ? LIMIT request', req_id, (error, results, fields) => {
                //     if (error) {
                //         call_back({
                //             status: false,
                //             message: 'there are some error with query',
                //             error: error
                //         });
                //     } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
                //     }
                // })
            }
        });
    },


    getReq: (req_id, call_back) => {
        connection.query('SELECT * FROM request WHERE request.req_id = ?', [req_id], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },

    getCreq: (req_id, call_back) => {
        connection.query('SELECT * FROM custom_request WHERE custom_request.req_id = ?', [req_id], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },

    finished: (user, call_back) => {
        connection.query('SELECT * FROM property,property_model,store WHERE property.model = property_model.id AND store.id = property.owned_by AND property.status = ?', [user], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },


    finishedC: (user, call_back) => {
        connection.query('SELECT * FROM customProperty,custom_request WHERE custom_request.req_id = customProperty.req AND custom_request.from_emp = customProperty.status AND customProperty.status = ? AND customProperty.owned_by != customProperty.status', [user], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'here you fetch all requests successfully'
                });
            }
        });
    },


});

module.exports = request;

