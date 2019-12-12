let _username;
let z;
let clickedgif;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"

});

$(function () {
    // alert("hello world?");
    // console.log(document.cookie);
    getRecentPosts();
    $("#submitPostButton").on("click", function(event) { createPost(event)});
    $(document).on("click", "#giphPostButton", function (event) {
        console.log("hello");
        searchbox()
    });
    $(document).on("keydown", "textarea#text", function (event) {
        setTimeout(giphy(), 4000);
    });
    $(document).on("click","td", function(event){
        addgif(event);
    })
});

 function addgif(event){
     let id  = event.currentTarget.id;
     let url = $( "#"+ id).children().attr( 'src');
     clickedgif = url;
     $("#examplegif").empty();
     $("#examplegif").append(`
     <h4 class="subtitle">Image you've selected </h4>
     <figure class="image is-128x128">
     <img src="`+ url +`">
   </figure>`);
     

     console.log(id);
     console.log($( "#"+ id).children().attr( 'src'));
 }

// USE FOR TESTING PURPOSES ONLY!!! BE VERY CAREFUL!!!
async function deleteAllPosts() {
    let r = pubRoot.delete(`http://localhost:3000/private`, {headers: {Authorization: z}}).then(
        response => {
            console.log(response);
            return response;
        }
    ).catch(error => {console.log(error)});
}

function searchbox() {
    $("#giphPostButton").replaceWith("<textarea class='editTweet' rows='4' cols='40' id='text'>" + " " +
        "</textarea>");
    $("#submitBox").after(` <div id="box">
    <table class="table is-bordered">
    <tr id="inner" style="width:500px, height:600px" >
    <td>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEVVVVURwN3rAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=" height="200" width="200" id="imag1">
    </td>
    </tr>
    </table>
    </div>`)
    $("#userNewPost").after(`<div id="examplegif"></div>`);

}


function giphy() {

    let current = document.getElementById("text").value;
    console.log(current);
    let key = "BP3o4MRx8RqyjPaYrQdkgucOFL641y3M";
    setTimeout(function () {
        let current2 = current.replace(/ /g, "+");
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + current2 + "&api_key=BP3o4MRx8RqyjPaYrQdkgucOFL641y3M&limit=5");
        xhr.done(function (data) {
            console.log(data.data[0]);
            $("#inner").empty();
            for (let i = 0 ; i < 8 ; i++){
                let ar = data.data[i];
                let z = ar.images["480w_still"];
                $("#inner").append(`<td id="`+ i +`"><img src="`+ z.url +`" height="200" width="200"></img></td>
                `);
            }
            

        }, 6000);

     
    });
}

function getToken() {
    return document.cookie;
}

async function getRecentPosts() {
    z = 'Bearer ' + getToken();
    console.log("Working " + z);

    let r = pubRoot.get('http://localhost:3000/account/status',
        {
            headers: { Authorization: z },
        });
    r.then(response => {
        console.log(response.data.user);
        _username = response.data.user.name;
        console.log("Working " + _username);
        return;
    }).catch(error => {
        console.log(error);
    });
};

async function createPost(event) {
    // event.preventDefault();
    let imgadded = "";
    if (clickedgif){
        imgadded = `<figure class="image is-square">
        <img src="`+ clickedgif +`">
      </figure>`;
    }
    let content = $("#userNewPost")[0].value;
    console.log("Running");
    console.log(content);
    if (content != "") {
        let postId = getRandomInt();
        console.log("CreatingA2");
        let r = pubRoot.post(`http://localhost:3000/private/posts/${postId}`,
            {
                data: {
                    "id": postId,
                    "username": _username,
                    "content": content + imgadded,
                    "replies": [],
                    "hearts": [],
                    "timestamp": new Date()
                }
            }, {
            headers: { Authorization: z },
        }
        );
        r.then(response => {
            clickedgif = "";
            console.log(response);
            $("#userNewPost")[0].value = "";
            $("#examplegif").empty();
            $("#inner").empty();
            $("textarea#text").replaceWith(`<button class="button is-info" id="giphPostButton" type="gif">Use Giphy!</a>`);
            return response;
        }).catch(error => {
            clickedgif = "";
            console.log(error);
        });
    } else {
        alert("Content can't be blank.")
    }
};

async function getPosts() {
    let r = pubRoot.get('http://localhost:3000/private/posts', { headers: { Authorization: z } }).then(response => {
        // console.log(response);
        return response;
    }).catch(error => { console.log(error) });
};

async function likePost(postId) {
    let r = pubRoot.post(`http://localhost:3000/private/posts/${postId}/hearts`,
        { data: [_username], type: "merge" }, { headers: { Authorization: z } }).then(response => {
            console.log(response);
            return response;
        }).catch(error => { console.log(error) });
};

async function unlikePost(postId) {
    let temp;
    let r = pubRoot.get(`http://localhost:3000/private/posts/${postId}/hearts`,
        { headers: { Authorization: z } }).then(response => {
            console.log(response);
            temp = response.data.result;
            console.log(temp);
            temp = temp.filter(x => {x != _username})
            console.log(temp)
            let m = pubRoot.post(`http://localhost:3000/private/posts/${postId}/hearts`,
                {data: temp},
                { headers: { Authorization: z }}
            ).then(response => { return response }).catch(error => { console.log(error) });
        }).catch(error => { console.log(error) });
}

async function deletePost(postId) {
    let r = pubRoot.delete(`http://localhost:3000/private/posts/${postId}`, {headers: {Authorization: z}}).then(
        response => {
            console.log(response);
            return response;
        }
    ).catch(error => {console.log(error)});
}

async function editPost(postId, content) {
    let r = pubRoot.post(`http://localhost:3000/private/posts/${postId}/content`,
        { data: content}, { headers: { Authorization: z } }).then(response => {
            console.log(response);
            return response;
        }).catch(error => { console.log(error) });
}

async function replyPost(postId, content) {
    let r = pubRoot.post(`http://localhost:3000/private/posts/${postId}/replies`,
    { data: [content], type: "merge" }, { headers: { Authorization: z } }).then(response => {
        console.log(response);
        return response;
    }).catch(error => { console.log(error) });
}

let getRandomInt = function () {
    return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
};