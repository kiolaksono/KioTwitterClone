function get_data(){
    //GET TWEET FROM BACKEND
    const elTbody = document.getElementById('tbody')
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/totaltweets"; //ganti nama file sesuai nama file json kalian
    xhr.onreadystatechange = function(){
       if(this.readyState == 4 && this.status == 200){
            let tweets = JSON.parse(this.response)
            console.log(tweets.data)
            tweets["data"].forEach(item =>{
                console.log(item)
                const elTr = document.createElement("tr")
                const elTh = document.createElement("th")
                const elTdUname = document.createElement("td")
                const elTdTweets = document.createElement("td")
                
                elTdUname.innerHTML = item.username
                elTdTweets.innerHTML = item.total_tweet
                elTh.innerHTML = item.id
                elTr.append(elTh, elTdUname, elTdTweets)
                elTbody.append(elTr)

           })

       }
   }
   xhr.open("GET", url, true);
   xhr.send();
}

window.onload = function(){
    // cek apakah access_token & 
    if(localStorage.getItem("access_token") == null){
        const sectionForm = document.getElementById("section-form")
        sectionForm.classList.add("d-none")
    }
    get_data()
  }