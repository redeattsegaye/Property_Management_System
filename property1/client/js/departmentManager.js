tabs=[
    "allPropertys",
   "requests",
   "customRequests",
   "allReq",
   "checkOut",
   "owned"
]

function change_tab(route) {
   for(i=0;i<tabs.length;i++){
     try {
       document.getElementById(tabs[i]).classList.remove("panel-heading");
       document.getElementById(tabs[i]).classList.add("panel-body");

     } catch (error) {
       
     }
   }
   document.getElementById(route).classList.add("panel-heading");
 
 }


right_div = document.getElementById("right_div");
var parent = "../../property_manager";
function get_all_classes() {
    change_tab(tabs[0])
    getreq("../../property_class/get_all_property_class", "", (data) => {
        var response = JSON.parse(data);
        // console.log(response);
        right_div = document.getElementById("right_div");
        right_div.innerHTML = "";
        // var add = '<div class="col-sm-12 panel"><button onclick="add_class_form()" class="btn btn-primary col-sm-12">add new Property class</button></div><br>'
        var head = '<div class="col-sm-12"><div class="panel panel-primary"><div class="panel-body">';
        var hiden = '<div></div>'
        var foot = '</div></div></div>';
        // add_button = document.createElement('div')
        // add_button.innerHTML = add
        // right_div.append(add_button);
        if (response["status"] && response["data"].length > 0) {
            for (property in response["data"]) {
                var doc = document.createElement('div');
                data = '<h3><a>' + response["data"][property]["name"] + "</a></h3>"
                data += '<p>' + response["data"][property]["description"] + '</p>'
                // data += '<button class="btn btn-primary" onclick="add_property_in_class(' + response["data"][property]["id"] + ','+ response["data"][property]["id"]+')">add</button>'
                data += "&nbsp"
                data += '<button class="btn btn-primary" onclick="view_property_in_class(' + response["data"][property]["id"] + ')">View</button>'
                doc.innerHTML = head + data + foot;
                right_div.append(doc);
            }
        }
    });
    
}

function view_property_in_class(id) {
    getreq("../../property_model/get_all_property_model_in_class/" + id, "", (data) => {
        data = JSON.parse(data);
        addb = document.createElement("div")
        var add = '<div class="col-sm-12 panel">'
        // <button onclick="add_property_in_class(' + id + ')" class="btn btn-primary col-sm-6">add new Property in This class</button>'
        add += '<input class="col-sm-6" type="text" onkeyup="searchClass('+id+')" placeholder="Search" class="form-control" id="key"></br></div><div id="bodys"></div>';

        right_div.innerHTML = ""
        var propertys = document.createElement('div');
        propertys.id="props"
        for (property in data["data"]) {
            var fdoc = document.createElement('div');
            var doc = document.createElement('div');
            fdoc.classList.add("panel")
            fdoc.classList.add("panel-default")
            doc.classList.add("panel-body")
            dom = '<div class="media"><div class="media-left">\
            <img width="150" height="150" src="../images/'+data["data"][property]["image"] +'">\
            </div><div class="media-body">';
            dom += '<h3 class="media-heading"><a>' + data["data"][property]["name"] + "</a></h3>"
            dom += '<h5>' + data["data"][property]["model"] + '</h5>'
            dom += '<p>' + data["data"][property]["description"] + '</p></div>'

            // dom += '<button data-toggle="collapse" onclick="manage_property(' + data["data"][property]["id"] + ')" class="btn btn-primary" >Manage</button>&nbsp;'
            dom += '<button class="btn btn-primary" onclick="request_property_form(' + data["data"][property]["id"] +','+id+ ')">Request </button>&nbsp'
            dom += "&nbsp"
            doc.innerHTML = dom;
            fdoc.append(doc)
            propertys.append(fdoc)
        }
        propertys.classList.add("col-sm-12")
        addb.innerHTML = add
        addb.append(propertys)
        right_div.append(addb)
    });
}


function request_property(id, class_) {

    quantity = document.getElementById("quantity").value;
    description = document.getElementById("description").value;
    params = "model=" + id + "&quantity=" + quantity + "&description=" + description;
    postreq("/request/request", params, (data) => {
        view_property_in_class(class_)
    })
    // request_property_form(id);
}

