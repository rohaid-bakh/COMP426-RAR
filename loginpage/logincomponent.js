const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});

$(function() {
    $("input.button.is-success.is-inverted").on("click" , event, function(){
        event.preventDefault();
       checkLogin();
    });
   
    async function checkLogin() {
        let r = pubRoot.post('http://localhost:3000/account/login',
        {
            name: document.getElementById("un").value,
            pass: document.getElementById("pw").value,
         });
        r.then(response => {
        document.cookie =　response.data.jwt +"; path=./dashboard/dash.html";
         console.log(response.data);
         $("h1#wrong").remove();
         window.location.href = './dashboard/dash.html'; 
        }).catch(error => {
        console.log(error);
        $('p#wrong').html("<h1 class='title' id='wrong' style='font-family: arial; font-size: 15px; align-items: center; text-align: center;'>Wrong Password/Username </h1>");
        });
        console.log(r);
      }
    });

