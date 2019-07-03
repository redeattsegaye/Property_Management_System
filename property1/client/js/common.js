token = ""
var user


function init() {
  token = sessionStorage.getItem("token")
  if (token == null) {
    var path = window.location.pathname
    if (path != "/") {
      window.location.assign("http://" + window.location.host);
    }
  }
}
init();
function getreq(url, param, func) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      func(this.responseText);
    }
  };
  xhttp.open("GET", url + "?" + param + "" + Date.now(), true);
  xhttp.setRequestHeader("authorization", token);
  xhttp.send();
}

function postreq(url, param, func) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      func(this.responseText);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader("authorization", token);
  xhttp.send(param);
}


function logout() {
  sessionStorage.clear();
  window.location.assign("http://" + window.location.host);
}

function profile() {
  dom = '<div class="panel panel-primary">'
  dom += '<div class="panel-body">'
  getreq("../../auth/profile", "", (data) => {
    data = JSON.parse(data)
    doc = document.createElement("div");
    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'First Name : ' + data["data"][0]["first_name"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'Middle Name : ' + data["data"][0]["middle_name"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'Last Name : ' + data["data"][0]["last_name"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'Department : ' + data["data"][0]["departement"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'id : ' + data["data"][0]["emp_id"] + '</div></div>'

    dom += '</div></div>'
    doc.innerHTML = dom;
    right_div.innerHTML = "";
    right_div.append(doc)
  });
}


function owned_property() {
  change_tab("owned");
  getreq("/property/owned", "", (data) => {
    response = JSON.parse(data);
    th = '<table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>model</th>';
    th += '<th>Serial No</th><th>ISBN</th><th>description</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table>';

    right_div.innerHTML = ""

    domm = '<div class="col-sm-12">'
    domm += '<button class="btn btn-primary"  onclick="owned_property()">Normal Propertys</button>&nbsp;';
    domm += '<button class="btn btn-default" onclick="owned_property1()">Custom cPropertys</button>'
    domm +='</div>'
    docc = document.createElement("div")
    docc.innerHTML = domm;
    right_div.append(docc);

    if (response["status"] && response["data"].length > 0) {
        rows = ""
        for (req in response["data"]) {
            var doc = document.createElement('div');
            var name = response["data"][req]["name"]
            data = '<tr id="' + response["data"][req]["req_id"] + '">'
            data += '<td>' + name + "</td>"
            data += '<td>' + response["data"][req]["model"] + "</td>"
            data += '<td>' + response["data"][req]["serial_number"] + "</td>"
            data += '<td>' + response["data"][req]["ISBN"] + "</td>"
            data += '<td>' + response["data"][req]["description"] + "</td>"

            rows += data;
            
        }
        doc.innerHTML = th + rows + tf;
        right_div.append(doc);
    }
    else {
      doc = document.createElement("div")
      dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>You didnt Own any Property yet</h5></div></div>';
      doc.innerHTML = dom;
      right_div.append(doc);
  }
  });
}

function owned_property1() {
  change_tab("owned");
  getreq("/property/ownedC", "", (data) => {
    response = JSON.parse(data);
    th = '<table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>model</th>';
    th += '<th>Serial No</th><th>ISBN</th><th>description</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table>';
    right_div.innerHTML = ""

    domm = '<div class="col-sm-12">'
    domm += '<button class="btn btn-default"  onclick="owned_property()">Normal Propertys</button>&nbsp;';
    domm += '<button class="btn btn-primary" onclick="owned_property1()">Custom cPropertys</button>'
    domm +='</div>'
    docc = document.createElement("div")
    docc.innerHTML = domm;
    right_div.append(docc);

    response = JSON.parse(data);
    if (response["status"] && response["data"].length > 0) {
        rows = ""
        for (req in response["data"]) {
            var doc = document.createElement('div');
            var name = response["data"][req]["name"]
            data = '<tr id="' + response["data"][req]["req_id"] + '">'
            data += '<td>' + name + "</td>"
            data += '<td>' + response["data"][req]["model"] + "</td>"
            data += '<td>' + response["data"][req]["serial_number"] + "</td>"
            data += '<td>' + response["data"][req]["ISBN"] + "</td>"
            data += '<td>' + response["data"][req]["description"] + "</td>"

            rows += data;
            
        }
        doc.innerHTML = th + rows + tf;
        right_div.append(doc);
    }
    else {
      doc = document.createElement("div")
      dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>You didnt Own any Property yet</h5></div></div>';
      doc.innerHTML = dom;
      right_div.append(doc);
  }
  });
}


function finished_requests() {
  change_tab("checkOut");
  getreq("/request/finished", "", (data) => {
    response = JSON.parse(data);
    var add = '<div class="col-sm-12 panel"><button id="empCustomReq" class="btn btn-primary" onclick="finished_requests()" >Requested checkouts</button>\
            <button id="myCustomReq" class="btn btn-default" onclick="finished_requests1()" >Custom checkouts</button></div>';

    right_div.innerHTML = "";
    add_button = document.createElement('div')
    add_button.innerHTML = add
    right_div.append(add_button);

    th = '<div class="col-sm-12"><table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>model</th>';
    th += '<th>Serial No</th><th>ISBN</th><th>Store</th><th>location</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table></div>';

    if (response["status"] && response["data"].length > 0) {
      var rows = ""
        for (req in response["data"]) {
            var doc = document.createElement('div');
            var name = response["data"][req]["name"]
            data = '<tr id="' + response["data"][req]["req_id"] + '">'
            data += '<td>' + name + "</td>"
            data += '<td>' + response["data"][req]["model"] + "</td>"
            data += '<td>' + response["data"][req]["serial_number"] + "</td>"
            data += '<td>' + response["data"][req]["ISBN"] + "</td>"
            // data += '<td>' + response["data"][req]["description"] + "</td>"

            data += '<td>' + response["data"][req]["storeName"] + "</td>"
            data += '<td>' + response["data"][req]["location"] + "</td>"
            data += '<td> <button class="btn btn-primary" onclick="take_out(' + "'" + response["data"][req]["key_"] + "'" + ",'"+(response["data"][req]["ISBN"]) +"'" +')">CheckOut</button></td>'




            rows += data;
            
        }
        doc.innerHTML = th + rows + tf;
        right_div.append(doc);
    }
    else {
      doc = document.createElement("div")
      dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>No Property to Chekout</h5></div></div>';
      doc.innerHTML = dom;
      right_div.append(doc);
  }

  })
}


function take_out(key_,ISBN) {
  modalBody = document.getElementById("modal_body")
  dom ='<h3>Your key to checkout this property</h3>'
  dom +='<h2><input type="text" class="col-sm-10 form-group" id="key_" value="'+key_+'"></h2>'
  dom +='<h2><button class="col-sm-2 btn btn-primary" onclick="generateKey()">regenerate</button></h2>'
  dom +='<div id="err_div" class="col-sm-12" style="colore:red"></div>'
  buttons = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
  buttons += '<button type="button" onclick="saveKey('+"'"+key_+"','"+ISBN+"'"+')" class="btn btn-primary">Check Out</button>'
  document.getElementById("chekOut").innerHTML=buttons
  modalBody.innerHTML = dom;

  $("#exampleModal").modal()
  // view_requests()
}
function generateKey() {
  document.getElementById("key_").value=Date.now();
}

function saveKey(key_,ISBN){
  newkey =   document.getElementById("key_").value;
  if(newkey != key_){
    key_ = newkey
    params = "key_="+key_ +"&isbn="+ISBN
    postreq("../../property/saveKey",params,(data)=>{
      data=JSON.parse(data);
      if (data["status"]) {
        $("#exampleModal").modal("hide")
        finished_requests()
      }else{
        document.getElementById("err_div").innerHTML = data["message"];
      }
    })
  }else{
    $("#exampleModal").modal("hide")
  }
}




// custom 
function finished_requests1() {
  change_tab("checkOut");
  getreq("/request/finishedC", "", (data) => {
    response = JSON.parse(data);
    var add = '<div class="col-sm-12 panel"><button id="empCustomReq" class="btn btn-default" onclick="finished_requests()" >Requested checkouts</button>\
            <button id="myCustomReq" class="btn btn-primary" onclick="finished_requests1()" >Custom checkouts</button></div>';

    right_div.innerHTML = "";
    add_button = document.createElement('div')
    add_button.innerHTML = add
    right_div.append(add_button);

    th = '<div class="col-sm-12"><table class="table table-hover table-bordered"> <thead><tr> <th>property name</th><th>model</th>';
    th += '<th>Serial No</th><th>ISBN</th><th>Store</th><th>location</th></tr></thead><tbody id="table_body"><tr>'
    tf = '</tr></tbody></table></div>';

    if (response["status"] && response["data"].length > 0) {
      var rows = ""
        for (req in response["data"]) {
            var doc = document.createElement('div');
            var name = response["data"][req]["name"]
            data = '<tr id="' + response["data"][req]["req_id"] + '">'
            data += '<td>' + name + "</td>"
            data += '<td>' + response["data"][req]["model"] + "</td>"
            data += '<td>' + response["data"][req]["serial_number"] + "</td>"
            data += '<td>' + response["data"][req]["ISBN"] + "</td>"
            data += '<td>' + response["data"][req]["description"] + "</td>"

            data += '<td>' + response["data"][req]["storeName"] + "</td>"
            data += '<td>' + response["data"][req]["location"] + "</td>"
            data += '<td> <button class="btn btn-primary" onclick="take_outC(' + "'" + response["data"][req]["key_"] + "'" + ",'"+(response["data"][req]["ISBN"]) +"'" +')">CheckOut</button></td></tr>'




            rows += data;
            
        }
        doc.innerHTML = th + rows + tf;
        right_div.append(doc);
    }
    else {
      doc = document.createElement("div")
      dom = '<div class="col-sm-12 alert"><div class="alert alert-info"><h5>No Property to Chekout</h5></div></div>';
      doc.innerHTML = dom;
      right_div.append(doc);
  }

  })
}

function take_outC(key_,ISBN) {
  modalBody = document.getElementById("modal_body")
  dom ='<h3>Your key to checkout this property</h3>'
  dom +='<h2><input type="text" class="col-sm-10 form-group" id="key_" value="'+key_+'"></h2>'
  dom +='<h2><button class="col-sm-2 btn btn-primary" onclick="generateKey()">regenerate</button></h2>'
  dom +='<div id="err_div" class="col-sm-12" style="colore:red"></div>'
  buttons = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
  buttons += '<button type="button" onclick="saveKeyC('+"'"+key_+"','"+ISBN+"'"+')" class="btn btn-primary">Check Out</button>'
  document.getElementById("chekOut").innerHTML=buttons
  modalBody.innerHTML = dom;

  $("#exampleModal").modal()
  // view_requests()
}


function saveKeyC(key_,ISBN){
  newkey =   document.getElementById("key_").value;
  if(newkey != key_){
    key_ = newkey
    params = "key_="+key_ +"&isbn="+ISBN
    postreq("../../property/saveKeyC",params,(data)=>{
      data=JSON.parse(data);
      if (data["status"]) {
        $("#exampleModal").modal("hide")
        finished_requests()
      }else{
        document.getElementById("err_div").innerHTML = data["message"];
      }
    })
  }else{
    $("#exampleModal").modal("hide")
  }
}



function publicProfile(id,cb) {
  dom ='<div class="panel"><button class="btn btn-primary" onclick="'+cb+'()">< Back</button></div>\
  <div class="panel panel-primary">';
  dom += '<div class="panel-body">'
  getreq("../../auth/publicProfile/"+id, "", (data) => {
    data = JSON.parse(data)
    doc = document.createElement("div");
    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'First Name : ' + data["data"][0]["first_name"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'Middle Name : ' + data["data"][0]["middle_name"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'Last Name : ' + data["data"][0]["last_name"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'Department : ' + data["data"][0]["departement"] + '</div></div>'

    dom += '<div class="panel panel-info"><div id="requests" class="panel-body">'
    dom += 'id : ' + data["data"][0]["emp_id"] + '</div></div>'

    dom += '</div></div>'
    doc.innerHTML = dom;
    right_div.innerHTML = "";
    right_div.append(doc)
  });
}

function searchClass(id) {
  key = document.getElementById("key").value;
  if(key == ""){
    view_property_in_class(id);
    return
  }
  getreq("../../property_model/searchPropertyInClass/" + id+"/"+key+"", "", (data) => {
    data = JSON.parse(data);
    addb = document.createElement("div")
    var add = '<div class="">'
    // <button onclick="add_property_in_class(' + id + ')" class="btn btn-primary col-sm-6">add new Property in This class</button>'
    // add += '<input class="col-sm-6" type="text" placeholder="Search" class="form-control" id="usr"></br></div>';

    // right_div.innerHTML = ""
    var propertys = document.createElement('div');
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
        dom += "&nbsp</div>"
        doc.innerHTML = dom;
        fdoc.append(doc)
        propertys.append(fdoc)
    }
    // propertys.classList.add("")
    var props = document.getElementById("props")
    props.innerHTML = add +"</div>"
    props.append(propertys)
    // right_div.append(addb)

    // addb.innerHTML = add
    // addb.append(propertys)
    // right_div.append(addb)

});
}