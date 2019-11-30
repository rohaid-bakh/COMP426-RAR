// import axios from '../node_modules/axios/dist/axios.js';
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
// {
//     "name": "chris",
//     "pass": "pass123",
//     "data": {
//       "role": 2,
//       "description": "Lazy..."
//     }
//   }

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
            // To add:buffer icon 
            //redirect to dashboard
         console.log(response.data);
         //removes wrong message
         $("h1#wrong").remove();
        }).catch(error => {
        console.log(error);
        $("div#pwbox").append("<h1 class='title' id='wrong'>Wrong Password/Username </h1>");
        });
        console.log(r);
      }
    });