function request_property_form(id, class_) {
    right_div.innerHTML = "";
    // head ='<div><button class="btn btn-default"> << back</button></div>'
    head = '<div class="panel panel-primary">';
    head += '<div class="panel-heading">New Property Request</div><div class="panel-body">';
    // dom ='<div class="form-group"><label for="usr">Name:</label>'
    // dom +='<input type="text" class="form-control" id="name"></div>'

    // dom +='<div class="form-group"><label for="usr">Model:</label>'
    // dom +='<input type="text" class="form-control" id="model"></div>'

    dom = ' <div class="form-group"><label for="usr">Description:</label>'
    dom += '  <textarea class="form-control" rows="1" id="description"></textarea></div>'

    dom += '<div class="form-group"><label for="usr">Quantity:</label>'
    dom += '<input type="number" class="form-control" id="quantity"></div>'

    dom += '<div id="unique"></div>'

    dom += '<div><button onclick="request_property(' + id + "," + class_ + ')" class="btn btn-primary">Request</button>&nbsp'
    dom += '<button onclick="view_property_in_class(' + class_ + ')" class="btn btn-danger">cancel</button></div>'
    end = '</div></div>'
    right_div.innerHTML = head + dom + end;

}
function all_requestes() {
    change_tab(tabs[3])
    right_div.innerHTML = "";
    th = '<table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>Model</th><th>department status</th>';
    th += '<th>property manager status</th><th>accept</th><th>Decline</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table>';
    getreq("/request/all_requests", "", (data) => {
        response = JSON.parse(data);
        if (response["status"] && response["data"].length > 0) {
            var rows = ""
            for (property in response["data"]) {
                var doc = document.createElement('div');
                var name = response["data"][property]["name"]
                data = '<tr id="' + response["data"][property]["req_id"] + '">'
                data += '<td>' + name + "</td>"
                data += '<td>' + response["data"][property]["model"] + "</td>"
                data += '<td>' + response["data"][property]["step_1"] + "</td>"
                data += '<td>' + response["data"][property]["step_2"] + "</td>"
                data += '<td><button id="bu' + name + '" onclick="accept_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-success">accept</button></td>'
                data += '<td><button id="bu' + name + '" onclick="decline_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-danger">Decline</button></td></tr>'

                rows += data;
                // console.log(property)
            }
            doc.innerHTML = th + rows + tf;
            right_div.append(doc);
        }
    });
}

function get_requests() {
    change_tab(tabs[1])
    right_div.innerHTML = "";
    var add = '<div class="col-sm-12 panel"><button id="empReq" class="btn btn-primary" onclick="get_requests()" >Requests</button>\
    <button id="myReq" class="btn btn-default" onclick="viewMyRequests()" >My Request</button></div>';

    right_div.innerHTML = "";
    add_button = document.createElement('div')
    add_button.innerHTML = add
    right_div.append(add_button);

    th = '<div class="col-sm-12" id="tablePlace"><table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>Requester</th><th>department status</th>';
    th += '<th>accept</th><th>decline</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table></div>';
    getreq("../../department/requestsd", "", (data) => {
        response = JSON.parse(data);
        if (response["status"] && response["data"].length > 0) {
            var rows = ""
            for (property in response["data"]) {
                var doc = document.createElement('div');
                var name = response["data"][property]["name"]
                buttons = ""
                rowclass = ""
                if (response["data"][property]["step_1"] == "accepted") {
                    rowclass = "success"
                    buttons = "disabled"
                } else if (response["data"][property]["step_1"] == "waiting") {
                    rowclass = "warning"
                }
                else if (response["data"][property]["step_1"] == "declined") {
                    rowclass = "danger"
                    buttons = "disabled"
                }
                data = '<tr id="' + response["data"][property]["req_id"] + '">'
                data += '<td>' + name + "</td>"
                data += '<td>' + " <a onclick='publicProfile("+response["data"][property]["from_emp"]+","+'"'+"get_requests"+'"'+")'>" + response["data"][property]["first_name"] + " " + response["data"][property]["middle_name"] + "</a>" + "</td>"
                data += '<td class="' + rowclass + '">' + response["data"][property]["step_1"] + "</td>"
                // data += '<td>' + response["data"][property]["step_2"] + "</td>"
            
                data += '<td><button '+buttons+' id="bu' + name + '" onclick="accept_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-success">accept</button></td>'
                data += '<td><button '+buttons+' id="bu' + name + '" onclick="decline_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-danger">decline</button></td></tr>'
                

                rows += data;
                // console.log(property)
            }
            doc.innerHTML = th + rows + tf;
            right_div.append(doc);
        }
        else {
            doc = document.createElement("div")
            dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>There is no request aproved From Department</h5></div></div>';
            doc.innerHTML = dom;
            right_div.append(doc);
        }
    });
}





