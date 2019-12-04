//TO DO: Handle code that redirects to dashboard
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
          //TO DO : Redirect to dashboard
         console.log(response.data);
         $("h1#wrong").remove();
        }).catch(error => {
        console.log(error);
        $("div#pwbox").append("<br><h1 class='title' id='wrong' style='font-family: arial; font-size: 15px; align-items: center; text-align: center;'>Wrong Password/Username </h1>");
        });
        console.log(r);
      }
    });

    // COMMENTED CODE PLEASE IGNORE
    // import axios from '../node_modules/axios/dist/axios.js';
// {
//     "name": "chris",
//     "pass": "pass123",
//     "data": {
//       "role": 2,
//       "description": "Lazy..."
//     }
//   }
