var connection = require('../config/database.js');


var property = ({
    add: (property,call_back) => {
        connection.query('INSERT INTO property SET ?', [property], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error : error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'property registered sucessfully'
                });
            }
        });
    },

    add_bulk: (propertys,call_back) => {
        connection.query('INSERT INTO property (ISBN,serial_number,model,key_) VALUES ?', [propertys], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error : error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'property registered sucessfully'
                });
            }
        });
    },

    remove: (isbn,call_back) =>{
        
        connection.query('DELETE FROM property WHERE ISBN =  ?', isbn, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'property deleted successfully'
                });
            }
        });
    },

    get_all_propertys : (call_back)=>{
        connection.query('SELECT * FROM property', function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },

    get_all_propertys_in_model : (model,call_back)=>{
        connection.query('SELECT * FROM property WHERE model=?',model, function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },

    get_all_models_in_class : (class_,call_back)=>{
        connection.query('SELECT * FROM property_model WHERE class=?',class_, function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },



    alocate : (user,amount,call_back)=>{
        console.log(user,amount,"confess");
        connection.query('UPDATE property SET property.status = ? WHERE property.status = "store" LIMIT ?',[user,amount], function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },

    owned : (user,call_back)=>{
        connection.query('SELECT * FROM property,property_model WHERE property.status = property.owned_by AND property_model.id = property.model AND property.owned_by = ?',user, function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },

    ownedC : (user,call_back)=>{
        connection.query('SELECT * FROM customProperty,custom_request WHERE customProperty.req= custom_request.req_id AND customProperty.owned_by = customProperty.status AND customProperty.owned_by = ?',user, function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },



    saveKey : (key_,isbn,call_back)=>{
        connection.query('UPDATE property SET property.key_ = ? WHERE property.ISBN = ?',[key_,isbn], function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },

    saveKeyC : (key_,isbn,call_back)=>{
        connection.query('UPDATE customProperty SET customProperty.key_ = ? WHERE customProperty.ISBN = ?',[key_,isbn], function (error, results, fields) {
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
                    message: 'here you fetch all proptertys successfully'
                });
            }
        });
    },

    add_bulk1: (propertys,call_back) => {
        connection.query('INSERT INTO customProperty (ISBN ,serial_number,status,key_,req) VALUES ?', [propertys], function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    error : error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'property registered sucessfully'
                });
            }
        });
    },


});



module.exports = property;

