// function readURL(input) {
//     if (input.files && input.files[0]) {
//       var reader = new FileReader();
      
//       reader.onload = function(e) {
//         $('#blah').attr('src', e.target.result);
//       }
      
//       reader.readAsDataURL(input.files[0]);
//     }
//   }
  
//   $("#imgInp").change(function() {
//     readURL(this);
//   });

// localStorage.setItem("username", "John");
// alert("username = " + localStorage.getItem("username"));
const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });


  $(function() {
    $("a#su.button.is-success.is-inverted").on("click" , event, function(){
        event.preventDefault();
        alert("hello");
        signup(event);
    });
});
function pwSecurity(){
    let pw = document.getElementById("pw");
    let pwUP = pw.value.toUpperCase();
    let upCounter = 0;
    let noCounter = 0;
    console.log(pw);
    console.log(pwUp);
    if (pw.length < 10) {
        return false;
    }
    for (let i = 0 ; i < pw.length ; i++) {
        if (pw.charAt(i) === pwUP.charAt(i)){
            upCounter = upCounter + 1;
        }
        if (pw.charAt(i) ===  '1' || pw.charAt(i) === "2" || pw.charAt(i) === "3" ||
        pw.charAt(i) === "4"|| pw.charAt(i) === "5" || pw.charAt(i) === "6" || pw.charAt(i) === "7" ||
        pw.charAt(i) === "8" || pw.charAt(i) === "9" || pw.charAt(i) === "0" ) {
            noCounter = noCounter + 1;
        }
        if (upCounter > 1 && noCounter > 1) {
            return true;
        }
        
    }
    return false;
}
async function signup(event) {
    if (!pwSecurity()) {
        alert("Your password needs to contain atleast 2 upper case letters and 2 numbers");
    }
    
    let r = pubRoot.post('http://localhost:3000/account/create',
    {
        name: document.getElementById("un").value,
        pass: document.getElementById("pw").value,
     });
    r.then(response => {
     console.log(response.data);
    }).catch(error => {
    console.log(error);
    });
    console.log(r);
  }

 // to test login feature will delete
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
