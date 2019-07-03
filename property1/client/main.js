function login() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    params = "username="+username+"&password="+password
    postreq("auth/login",params,(data)=>{
        data=JSON.parse(data)
        if (data["status"]) {
            sessionStorage.setItem("token",data["token"])
            window.location.assign(data["page"]);
        }
    })
}