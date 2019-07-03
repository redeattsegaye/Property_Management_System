var connection = require('../config/database.js');

var department = ({
    add: (store,call_back) => {
        connection.query('INSERT INTO store SET ?', srore, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'department registered sucessfully'
                });
            }
        });
    },

    remove: (id,call_back) =>{
        
        connection.query('DELETE FROM store WHERE dep_id =  ?', id, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'department deleted successfully'
                });
            }
        });
    },


    get_propertys: (store,call_back) => {
        sql = 'SELECT property_class.name,property_class.description FROM property,property_class,property_model '
        sql +='WHERE property.owned_by = ? AND property_model.id = property.model AND property_class.id = property_model.class '
        connection.query(sql, store, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error:error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'department registered sucessfully'
                });
            }
        });
    },


    requests: (store,call_back) => {
        connection.query('SELECT * FROM store,property,property_model,employes WHERE property.status = employes.id AND property_model.id = property.model AND store.id = property.owned_by AND store.id = ?',[ store ], function (error, results, fields) {
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

    

    requestsC: (store,call_back) => {
        connection.query('SELECT * FROM store,customProperty,custom_request,employes WHERE customProperty.status = employes.id AND store.id = customProperty.owned_by AND custom_request.req_id = customProperty.req AND store.id = ?',[ store ], function (error, results, fields) {
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


    accept_req: (emp_id,req_id,call_back) => {
        connection.query('UPDATE request SET step_1_aprover = ? ,step_1 ="accepted" WHERE req_id = ?',[ emp_id, req_id], function (error, results, fields) {
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

    decline_req: (emp_id,req_id,call_back) => {
        connection.query('UPDATE request SET step_1_aprover = ? ,step_1 ="declined" WHERE req_id = ?',[ emp_id, req_id], function (error, results, fields) {
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
    

    checkOut:(emp_id, isbn,call_back) => {
        connection.query('UPDATE property SET property.owned_by = ? WHERE property.ISBN = ?',[ emp_id, isbn], function (error, results, fields) {
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


    checkOutC:(emp_id, isbn,call_back) => {
        connection.query('UPDATE customProperty SET customProperty.owned_by = ? WHERE customProperty.ISBN = ?',[ emp_id, isbn], function (error, results, fields) {
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



    preCheckOut:(key_, isbn,call_back) => {
        connection.query('SELECT * FROM property WHERE property.ISBN = ?',[isbn], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                // console.log(results)
                if(results[0]["key_"] == key_){
                    call_back({
                        status: true,
                        data:results,
                        message: 'valid key'
                    });
                }else{
                    call_back({
                        status: false,
                        data:results,
                        message: 'Not Valid key'
                    });
                }
                
            }
        });
    },


    preCheckOutC:(key_, isbn,call_back) => {
        connection.query('SELECT * FROM customProperty WHERE customProperty.ISBN = ?',[isbn], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error: error
                });

            } else {
                // console.log(results)
                if(results[0]["key_"] == key_){
                    call_back({
                        status: true,
                        data:results,
                        message: 'valid key'
                    });
                }else{
                    call_back({
                        status: false,
                        data:results,
                        message: 'Not Valid key'
                    });
                }
                
            }
        });
    },




    

    

});

module.exports = department;