function custom_request() {
    change_tab(tabs[2])
    var add = '<div class="col-sm-12 panel"><button id="empCustomReq" class="btn btn-primary" onclick="custom_request()" >Custom Requests</button>\
            <button id="myCustomReq" class="btn btn-default" onclick="myCustom_request()" >My Custom Request</button>\
            <button id="myCustomReq" class="btn btn-default" onclick="custom_req_form()" >Add Custom Request</button></div>'

    // add +='<div class="col-sm-6 panel">  <input type="text" placeholder="Search" class="form-control" id="usr"></div>';
    right_div.innerHTML = "";
    add_button = document.createElement('div')
    add_button.innerHTML = add
    right_div.append(add_button);
    th = '<div class="col-sm-12" id="tablePlace"><table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>Requester</th><th>department status</th>';
    th += '<th>accept</th><th>decline</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table></div>';
    getreq("/department/custom_requests", "?" + Date.now(), (data) => {
        response = JSON.parse(data);
        if (response["status"] && response["data"].length > 0) {
            var rows = ""
            for (property in response["data"]) {
                var doc = document.createElement('div');
                var name = response["data"][property]["name"]
                buttons = ""
                rowclass = ""
                if (response["data"][property]["step_1"] == "accepted") {
                    rowclass = "success"
                    buttons = "disabled"
                } else if (response["data"][property]["step_1"] == "waiting") {
                    rowclass = "warning"
                }
                else if (response["data"][property]["step_1"] == "declined") {
                    rowclass = "danger"
                    buttons = "disabled"
                }
                data = '<tr id="' + response["data"][property]["req_id"] + '">'
                data += '<td>' + name + "</td>"
                data += '<td>' + " <a onclick='publicProfile("+response["data"][property]["from_emp"]+","+'"'+"custom_request"+'"'+")'>" + response["data"][property]["first_name"] + " " + response["data"][property]["middle_name"] + "</a>" + "</td>"
                data += '<td class="' + rowclass + '">' + response["data"][property]["step_1"] + "</td>"
                // data += '<td>' + response["data"][property]["step_2"] + "</td>"
            
                data += '<td><button '+buttons+' id="bu' + name + '" onclick="accept_custom_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-success">accept</button></td>'
                data += '<td><button '+buttons+' id="bu' + name + '" onclick="decline_custom_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-danger">decline</button></td></tr>'
                

                rows += data;
                // console.log(property)
            }
            doc.innerHTML = th + rows + tf;
            right_div.append(doc);
        }
        else {
            doc = document.createElement("div")
            dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>There is no request aproved From Department</h5></div></div>';
            doc.innerHTML = dom;
            right_div.append(doc);
        }
    });

}


function accept_req(id) {
    params = "req_id=" + id;
    postreq("../../department/accept", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            get_requests();
        }
    });
}

function decline_req(id) {
    params = "req_id=" + id;
    postreq("../../department/decline", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            get_requests();
        }
    });
}

function accept_custom_req(id) {
    params = "req_id=" + id;
    postreq("../../department/accept_custom", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            custom_request();
        }
    });
}

function decline_custom_req(id) {
    params = "req_id=" + id;
    postreq("../../department/decline_custom", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            custom_request();
        }
    });
}


