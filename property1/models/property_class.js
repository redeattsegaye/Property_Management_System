var connection = require('../config/database.js');

var department = ({
    add: (property_class,call_back) => {
        connection.query('INSERT INTO property_class SET ?', property_class, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'property_class registered sucessfully'
                });
            }
        });
    },

    remove: (id,call_back) =>{
        
        connection.query('DELETE FROM property_class WHERE id =  ?', id, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'property_class deleted successfully'
                });
            }
        });
    },

    get:(call_back)=>{
        connection.query('SELECT * FROM property_class ORDER BY property_class.id DESC', function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    
                    status: true,
                    data: results,
                    message: 'property_class FETCHED sucessfully'
                });
            }
        });
    }

});

module.exports = department;

