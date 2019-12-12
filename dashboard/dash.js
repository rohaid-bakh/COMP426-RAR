let _username;
let z;
let clickedgif;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"

});

$(function () {
    getRecentPosts();
    getPosts();

    // let posts = Promise.resolve(getPosts());
    // posts.then(function(value) {
    //     console.log('value: ' + value);
    //   });

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

    $("#makeEventButton").on("click", function (event) { renderCreateEventModal() });
    $(document).on("click", '#cancelEventModal', function (event) {
        event.preventDefault();
        cancelEventModal()
    });
    $(document).on("click", "button.is-primary.is-light", function (event) { cancleReply(event) });
    $(document).on("click", "button.is-warning.is-light", function (event) { createReply(event) });
    

});

async function cancleReply(event){
    console.log(event);
}

async function createReply(event){
    console.log(event);
}

async function renderPosts(posts){
    console.log("Render POSTS");
    console.log(posts);
    let keys = Object.keys(posts);
    $("#dashboard").empty();
//     const value = getPosts().then(
//         function(result) {
//             return result;
//         },
//         function(error) {}
//         );
//     console.log("//Hello//");
//    console.log(value);
//    console.log("//Hello//");


  for (let i = 0; i < keys.length ; i++){
  let key = keys[i];
  let tweet = `<div class="box">
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img src="https://bit.ly/2LM5hdj">
            </p>
        </figure>
    </article>
    <div>
        <div class="content"></div>
        <p>
            <strong>`+ posts[key+""].username+`</strong>
            <br> `+ 
            posts[key+""].content
            +`
            <br>
            <small><a id=`+key+`>Heart<br></a><br></small>
        </p>
    </div>
        <div class="media-content">
            <div class="field">
                <p class="control">
                    <textarea class="textarea is-primary" placeholder="Reply...." rows="2"></textarea>
                </p>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary is-light" id="submit`+ key +`">Submit</button>
                        <button class="button is-warning is-light" id="cancel`+ key + `">Cancel</button>
                    </p>
                </div>
            </div>
        </div>
    </article>
</div>
</div>`
$("#dashboard").prepend(tweet);

  }
    
    // console.log(getPosts());

}
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
            // console.log(response);
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
            for (let i = 0 ; i < 5 ; i++){
                let ar = data.data[i];
                console.log(ar);
                let z = ar.id;
                $("#inner").append(`<td id="`+ i +`"><img src="https://i.giphy.com/media/`+ z +`/giphy.webp" height="200" width="200">
                </img></td>
                `);
            }
            

        }, 6000);

     
    });
}

// Functions to render page.
function renderCreateEventModal() {
    let s = `<div class="modal is-active" id = "createEventModal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Post</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
            <label class = "label">Event Name</label>
            <div class="control">
                <input class="input is-success" type="text" id = "eventName">
            </div>
        </div>
        <div class="field">
            <label class = "label">Event Host</label>
            <div class="control">
                <input class="input is-success" type="text" id = "eventHost">
            </div>
        </div>
        <div class="field">
            <label class = "label">Event Time</label>
            <div class="control">
                <input class="input is-success" type="text" id = "eventTime">
            </div>
        </div>
        <div class="field">
            <label class = "label">Event Details</label>
            <div class="control">
                <textarea class="textarea" id = "eventDetails"></textarea>
            </div>
        </div>
        <div class="field">
            <label class = "label">Event Image URL</label>
            <div class="control">
                <input class="input is-success" type="text" id = "eventImgURL">
            </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type = "submit" id = "submitCreateEvent">Create</button>
        <button class = "button" type = "submit" id = "cancelEventModal">Cancel</button>
      </footer>
    </div>
  </div>`;
    $("body").append(s);
}

function cancelEventModal() {
    $("#createEventModal").remove();
}

function submitCreateEvent() {
    let name = $("#eventName")[0].value;
    let host = $("#eventHost")[0].value;
    let time = $("#eventTime")[0].value;
    let details = $("#eventDetails")[0].value;
    let imageURL = $("#eventImgURL")[0].value;

    console.log(name);
    console.log(host);
    console.log(time);
    console.log(details);
    console.log(imageURL);

    createEvent(name, host, time, details, imageURL);

    cancelEventModal();
    alert("Event has been created!");
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
        let temp = response.data.result;
        renderPosts(temp);
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

// When creating event we should provide event name, event host, event time, and event details.
async function createEvent(name, host, time, details, imageURL) {
    if (!name || !host || !time || !details) {
        alert("Event should have a name, host, time, and details");
    } else {
        let eventId = getRandomInt();
        let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}`, {
            data: {
                "eventId": eventId,
                "name": name,
                "host": host,
                "time": time,
                "details": details,
                "user": _username,
                "imageURL": (imageURL != "") ? imageURL : ""
            }
        }).then(response => {
            console.log(response);
            return response;
        }).catch(error => {
            console.log(error);
        });
    }
};

async function getEvents() {
    let r = pubRoot.get('http://localhost:3000/public/events').then(response => {
        console.log(response);
        return response;
    }).catch(error => { console.log(error) });
};

async function updateName(newName) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/name`, { data: newName }).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateHost(newHost) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/host`, { data: newHost }).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateTime(newTime) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/time`, { data: newTime }).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateDetails(newDetails) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/details`, { data: newDetails }).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateImageURL(newImageURL) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/imageURL`, { data: newImageURL }).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function deleteEvent(eventId) {
    let r = pubRoot.delete(`http://localhost:3000/private/events/${eventId}`).then(
        response => {
            console.log(response);
            return response;
        }
    ).catch(error => { console.log(error) });
};
