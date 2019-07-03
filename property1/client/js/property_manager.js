tabs = [
    "allPropertys",
    "requests",
    "customRequests",
    "allReq",
    "checkOut",
    "owned"
]

function change_tab(route) {
    for (i = 0; i < tabs.length; i++) {
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
        var add = '<div class="col-sm-12 panel"><button onclick="add_class_form()" class="btn btn-primary col-sm-12">add new Property class</button></div><br>'
        var head = '<div class="col-sm-12"><div class="panel panel-primary"><div class="panel-body">';
        var hiden = '<div></div>'
        var foot = '</div></div></div>';
        add_button = document.createElement('div')
        add_button.innerHTML = add
        right_div.append(add_button);
        if (response["status"] && response["data"].length > 0) {
            for (property in response["data"]) {
                var doc = document.createElement('div');
                data = '<h3 class="col-sm-12"><a>' + response["data"][property]["name"] + "</a></h3>"
                // data += '<h3 class ="col-sm-3 pull-right"><a>' + response["data"][property]["models"] + " models</a></h3>"
                data += '<p>' + response["data"][property]["description"] + '</p>'
                data += '<button class="btn btn-primary" onclick="add_property_in_class(' + response["data"][property]["id"] + ',' + response["data"][property]["id"] + ')">add</button>'
                data += "&nbsp"
                data += '<button class="btn btn-primary" onclick="view_property_in_class(' + response["data"][property]["id"] + ')">View</button>'
                doc.innerHTML = head + data + foot;
                right_div.append(doc);
            }
        }
    else{
        doc = document.createElement("div")
        dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>There is no Class(catagory) yet</h5></div></div>';
        doc.innerHTML = dom;
        right_div.append(doc);  
    }
    });

}

function view_property_in_class(id) {
    getreq("../../property_model/get_all_property_model_in_class/" + id, "", (data) => {
        response = JSON.parse(data)
        data = JSON.parse(data);
        addb = document.createElement("div")
        var add = '<div class="col-sm-12 panel">\
        <button onclick="add_property_in_class(' + id + ')" class="btn btn-primary col-sm-6">add new Property in This class</button>';
        add += '<input class="col-sm-6" type="text" onkeyup="searchClass('+id+')" placeholder="Search" class="form-control" id="key"></br></div><div id="bodys"></div>';

        right_div.innerHTML = ""
        var propertys = document.createElement('div');
        propertys.id="props"
        if (response["status"] && response["data"].length > 0) {
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
            dom += '<p>' + data["data"][property]["description"] + '</p></div><br>'

            dom += '<button data-toggle="collapse" onclick="manage_property(' + data["data"][property]["id"] + ')" class="btn btn-primary" >Manage</button>&nbsp;'
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
    }else{

        doc = document.createElement("div")
        dom = add
        dom += '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>There is no request aproved From Department</h5></div></div>';
        doc.innerHTML = dom;
        right_div.append(doc);    
    }
    });
    // getreq("../../property_model/get_all_property_model_in_class/" + id, "", (data) => {
    //     data = JSON.parse(data);
    //     addb = document.createElement("div")
    //     var add = '<div class="col-sm-12 panel"><button onclick="add_property_in_class(' + id + ')" class="btn btn-primary col-sm-6">add new Property in This class</button>'
    //     add += '<div class="col-sm-2"></div><input onkeyup="searchClass('+id+')" class="col-sm-6" type="text" placeholder="Search" class="form-control" id="usr"></br></div>';

    //     right_div.innerHTML = ""
    //     var propertys = document.createElement('div');
    //     propertys.id="props"

    //     for (property in data["data"]) {
    //         var fdoc = document.createElement('div');
    //         var doc = document.createElement('div');
    //         fdoc.classList.add("panel")
    //         fdoc.classList.add("panel-default")
    //         doc.classList.add("panel-body")
    //         dom = '<div class="media"><div class="media-left">\
    //         <img width="150" height="150" src="../images/'+data["data"][property]["image"] +'">\
    //         </div><div class="media-body">';
    //         dom += '<h3 class="media-heading"><a>' + data["data"][property]["name"] + "</a></h3>"
    //         dom += '<h5>' + data["data"][property]["model"] + '</h5>'
    //         dom += '<p>' + data["data"][property]["description"] + '</p></div>'

    //         dom += '<button data-toggle="collapse" onclick="manage_property(' + data["data"][property]["id"] + ')" class="btn btn-primary" >Manage</button>&nbsp;'
    //         dom += '<button class="btn btn-success" onclick="request_property_form(' + data["data"][property]["id"] +','+id+ ')">Request </button>&nbsp'
    //         dom += "&nbsp"
    //         doc.innerHTML = dom;
    //         fdoc.append(doc)
    //         propertys.append(fdoc)
    //     }
    //     propertys.classList.add("col-sm-12")
    //     addb.innerHTML = add
    //     addb.append(propertys)
    //     right_div.append(addb)

    // });
}


