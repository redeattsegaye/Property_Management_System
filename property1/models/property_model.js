var connection = require('../config/database.js');

var property = ({
    add: (property_model,call_back) => {
        connection.query('INSERT INTO property_model SET ?', property_model, function (error, results, fields) {
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
                    message: 'property_model registered sucessfully'
                });
            }
        });
    },

    remove: (isbidn,call_back) =>{
        
        connection.query('DELETE FROM property_model WHERE ISBN =  ?', id, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'property_model deleted successfully'
                });
            }
        });
    },

    get_all_models : (call_back)=>{
        connection.query('SELECT * FROM property_model', function (error, results, fields) {
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
                    message: 'here you fetch all property_model successfully'
                });
            }
        });
    },
    getPropertysInClass : (class_,call_back)=>{
        connection.query('SELECT * FROM property_model WHERE property_model.class = ? ORDER BY property_model.id DESC',class_, function (error, results, fields) {
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
                    message: 'here you fetch all property_model successfully'
                });
            }
        });
},

    searchPropertyInClass : (class_,key,call_back)=>{
        connection.query('SELECT * FROM property_model WHERE property_model.class = ? AND property_model.name LIKE ? ',[Number(class_),key], function (error, results, fields) {
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
                    message: 'here you fetch all property_model successfully'
                });
            }
        });
},

addProperty : (id,call_back)=>{
    connection.query('UPDATE property_model SET property_model.quantity_ = property_model.quantity_ + 1 WHERE property_model.id = ?',id, function (error, results, fields) {
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
                message: 'here you fetch all property_model successfully'
            });
        }
    });
},
    

});

module.exports = property;

