var connection = require('../config/database.js');

var department = ({
    add: (department,call_back) => {
        connection.query('INSERT INTO department SET ?', department, function (error, results, fields) {
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

    remove: (isbn,call_back) =>{
        
        connection.query('DELETE FROM department WHERE dep_id =  ?', isbn, function (error, results, fields) {
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


    get_requests: (department,call_back) => {
        connection.query('SELECT * FROM request,department,employes,property_model WHERE request.from_emp = employes.id and employes.departement = department.dep_id and request.model = property_model.id and department.dep_id = ?', department, function (error, results, fields) {
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
        connection.query('UPDATE request SET step_1_aprover = ? ,step_1 ="declined",status = 0 WHERE req_id = ?',[ emp_id, req_id], function (error, results, fields) {
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
    

    get_custom_requests: (department,call_back) => {
        connection.query('SELECT * FROM custom_request,department,employes WHERE custom_request.from_emp = employes.id and employes.departement = department.dep_id and department.dep_id = ?', department, function (error, results, fields) {
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

    acceptCustom_req: (emp_id,req_id,call_back) => {
        connection.query('UPDATE custom_request SET step_1_aprover = ? ,step_1 ="accepted" WHERE req_id = ?',[ emp_id, req_id], function (error, results, fields) {
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

    declineCustom_req: (emp_id,req_id,call_back) => {
        connection.query('UPDATE custom_request SET step_1_aprover = ? ,step_1 ="declined",status = 0 WHERE req_id = ?',[ emp_id, req_id], function (error, results, fields) {
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

module.exports = department;