function manage_property(id) {
    right_div.innerHTML = "";
    // right_div.innerHTML=dom

    getreq("../../property/get_properties_in_model/" + id, "", (data) => {
        data = JSON.parse(data);
        var propertys = document.createElement('div');
        if (response["status"] && response["data"].length > 0) {
        table = '<table class="table table-hover"><thead><tr>'
        table += '<th>No</th><th>ISBN</th><th>Serial Number</th></tr></thead><tbody id="table_body">'
        for (property in data["data"]) {
            table += '<tr><td>' + (parseInt(property) + 1) + "</td>"
            table += '<td>' + data["data"][property]["ISBN"] + "</td>"
            table += '<td>' + data["data"][property]["serial_number"] + '</td>'

            // table += '<td><button class="btn btn-danger" onclick="delete_property('+"'"+' + data["data"][property]["id"]'+"')"+'>Delete</button></td></tr>'


        }
        table += "<tbody></table>";
        table += '<button onclick="add_rows(' + data["data"].length + ',' + data["data"][property]["model"] + ')" class="btn btn-info">add new </button>'
        propertys.innerHTML = table
        right_div.append(propertys)
        row_number = 0
    }else{
        doc = document.createElement("div")
        dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>There is no request aproved From Department</h5></div></div>';
        doc.innerHTML = dom;
        right_div.append(doc);        
    }
    });
}
row_number = 0
function add_rows(no, model) {
    row_number += 1
    row = document.getElementById("table_body");
    var tr = document.createElement('tr');
    dom = "<td>" + parseInt(no + row_number) + "</td>"
    dom += '<td><input type="text" class="form-control" id="isbn' + no + '"></td>'
    dom += '<td><input type="text" class="form-control" id="seri' + no + '"></td>'
    dom += '<td><button onclick="saveOneProperty(' + no + ',' + model + ')" id="bu' + no + '" class="btn btn-info">Save</button></td>'
    tr.innerHTML = dom
    row.append(tr)
}
function saveOneProperty(no, model) {
    isbn = document.getElementById("isbn" + no).value;
    seri = document.getElementById("seri" + no).value;
    button = document.getElementById("bu" + no);
    params = "isbn=" + isbn + "&seri=" + seri + "&model=" + model
    isbn = document.getElementById("isbn" + no);
    seri = document.getElementById("seri" + no);
    postreq("../../property/saveOne", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            isbn.setAttribute("disabled", true);
            seri.setAttribute("disabled", true);
            button.setAttribute("disabled", true);
        }
    })
}

function add_class_form() {
    right_div.innerHTML = "";
    head = '<div class="panel panel-primary">';
    head += '<div class="panel-heading">Add a new Property Class eg(Chair)</div><div class="panel-body">';
    dom = '<div class="form-group"><label for="usr">Name:</label>'
    dom += '<input type="text" class="form-control" id="name"></div>'

    dom += ' <div class="form-group"><label for="usr">Description:</label>'
    dom += '  <textarea class="form-control" rows="4" id="description"></textarea></div>'


    dom += ' <div class="form-group"><label for="usr">Duration: </label></br>'
    dom += '<label class="radio-inline"><input id="perm" type="radio" name="optradio">Permanent</label>'
    dom += '<label class="radio-inline"><input id="temp" type="radio" name="optradio">Temporary</label></div>'

    dom += ' <div class="form-group"><label for="usr">Spesefic Duration by month:</label>'
    dom += '<input type="number" class="form-control" id="duration"></div>'

    dom += '<div><button onclick="add_class()" class="btn btn-primary">Add class</button>'
    dom += '<button onclick="get_all_classes()" class="btn btn-danger">cancel</button></div>'
    end = '</div></div>'
    right_div.innerHTML = head + dom + end;
}

