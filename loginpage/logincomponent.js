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
        handleLogin(event);
    });
    function handleLogin(event){
        console.log(event);
        alert("event");
        console.log(document.getElementById("un").value);
        console.log(document.getElementById("pw").value);
        console.log(checkLogin());
       
    }
    async function checkLogin() {
        return await pubRoot.post(`/login`, {
          name: document.getElementById("un").value,
          pass: document.getElementById("pw").value,
          data: {},
        })
      }

    // $('#test').click(test);
    // function test(event){
    //   event.preventDefault();
    //   console.log('hi');
    //   const pubRoot = new axios.create({
    //     baseURL: "http://localhost:3000/public"
    //   });
      
    //   async function createAuthor({first = 'John', last = 'Doe', numBooks = 0}) {
    //     return await pubRoot.post(`/authors/`, {
    //       data: {first, last, numBooks}
    //     })
    //   }
      
    //   async function getAllAuthors() {
    //     return await pubRoot.get('/authors');
    //   }
      
    //   (async () => {
    //     await createAuthor({
    //       first: "chris",
    //       numBooks: 4
    //     });
      
    //     let {data} = await getAllAuthors();
    //     console.log(data)
    //   })();
        
    // }
  });

// async function createAuthor({first = 'John', last = 'Doe', numBooks = 0}) {
//   return await pubRoot.post(`/authors/`, {
//     data: {first, last, numBooks}
//   })
// }

// async function getAllAuthors() {
//   return await pubRoot.get('/authors');
// }

// (async () => {
//   await createAuthor({
//     first: "chris",
//     numBooks: 4
//   });

//   let {data} = await getAllAuthors();
//   console.log(data)
// })();

// async function handleLogin(){
//     $("input.button.is-success.is-inverted").on("click",)
// }