var connection = require('../config/database.js');

var user = ({
    register: (user,call_back) => {
        connection.query('INSERT INTO employes SET ?', user, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                })

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'user registered sucessfully'
                })
            }
        });
    },

    GetUser: (id,call_back) => {
        connection.query('SELECT * FROM employes WHERE id =  ?', id, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query'
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'you get user u asked for'
                });
            }
        });
    },

    
    GetUserByUsername: (id ,call_back) => {
        connection.query('SELECT * FROM employes WHERE username =  ?', id, function (error, results, fields) {
            if (error) {

                call_back({
                    status: false,
                    message: 'there are some error with query',
                    // error:error
                });

            } else {
                call_back({
                    status: true,
                    data: results,
                    message: 'you get user u asked for'
                });
            }
        });
    },

});

module.exports = user;