function add_class() {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var perm = document.getElementById("perm").checked;
    var temp = document.getElementById("temp").checked;
    var duration = document.getElementById("duration").value;
    type = ""
    if (temp) {
        type = "Permanent"
    } else if (perm) {
        type = "Temporary"
    }
    params = "name=" + name + "&description=" + description + "&type=" + type + "&duration=" + duration;
    postreq("../../property_class/add_class", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            get_all_classes();
        }
    });

}

function add_property_in_class(id) {
    right_div.innerHTML = "";
    head = '<div class="panel panel-info">';
    head += '<div class="panel-heading">Add a new Property in this Class</div><div class="panel-body">';
    dom = '<div class="form-group"><label for="usr">Name:</label>'
    dom += '<input type="text" class="form-control" id="name"></div>'

    dom += '<div class="form-group"><label for="usr">Model:</label>'
    dom += '<input type="text" class="form-control" id="model"></div>'

    dom += ' <div class="form-group"><label for="usr">Description:</label>'
    dom += '  <textarea class="form-control" rows="1" id="description"></textarea></div>'

    dom += '<div class="form-group"><label for="usr">Quantity:</label>'
    dom += '<input onkeyup="create_uniq_forms()" type="text" class="form-control" id="quantity"></div>'

    dom += '<div class="form-group">\
        <label for="usr">Model Image</label><br>\
        <img  class="form"  src="" id="pre" width="300" height="200" alt="Image">\
        <input class="form" type="file" accept="image/*" id="img" onchange="previewFile()"  name="img">\
        </div>';
    dom += '<div id="unique"></div>'

    dom += '<div><button onclick="addModel(' + id + ')" class="btn btn-primary">Add Property</button>'
    dom += '<button onclick="get_all_classes()" class="btn btn-danger">cancel</button></div>'
    end = '</div></div>'
    right_div.innerHTML = head + dom + end;

}
function create_uniq_forms() {
    var propertys = document.getElementById("quantity").value;
    dom = "<h4>enter the following information for  single pease</h4>"
    dom += '  <table class="table">'
    dom += '<thead><tr><th>No</th><th>ISBN</th><th>Serial nuber</th></tr></thead>'
    for (i = 0; i < propertys; i++) {
        dom += '<tr>'
        dom += '<td>' + (i + 1) + '</td>'
        dom += '<td><input type="text" class="form-control" id="isbn' + i + '"></input></td>'
        dom += '<td><input type="text" class="form-control" id="seri' + i + '"></input></td>'
        dom += '</tr>'
    }
    dom += '</table>'
    document.getElementById("unique").innerHTML = dom;

}
function add_model(class_id) {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var model = document.getElementById("model").value;
    var quantity = document.getElementById("quantity").value;
    var propertys = {}
    for (i = 0; i < quantity; i++) {
        key = "key" + i
        propertys[key] = { isbn: document.getElementById("isbn" + i).value, seri: document.getElementById("seri" + i).value }
    }
    var fileSelect = document.getElementById('img');
    var files = fileSelect.files;
    var formData = new FormData();
    var file = files[0];
    if (file) {
        formData.append('file-select', file, file.name);
    }
    console.log(propertys)
    params = "name=" + name + "&description=" + description + "&model=" + model + "&class=" + class_id + "&propertys=" + JSON.stringify(propertys)+"&image="+[file,file.name]
    postreq("../../Property_model/add_Property_model", params, (data) => {
        view_property_in_class(class_id);
    });

}
function all_requestes() {
    change_tab(tabs[3])
    right_div.innerHTML = "";
    th = '<table class="table table-hover"> <thead><tr> <th>property name</th><th>Model</th><th>department status</th>';
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

function get_dep_acepted_requests() {
    change_tab(tabs[1])
    right_div.innerHTML = "";
    var add = '<div class="col-sm-12 panel"><button id="empReq" class="btn btn-primary" onclick="get_dep_acepted_requests()" >Requests</button>\
    <button id="myReq" class="btn btn-default" onclick="viewMyRequests()" >My Request</button></div>';

    right_div.innerHTML = "";
    add_button = document.createElement('div')
    add_button.innerHTML = add
    right_div.append(add_button);


    th = '<div class="col-sm-12" id="tablePlace"><table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>Model</th><th>Requester</th><th>quantity</th><th>avalable</th>';
    th += '<th>status</th><th>accept</th><th>decline</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table>';
    getreq("../../request/get_dep_acepted_requests", "", (data) => {
        response = JSON.parse(data);
        if (response["status"] && response["data"].length > 0) {
            var rows = ""
            for (property in response["data"]) {
                button = ""
                rowclass = ""
                quantity = ""
                avalable = ""
                if (response["data"][property]["step_2"] == "accepted") {
                    button = "disabled"
                    rowclass = "success"
                }
                else if (response["data"][property]["step_2"] == "waiting") {
                    button = ""
                    rowclass = "warning"
                }
                else if (response["data"][property]["step_2"] == "declined") {
                    button = "disabled"
                    rowclass = "danger"
                }
                dbutton = button
                if (response["data"][property]["quantity_"] < response["data"][property]["quantity"] && response["data"][property]["step_2"] == "waiting") {
                    button = "disabled"
                    quantity = "danger"
                    avalable = "danger"
                }
                var doc = document.createElement('div');
                var name = response["data"][property]["name"]
                data = '<tr id="' + response["data"][property]["req_id"] + '">'
                data += '<td>' + name + "</td>"
                data += '<td>' + response["data"][property]["model"] + "</td>"
                data += '<td>' + " <a onclick='publicProfile("+response["data"][property]["from_emp"]+","+'"'+"get_dep_acepted_requests"+'"'+")'>" + response["data"][property]["first_name"] + " " + response["data"][property]["middle_name"] + "</a>" + "</td>"
                data += '<td class="' + quantity + '">' + response["data"][property]["quantity"] + "</td>"
                data += '<td class="' + avalable + '">' + response["data"][property]["quantity_"] + "</td>"
                data += '<td class="' + rowclass + '">' + response["data"][property]["step_2"] + "</td>"
                data += '<td><button ' + button + ' id="bu' + name + '" onclick="accept_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-success">accept</button></td>'
                data += '<td><button ' + dbutton + ' id="bu' + name + '" onclick="decline_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-danger">decline</button></td></tr>'

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
    postreq("../../request/accept_req_dep", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            get_dep_acepted_requests();
        }
    });
}

function decline_req(id) {
    params = "req_id=" + id;
    postreq("../../request/decline_req_dep", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            get_dep_acepted_requests();
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
    th = '<div class="col-sm-12" id="tablePlace"><table class="table table-hover table-bordered"><thead><tr> <th>property name</th><th>Model</th><th>Requester</th>';
    th += '<th>status</th><th>accept</th><th>decline</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table></div>';
    getreq("/request/get_dep_acepted_custom_requests", "?" + Date.now(), (data) => {
        response = JSON.parse(data);
        if (response["status"] && response["data"].length > 0) {
            var rows = ""
            for (property in response["data"]) {
                button = ""
                rowclass = ""
                if (response["data"][property]["step_2"] == "accepted") {
                    button = "disabled"
                    rowclass = "success"
                }
                else if (response["data"][property]["step_2"] == "waiting") {
                    button = ""
                    rowclass = "warning"
                }
                else if (response["data"][property]["step_2"] == "declined") {
                    button = "disabled"
                    rowclass = "danger"
                }
                var doc = document.createElement('div');
                var name = response["data"][property]["name"]
                data = '<tr id="' + response["data"][property]["req_id"] + '">'
                data += '<td>' + name + "</td>"
                data += '<td>' + response["data"][property]["model"] + "</td>"
                data += '<td>' + " <a onclick='publicProfile("+response["data"][property]["from_emp"]+","+'"'+"custom_request"+'"'+")'>" + response["data"][property]["first_name"] + " " + response["data"][property]["middle_name"] + "</a>" + "</td>"
                data += '<td class="' + rowclass + '">' + response["data"][property]["step_2"] + "</td>"
                data += '<td><button ' + button + ' id="bu' + name + '" onclick="accept_custom_req(' + "'" + response["data"][property]["req_id"] + "'," + "'" + response["data"][property]["quantity"] + "'" + ')" class="btn btn-sm btn-success">accept</button></td>'
                data += '<td><button ' + button + ' id="bu' + name + '" onclick="decline_custom_req(' + "'" + response["data"][property]["req_id"] + "'" + ')" class="btn btn-sm btn-danger">decline</button></td></tr>'

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

function accept_custom_req(id, quantity) {
    params = "req_id=" + id;
    modalBody = document.getElementById("modal_body")

    dom = '<h3>please enter a Property detail</h3>'

    dom += '<div id="unique"></div>'
    // dom += '<h2>ISBN</div><input type="text" class="col-sm-6 form-group" id="isbn"></h2>'
    // dom += '<h2><input type="text" class="col-sm-6 form-group" id="seri"></h2>'

    dom += '<div id="err_div" style="colore:red"></div>'
    buttons = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    buttons += '<button type="button" onclick="addRequestedPropertys(' + "'" + id + "','" + quantity + "'" + ')" class="btn btn-primary">Accept</button>'
    document.getElementById("chekOut").innerHTML = buttons
    modalBody.innerHTML = dom;

    $("#exampleModal").modal()
    create_uniq_forms1(quantity)
    // postreq("../../request/accept_custom_req_dep", params, (data) => {
    //     data = JSON.parse(data);
    //     if (data["status"]) {
    //         custom_request();
    //     }
    // });
}

function decline_custom_req(id) {
    params = "req_id=" + id;
    postreq("../../request/decline_custom_req_dep", params, (data) => {
        data = JSON.parse(data);
        if (data["status"]) {
            custom_request();
        }
    });
}
// decline_custom_req_dep

function AcceptCustom(id) {

}

function create_uniq_forms1(propertys) {
    // var propertys = document.getElementById("quantity").value;
    dom = "<h4>enter the following information for  single pease</h4>"
    dom += '  <table class="table">'
    dom += '<thead><tr><th>No</th><th>ISBN</th><th>Serial nuber</th></tr></thead>'
    for (i = 0; i < propertys; i++) {
        dom += '<tr>'
        dom += '<td>' + (i + 1) + '</td>'
        dom += '<td><input type="text" class="form-control" id="isbn' + i + '"></input></td>'
        dom += '<td><input type="text" class="form-control" id="seri' + i + '"></input></td>'
        dom += '</tr>'
    }
    dom += '</table>'
    document.getElementById("unique").innerHTML = dom;

}

function addRequestedPropertys(id, quantity) {
    var propertys = {}
    for (i = 0; i < quantity; i++) {
        key = "key" + i
        propertys[key] = { isbn: document.getElementById("isbn" + i).value, seri: document.getElementById("seri" + i).value }
    }
    console.log(propertys)
    params = "req_id=" + id + "&propertys=" + JSON.stringify(propertys)
    postreq("../../property/addRequested", params, (data) => {

        change_tab("customRequests");
        $("#exampleModal").modal("hide")

    });

}


function previewFile() {
    var preview = document.getElementById('pre'); //selects the query named img
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}

function addModel(class_id) {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var model = document.getElementById("model").value;
    var quantity = document.getElementById("quantity").value;
    var propertys = {}
    for (i = 0; i < quantity; i++) {
        key = "key" + i
        propertys[key] = { isbn: document.getElementById("isbn" + i).value, seri: document.getElementById("seri" + i).value }
    }
    console.log(propertys)
    params = "name=" + name + "&description=" + description + "&model=" + model + "&class=" + class_id + "&propertys=" + JSON.stringify(propertys)
    var fileSelect = document.getElementById('img');
    var files = fileSelect.files;
    var formData = new FormData();
    var file = files[0];
    if (file) {
        formData.append('file-select', file, file.name);
    }
    formData.append('name',name);
    formData.append('description',description);
    formData.append('model',model);
    formData.append('class',class_id);
    formData.append('propertys',JSON.stringify(propertys));
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../Property_model/add_Property_model', true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("authorization", token);
    xhr.upload.onprogress = function (e) {
      // update_progress(e);
    }
    xhr.onload = function (e) {
      if (xhr.status === 200) {
        data=JSON.parse(this.responseText)
        if (data["status"]) {
            view_property_in_class(class_id)
        }
      } else {
        alert('An error occurred!');
      }
    };
    xhr.send(formData);
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


