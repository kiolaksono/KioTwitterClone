function get_data(){
    //GET TWEET FROM BACKEND
    let  xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/tweets"; //ganti nama file sesuai nama file json kalian
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          let tweets = JSON.parse(this.response)
          tweets["data"].forEach(tweet => {
            const tweetSection = document.getElementById("section-tweets")
            const card = document.createElement("div")
            card.setAttribute("class", "card mt-3 mb-2")
            const cardHeader = document.createElement("div")
            cardHeader.setAttribute("class", "card-header")
            cardHeader.innerHTML = "Tweet from user " + tweet.user_id
            const cardBody  = document.createElement("div")
            cardBody.setAttribute("class", "card-body")
            const blockquote = document.createElement("blockquote")
            blockquote.setAttribute("class", "blockquote mb-2 mt-2")
            const p = document.createElement("p")
            p.innerHTML = tweet.content
            const imgEl = document.createElement("img")
            const imgAnchor = document.createElement("a")

            imgAnchor.append(imgEl)
            imgAnchor.setAttribute("href", tweet.image_name)
            imgAnchor.setAttribute("download",tweet.image_path)
            if(tweet.image_name !== null){
              imgEl.setAttribute("src", tweet.image_path)
            }
            
            blockquote.append(p, imgAnchor)
            cardBody.append(blockquote)
            card.append(cardHeader, cardBody)
            tweetSection.append(card)
         });
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

window.onload = function(){
    // cek apakah access_token & 
    if(localStorage.getItem("access_token")   == null){
        const sectionForm = document.getElementById("section-form")
        sectionForm.classList.add("d-none")
    }
    get_data()
  }
  
setInterval(refresh_token(), 1000)
function refresh_token(){
  let  xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/api/auth/refresh";
   //ganti nama file sesuai nama file json kalian
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
  xhr.onreadystatechange = function(){
     if(this.readyState == 4 && this.status == 200){
       // console.log(this.response)
       data = JSON.parse(this.response)
       localStorage.setItem("access_token", data.access_token)
      }
    }
    xhr.send()
    
}


//POST NEW TWEET
const formTweet = document.getElementById("form-tweet")
formTweet.addEventListener("submit", function(e){
    e.preventDefault()
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/tweets";

  //get data from form
  content = document.getElementById("tweets").value;

  //validasi input
  if (content == "") return alert("Content tidak boleh kosong");

  let data = JSON.stringify({
    content: content
  });


  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
  xhr.onreadystatechange = function () {
    if (this.status == 200) {

        formTweet.reset()
        divEl.setAttribute("class", "alert alert-success");
        divEl.setAttribute("role", "alert");
        divEl.innerHTML = "Tweet berhasil ditambahkan !";
      }else{
      divEl.setAttribute("class", "alert alert-danger");
      divEl.setAttribute("role", "alert");
      divEl.innerHTML = JSON.parse(this.responseText);
    }
};
  xhr.send(data);
  
  //give feedback
  const alertLoc = document.getElementById("tweet-alert")
  const divEl = document.createElement("div");
  alertLoc.appendChild(divEl);

  location.reload()

  
})

// Upload files

const formModal = document.getElementById("form-modal")
formModal.addEventListener('submit', function(e){
  e.preventDefault()

  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/api/tweets";

  let formData = new FormData()

  const content = document.getElementById('tweets-modal').value
  const file = document.getElementById('file')

  formData.append('content', content)
  formData.append('file', file.files[0])

  xhr.open("POST", url, true);
  // xhr.setRequestHeader("Content-Type", "multipart/form-data;");
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
  xhr.send(formData);
  
  location.reload()


})



//UPLOAD FILES
//POST NEW TWEET
// const formUpload = document.getElementById("form-upload")
// formUpload.addEventListener("submit", function(e){
//     e.preventDefault()
//     let xhr = new XMLHttpRequest();
//     let url = "http://127.0.0.1:5000/api/uploads";
 
//     let formData = new FormData()

//     file = document.getElementById("formFile");
//     formData.append('file', file.files[0])
    
//     xhr.open("POST", url, true);
//     xhr.send(formData);
//     xhr.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//           divEl.innerHTML = this.responseText
//           formTweet.reset()
//       }
//     };

// //   //give feedback
//   const alertLoc = document.getElementById("tweet-alert")
//   const divEl = document.createElement("div");
//   divEl.setAttribute("class", "alert alert-success");
//   divEl.setAttribute("role", "alert");
 
//   alertLoc.appendChild(divEl);

  
// })

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
        window.location.href = "/login";
        }
  };
  xhr.send();
})


