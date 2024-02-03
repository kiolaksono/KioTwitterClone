const logout = document.getElementById("logout")
logout.addEventListener("click", function(e){
    e.preventDefault()
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/auth/logout";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        window.location.href = "/login";
        }
  };
  xhr.send();
})