function myCustom_request() {
    change_tab(tabs[2])
    // var add = '<div class="col-sm-6 panel"><button onclick="custom_req_form()" class="btn btn-info col-sm-12">New Custom Request</button></div>'
    // // add +='<div class="col-sm-6 panel">  <input type="text" placeholder="Search" class="form-control" id="usr"></div>';
    // right_div.innerHTML = "";
    // add_button = document.createElement('div')
    // add_button.innerHTML = add
    tab1 = document.getElementById("empCustomReq");
    tab2 = document.getElementById("myCustomReq");
    tab1.classList.remove("btn-primary")
    tab1.classList.add("btn-default")
    tab2.classList.remove("btn-default")
    tab2.classList.add("btn-primary")
    tablePlace = document.getElementById("tablePlace");
    tablePlace.innerHTML = ""
    // right_div.append(add_button);
    th = '<table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>model</th>';
    th += '<th>Quantity</th><th>Deapartment</th><th>Manager</th><th>Description</th><th>action</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table>';
    getreq("/request/user_custom_requests", "?" + Date.now(), (data) => {
        response = JSON.parse(data);
        if (response["status"] && response["data"].length > 0) {
            var rows = ""
            rowclass = ""
            status = ""
            buttons = ""
            step_1= ""
            step_2 = ""

            steps = ['<span class="glyphicon glyphicon-ok text-success"></span>','<span class="glyphicon glyphicon-time text-warning"></span>','<span class="glyphicon glyphicon-remove text-danger"></span>']
            for (req in response["data"]) {
                // if (response["data"][req]["step_1"] == "accepted" && response["data"][req]["step_2"] == "accepted") {
                //     rowclass = "success"
                //     buttons = "disabled"
                //     status = "Finised"
                //     step_1 = steps[0]
                //     step_2 = steps[0]
                    
                // }
                if (response["data"][req]["step_1"] == "accepted") {
                    rowclass = "warning"
                    status = "waiting for Propperty Manager aproval"
                    step_1 = steps[0]
                }
                if (response["data"][req]["step_1"] == "waiting") {
                    rowclass = "warning"
                    status = "Waiting for You'r Department Head Aproval"
                    step_1 = steps[1]
                    step_2 = steps[1]
                }
                if (response["data"][req]["step_1"] == "declined") {
                    rowclass = "danger"
                    buttons = "disabled"
                    status = "Declined by you Department Head"
                    step_1 = steps[2]
                    step_2 = steps[2]
                }
                // step 2
                if (response["data"][req]["step_2"] == "accepted") {
                    buttons = "disabled"
                    rowclass = "success"
                    status = "Finished you can Take out the property"
                    step_2 = steps[0]
                }
                if (response["data"][req]["step_2"] == "waiting" && response["data"][req]["step_1"] == "accepted") {
                    rowclass = "warning"
                    status = "Waiting for Property Manager Aproval"
                    step_2 = steps[1]
                }
                if (response["data"][req]["step_2"] == "declined") {
                    rowclass = "danger"
                    buttons = "disabled"
                    status = "Declined by Property Manager"
                    step_2 = steps[2]
                }

                // progressbar = "<span>" + progressinfo + "</span>"
                // progressbar += '<div class="progress" style="height:7px;"><div class="progress-bar progress-bar-' + rowclass + '" role="progressbar" aria-valuenow="0"'
                // progressbar += 'aria-valuemin="0" aria-valuemax="100" style="width:' + progress + '%"></div>'

                var doc = document.createElement('div');
                var name = response["data"][req]["name"]
                data = '<tr id="' + response["data"][req]["req_id"] + '">'
                data += '<td>' + name + "</td>"
                data += '<td>' + response["data"][req]["model"] + "</td>"
                data += '<td>' + response["data"][req]["quantity"] + "</td>"
                data += '<td class=""> ' + step_1+"</td>"
                data += '<td class="">' + step_2+"</td>"
                data += '<td class="' + rowclass + '" > ' + status + "</td>"
                // data += '<td>' + response["data"][req]["step_2"] + "</td>"
                data += '<td><button ' + buttons + ' id="bu' + name + '" onclick="cancelCustom_req(' + "'" + response["data"][req]["req_id"] + "'" + ')" class="btn btn-sm btn-danger">cancel</button></td></tr>'

                rows += data;
                step_1 = ""
                step_2 = ""
                buttons = ""
                // console.log(property)
            }

            doc.innerHTML = th + rows + tf;
            tablePlace.append(doc);
        } else {
            doc = document.createElement("div")
            dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>Their is no Custom property request yet</h5></div></div>';
            doc.innerHTML = dom;
            tablePlace.append(doc);
        }
    });

}
function custom_req_form() {
    right_div.innerHTML = "";
    head = '<div class="panel panel-primary">';
    head += '<div class="panel-heading">New Property Request</div><div class="panel-body">';
    dom = '<div class="form-group"><label for="usr">Name:</label>'
    dom += '<input type="text" class="form-control" id="name"></div>'

    dom += '<div class="form-group"><label for="usr">Model:</label>'
    dom += '<input type="text" class="form-control" id="model"></div>'

    dom += ' <div class="form-group"><label for="usr">Description:</label>'
    dom += '  <textarea class="form-control" rows="1" id="description"></textarea></div>'

    dom += '<div class="form-group"><label for="usr">Quantity:</label>'
    dom += '<input type="number" class="form-control" id="quantity"></div>'

    dom += '<div id="unique"></div>'

    dom += '<div><button onclick="add_request()" class="btn btn-success">Request</button>&nbsp'
    dom += '<button onclick="custom_request()" class="btn btn-danger">cancel</button></div>'
    end = '</div></div>'
    right_div.innerHTML = head + dom + end;
}

function add_request() {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var model = document.getElementById("model").value;
    var quantity = document.getElementById("quantity").value;
    params = "name=" + name + "&description=" + description + "&model=" + model + "&quantity=" + quantity
    postreq("/request/add_custom_request", params, (data) => {
        custom_request();
    });
}




