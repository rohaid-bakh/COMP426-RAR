//TO DO:
/* Add code to handel cancel button
 * Add code to check for symbols in password
 * Add code to check if Terms and Policy is selected
 * Add code to handle upploading pictures
 * What the hell is Display Name Yes/No?
 * Add code to redirect to dashboard
 * Add code to "delete" accounts when cancel is chosen
*/
const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });
  $(function() {
    $("a#su.button.is-success.is-inverted").on("click" , event, function(){
        event.preventDefault();
        // alert("hello");
        signup(event);
    });

    //TO DO : Cancel Button
});

    // checking password strength
function pwSecurity(){
    let pw = document.getElementById('pw').value + "";
    let pwUP = pw.toUpperCase();

    let upCounter = 0;
    let noCounter = 0;

    if (pw.length < 10) {
        alert("Your Password has to be atleast 10 characters long")
        return false;
    }

    //Checking Capitals and Numbers
    for (let i = 0 ; i < pw.length ; i++) {
        //TO DO: Symbol Check

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

    alert("Your Password Must Contain 2 Symbols and 2 Numbers");
    return false;
}
function missingfields() {
    let blankFields = "";
    if (!document.getElementById('yn').value) {
        blankFields = blankFields + "The 'Your Name' Field is Blank";
    }
    if (!document.getElementById('un').value) {
        blankFields = blankFields + "\n The 'User Name' Field is Blank";
    }
    if (!document.getElementById('pronoun').value) {
        blankFields = blankFields + "\n The 'Pronoun' Field is Blank";
    }
    if (!document.getElementById('gi').value) {
        blankFields = blankFields + "\n The 'Gender Identity' Field is Blank";
    }
    if ($("select#age").children("option:selected").val() == "Select dropdown") {
        blankFields = blankFields + "\n Please Select an age";
    }
    if (blankFields){
        alert(blankFields);
        return true;
    }
    return false;
}

function getInterests() {
    //TO DO : Make resulting array more uniform across all users
    let fullList = document.getElementById("interests").value;
    return fullList.split(",");
}
 async function signup(event) {
     //TO DO : Check for terms and policy selected
    if (!pwSecurity() && missingfields()) {
        return;
    }
    let r = pubRoot.post('http://localhost:3000/account/create',
    {
        name: document.getElementById("un").value,
        pass: document.getElementById("pw").value, 
        data: {
           yourname: document.getElementById('yn').value,
           pronouns: document.getElementById('pronoun').value,
           genderIdentity:  document.getElementById('gi').value,
           age: $("select#age").children("option:selected").val(),
           description: document.getElementById("descrpt").value,
           //Need to make arrays as uniform as possible
           //Have them enter a list thats comma seperated and new line seperated?
           //add a character limit
           interest:  getInterests(),
           }
     });
    r.then(response => {
     console.log(response.data);
     document.cookie =　response.data.jwt +"; path=./dashboard/dash.html";
     //code to redirect to dashboard
    }).catch(error => {
    console.log(error);
    alert("That Username is Already in Use, Pick a New One")
    });

    let z = pubRoot.post('http://localhost:3000/account/login',
        {
        name: document.getElementById("un").value,
        pass: document.getElementById("pw").value, 
         });
        z.then(response => {
         window.location.href = './dashboard/dash.html'; 
        }).catch(error => {
        console.log(error);
        });
    
  }

  // COMMENTED CODE PLEASE IGNORE 

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