function viewMyRequests() {
    change_tab(tabs[1])
    // th = '<div class="col-sm-2"><button onclick="filter_(filters[0])" class="btn btn-warning col-sm-11">Waiting</button></div>';
    // th += '<div class="col-sm-2"><button class="btn btn-danger col-sm-11">Declined</button></div>';
    // th += '<div class="col-sm-2"><button class="btn btn-success col-sm-11">Finished</button></div>';
  
    tab1 = document.getElementById("empReq");
    tab2 = document.getElementById("myReq");
    tab1.classList.remove("btn-primary")
    tab1.classList.add("btn-default")
    tab2.classList.remove("btn-default")
    tab2.classList.add("btn-primary")
    tablePlace = document.getElementById("tablePlace");
    tablePlace.innerHTML = ""

    th = '<table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>model</th>';
    th += '<th>Quantity</th><th>Deapartment</th><th>Manager</th><th>Description</th><th>action</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table>';
    getreq("/request/user_requests", "", (data) => {
        response = JSON.parse(data);
        if (response["status"] && response["data"].length > 0) {
            var rows = ""
            rowclass = ""
            status = ""
            buttons = ""
            step_1= ""
            step_2 = ""
  
            steps = ['<span class="glyphicon glyphicon-ok text-success"></span>','<span class="glyphicon glyphicon-time text-warning"></span>','<span class="glyphicon glyphicon-remove text-danger"></span>']
            for (req in response["data"]) {
                // if (response["data"][req]["step_1"] == "accepted" && response["data"][req]["step_2"] == "accepted") {
                //     rowclass = "success"
                //     buttons = "disabled"
                //     status = "Finised"
                //     step_1 = steps[0]
                //     step_2 = steps[0]
                    
                // }
                if (response["data"][req]["step_1"] == "accepted") {
                    rowclass = "warning"
                    status = "waiting for Propperty Manager aproval"
                    step_1 = steps[0]
                }
                if (response["data"][req]["step_1"] == "waiting") {
                    rowclass = "warning"
                    status = "Waiting for You'r Department Head Aproval"
                    step_1 = steps[1]
                    step_2 = steps[1]
                }
                if (response["data"][req]["step_1"] == "declined") {
                    rowclass = "danger"
                    buttons = "disabled"
                    status = "Declined by you Department Head"
                    step_1 = steps[2]
                    step_2 = steps[2]
                }
                // step 2
                if (response["data"][req]["step_2"] == "accepted") {
                    buttons = "disabled"
                    rowclass = "success"
                    status = "Finished you can Take out the property"
                    step_2 = steps[0]
                }
                if (response["data"][req]["step_2"] == "waiting" && response["data"][req]["step_1"] == "accepted") {
                    rowclass = "warning"
                    status = "Waiting for Property Manager Aproval"
                    step_2 = steps[1]
                }
                if (response["data"][req]["step_2"] == "declined") {
                    rowclass = "danger"
                    buttons = "disabled"
                    status = "Declined by Property Manager"
                    step_2 = steps[2]
                }
  
                // progressbar = "<span>" + progressinfo + "</span>"
                // progressbar += '<div class="progress" style="height:7px;"><div class="progress-bar progress-bar-' + rowclass + '" role="progressbar" aria-valuenow="0"'
                // progressbar += 'aria-valuemin="0" aria-valuemax="100" style="width:' + progress + '%"></div>'
  
                var doc = document.createElement('div');
                var name = response["data"][req]["name"]
                data = '<tr id="' + response["data"][req]["req_id"] + '">'
                data += '<td>' + name + "</td>"
                data += '<td>' + response["data"][req]["model"] + "</td>"
                data += '<td>' + response["data"][req]["quantity"] + "</td>"
                data += '<td class=""> ' + step_1+"</td>"
                data += '<td class="">' + step_2+"</td>"
                data += '<td class="' + rowclass + '" > ' + status + "</td>"
                // data += '<td>' + response["data"][req]["step_2"] + "</td>"
                data += '<td><button ' + buttons + ' id="bu' + name + '" onclick="cancel_req(' + "'" + response["data"][req]["req_id"] + "'" + ')" class="btn btn-sm btn-danger">cancel</button></td></tr>'
  
                rows += data;
                step_1 = ""
                step_2 = ""
                buttons=""
                // console.log(property)
            }
  
            doc.innerHTML = th + rows + tf;
            tablePlace.append(doc);
        } else {
            doc = document.createElement("div")
            dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>Their is no Request yet</h5></div></div>';
            doc.innerHTML = dom;
            tablePlace.append(doc);
        }
    });
  }