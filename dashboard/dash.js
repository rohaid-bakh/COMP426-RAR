let _username;
let _userInfo;
let z;
let clickedgif;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"

});

$(function () {
    getRecentPosts();
    getPosts();    
    getEvents();
    $("#submitPostButton").on("click", function (event) { createPost(event) });
    $(document).on("click", "#giphPostButton", function (event) {
        console.log("hello");
        searchbox()
    });
    $(document).on("keydown", "textarea#text", function (event) {
        setTimeout(giphy(), 4000);
    });
    $(document).on("click", "td", function (event) {
        addgif(event);
    })

    $("#makeEventButton").on("click", function (event) { renderCreateEventModal() });
    $(document).on("click", '#cancelEventModal', function (event) {
        event.preventDefault();
        cancelEventModal()
    });
    $(document).on("click", "#submitCreateEvent", function (event) { submitCreateEvent() });
    $(document).on("click", "button.is-primary.is-light", function (event) { createReply(event) });
    $(document).on("click", "button.is-warning.is-light", function (event) { cancleReply(event) });
    $(document).on("click", "button.is-danger.is-light", function (event) { deletePosts(event) });
    $(document).on("click", "button.is-success.is-light", function (event) { editPosts(event) })
    $("#logOut").on("click", function (event) { logOut() });
    $(document).on("click", "#editProfileModal", function (event) { renderEditProfileModal() });
    $(document).on("click", "#submitProfileChanges", function (event) { submitProfileChanges() });
    $(document).on("click", "#cancelProfileChanges", function (event) {
        event.preventDefault();
        cancelProfileChanges();
    });

});

async function logOut() {
    console.log("Logging out");
    let cookiesToBeDeleted = $.cookie();
    for (let temp in cookiesToBeDeleted) {
        $.removeCookie(temp);
    }
    _username = "";
    _userInfo = undefined;
    z = "";
    clickedgif = undefined;
    window.location.href = "/../index.html";
};

async function deletePosts(event) {
    let id = event.currentTarget.id;
    let num = id.substring(6);
    deletePost(num);
    $("#box" + num).remove();
}
async function editPostSubmit(event) {
    let id = event.currentTarget.id;
    let num = id.substring(7);
    let value = document.getElementById("2textarea" + num).value;
    let gif = $("#figure" + num).html();
    if (gif == undefined) {
        gif = "";
    } else {
        gif = `<figure class="image is-square" id="figure` + num + `">`
            + gif + `</figure>`;
    }
    editPost(num, value + gif);
    $("#2textarea" + num).replaceWith(`<p id="p` + num + `">
    <br> `+
        value + '<br>' + `
    <br>
    </p>`);
    $("#figure" + num).replaceWith(gif);
    $("#2submit" + num).remove()
    $("#2cancel" + num).remove()


}
async function editPostCancel(event, post) {
    let id = event.currentTarget.id;
    let num = id.substring(7);
    $("#2textarea" + num).replaceWith(`<p id="p` + num + `">
    <br> `+
        post + '<br>' + `
    <br>
    </p>`);
    $("#2submit" + num).remove()
    $("#2cancel" + num).remove()

}
async function editPosts(event) {
    let id = event.currentTarget.id;
    let num = id.substring(4);
    let post = $("#p" + num).text();
    $("#p" + num).replaceWith(`<textarea class="textarea is-primary" placeholder="Reply...." rows="2" id="2textarea` + num + `">` +
        post
        + `</textarea>
    <button class="button is-link" id="2submit`+ num + `">Submit</button>
     <button class="button is-info" id="2cancel`+ num + `">Cancel</button>
    `)
    $(document).on("click", "button.is-link", function (event) { editPostSubmit(event) });
    $(document).on("click", "button.is-info", function (event) { editPostCancel(event, post) });
}

async function cancleReply(event) {
    let id = event.currentTarget.id;
    let num = id.substring(6);
    document.getElementById("textarea" + num).value = "";
}

async function createReply(event) {
    let id = event.currentTarget.id;
    let num = id.substring(6);
    let val = document.getElementById("textarea" + num).value;
    replyPost(num, val);
    renderQuickReply(num);
}

function renderQuickReply(num) {
    let reply = `<article class="media">
    <figure class="media-left">
        <p class="image is-64x64">
            <img src="https://bit.ly/2LM5hdj">
        </p>
    </figure>

    <div class="media-content">
        <div class="content">
            <p>
                <strong>Anon</strong>
                <br>`+ document.getElementById("textarea" + num).value + `<br>
                <small><a>Heart</a>
            </p>
        </div>
    </div>
</article>`;
    $("#div" + num).append(reply);
    document.getElementById("textarea" + num).value = "";
}

function addgif(event) {
    let id = event.currentTarget.id;
    let url = $("#" + id).children().attr('src');
    clickedgif = url;
    $("#examplegif").empty();
    $("#examplegif").append(`
     <h4 class="subtitle">Image you've selected </h4>
     <figure class="image is-128x128">
     <img src="`+ url + `">
   </figure>`);


    console.log(id);
    console.log($("#" + id).children().attr('src'));
}



async function renderPosts(posts) {
    $("#dashboard").empty();
    console.log("Render POSTS");
    console.log(posts);
    let keys = Object.keys(posts);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let replyArray = posts[key + ""].replies;
        let rep = "";
        let author = posts[key + ""].username;
        let editbutton = "";
        let deletebutton = "";
        //   let likebutton = "";
        //   let likeCount = posts[key + ""].hearts.length;
        if (author === _username) {
            editbutton = ` <button class="button is-success is-light" id="edit` + key + `">Edit</button>`;
            deletebutton = ` <button class="button is-danger is-light" id="delete` + key + `">Delete</button>`;
            // button = "";like
        } else {
            // likebutton = `<button class="button is-dark" id="but` + key + `">Like</button>`;

        }
        if (replyArray.length != 0) {

            for (let z = 0; z < replyArray.length; z++) {
                rep = rep + `<article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img src="https://bit.ly/2LM5hdj">
            </p>
        </figure>
    
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>Anon</strong>
                    <br>`+ replyArray[z] + `<br>
                </p>
            </div>
        </div>
    </article>`;
            }
        }
        let tweet = `<div class="box" id="box` + key + `">
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img src="https://bit.ly/2LM5hdj">
            </p>
        </figure>
    </article>
    <div>
        <div class="content"></div>
        <h2 class="title" id="h2`+ key + `">` + author + `</h2>
        <p id="p`+ key + `">
            <br> `+
            posts[key + ""].content
            + `
            <br>
            </p>
            `
            +
            // `<span id="count`+ key +`"><br>Like Count:<span id="chan` + key + `">` + likeCount + `</span></span>
            `
        
    </div>
    <div id=div`+ key + `>
    `+ rep + `
     </div>
        <div class="media-content">
            <div class="field">
                <p class="control">
                    <textarea class="textarea is-primary" placeholder="Reply...." rows="2" id="textarea`+ key + `"></textarea>
                </p>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary is-light" id="submit`+ key + `">Submit</button>
                        <button class="button is-warning is-light" id="cancel`+ key + `">Cancel</button> `
            + editbutton + deletebutton
            + `
                    </p>
                </div>
            </div>
        </div>
        </article>
</div>
</div>`
        $("#dashboard").prepend(tweet);
    }
}

// USE FOR TESTING PURPOSES ONLY!!! BE VERY CAREFUL!!!
async function deleteAllPosts() {
    let r = pubRoot.delete(`http://localhost:3000/private`, { headers: { Authorization: z } }).then(
        response => {
            // console.log(response);
            return response;
        }
    ).catch(error => { console.log(error) });
}

// USE FOR TESTING PURPOSES ONLY!!! BE VERY CAREFUL!!!
async function deleteAllUsers() {
    console.log("deleting users");
    let r = pubRoot.delete(`http://localhost:3000/user`, { headers: { Authorization: z } }).then(
        response => {
            console.log("deleting users almost done...");
            console.log(response);
        }
    ).catch(error => { console.log(error) });
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
            for (let i = 0; i < 5; i++) {
                let ar = data.data[i];
                console.log(ar);
                let z = ar.id;
                $("#inner").append(`<td id="` + i + `"><img src="https://i.giphy.com/media/` + z + `/giphy.webp" height="200" width="200">
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

function renderEditProfileModal() {
    console.log("Editing profile");
    console.log(_userInfo);
    let s = `<div class="modal is-active editProfileModal" id = "profileModal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Profile</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
            <label class = "label">Your Name</label>
            <div class="control">
                <input class="input is-success" type="text" id = "changeName" value = "${_userInfo.data.yourname}">
            </div>
        </div>
        <div class="field">
            <label class = "label">Your Age</label>
            <div class="control">
                <input class="input is-success" type="text" id = "changeAge" value = "${_userInfo.data.age}">
            </div>
        </div>
        <div class="field">
            <label class = "label">Your Gender Identity</label>
            <div class="control">
                <input class="input is-success" type="text" id = "changeGenderIdentity" value = "${_userInfo.data.genderIdentity}">
            </div>
        </div>
        <div class="field">
            <label class = "label">Your Pronouns</label>
            <div class="control">
                <input class="input is-success" type="text" id = "changePronouns" value = "${_userInfo.data.pronouns}">
            </div>
        </div>
        <div class="field">
            <label class = "label">Your Interests (Please enter as comma seperated list)</label>
            <div class="control">
                <textarea class="textarea" id = "changeInterests">${_userInfo.data.interest}</textarea>
            </div>
        </div>
        <div class="field">
            <label class = "label">Your Description</label>
            <div class="control">
                <textarea class="textarea" id = "changeDescription">${_userInfo.data.description}</textarea>
            </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type = "submit" id = "submitProfileChanges">Submit Profile Changes</button>
        <button class = "button" type = "submit" id = "cancelProfileChanges">Cancel Profile Changes</button>
      </footer>
    </div>
  </div>`;
    $("body").append(s);
}

// allows user to uodate profile with newInfo object
function submitProfileChanges() {
    console.log("submittingprofilechanges")
    let r = pubRoot.post(`http://localhost:3000/user/${_username}`,
        {
            data: {
                "yourname": $("#changeName")[0].value,
                "pronouns": $("#changePronouns")[0].value,
                "age": $("#changeAge")[0].value,
                "genderIdentity": $("#changeGenderIdentity")[0].value,
                "description": $("#changeDescription")[0].value,
                "interest": $("#changeInterests")[0].value.split(',')
            }
        }, {
        headers: { Authorization: z },
    }).then(response => { console.log(response); 
        _userInfo = {data: response.data.result.posted};
        console.log("After updating profile _userInfo should be: ");
        console.log(_userInfo);
        console.log("profile updated"); cancelProfileChanges();}).catch(error => { console.log(error) });
};


function cancelProfileChanges() {
    console.log("trying To Remove");
    $("#profileModal").remove();
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
        _userInfo = response.data.user;
        console.log(_userInfo);
        _username = response.data.user.name;
        console.log("Working " + _username);
        createUser();
    }).catch(error => {
        console.log(error);
    });
};

// Creates user if user is not already created.
async function createUser() {
    console.log("Creating user!");
    pubRoot.get(`http://localhost:3000/user/${_username}`, {
        headers: { Authorization: z }
    }).then(response => {
        console.log(response);
        console.log("Recieved user Info");
    }
    ).catch(error => {
        console.log("_userInfo.data = ");
        console.log(_userInfo.data);
        let r3 = pubRoot.post(`http://localhost:3000/user/${_username}`, {
            data: {
                "yourname": _userInfo.data.yourname,
                "pronouns": _userInfo.data.pronouns,
                "age": _userInfo.data.age,
                "description": _userInfo.data.description,
                "genderIdentity": _userInfo.data.genderIdentity,
                "interest": _userInfo.data.interest,
            }
        }, { headers: { Authorization: z } }).then(response => {
            console.log("Successfully created user");
            console.log(response);
        }).catch(error => { console.log(error) });
    });
};

// Allows user to read info.
async function userInfo() {
    pubRoot.get(`http://localhost:3000/user/S${_username}`, {
        headers: { Authorization: z }
    }).then(response => {
        console.log(response);
        return response;
    }
    ).catch(error => { console.log(error) });
}

// allows user to uodate profile with newInfo object
async function updateUserProfile(newInfo) {
    pubRoot.post(`http://localhost:3000/user/users/${_username}`, { data: newInfo }, {
        headers: { Authorization: z }
    }).then(response => {
        console.log(response);
        return response;
    }
    ).catch(error => { console.log(error) });
}

async function deleteProfile() {
    pubRoot.delete(`http://localhost:3000/user/users/${_username}`, { headers: { Authorization: z } }).then(
        response => { alert("Your profile is deleted until you log back in.") }
    ).catch(error => { alert("Your profile could not be deleted.") });
}

async function createPost(event) {
    // event.preventDefault();
    let imgadded = "";

    let content = $("#userNewPost")[0].value;
    console.log("Running");
    console.log(content);
    if (content != "") {
        let postId = getRandomInt();
        if (clickedgif) {
            imgadded = `<figure class="image is-square" id="figure` + postId + `">
            <img src="`+ clickedgif + `">
          </figure>`;
        }
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
            renderPosts(getPosts());
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
            temp = temp.filter(x => { x != _username })
            console.log(temp)
            let m = pubRoot.post(`http://localhost:3000/private/posts/${postId}/hearts`,
                { data: temp },
                { headers: { Authorization: z } }
            ).then(response => { return response }).catch(error => { console.log(error) });
        }).catch(error => { console.log(error) });
}

async function deletePost(postId) {
    let r = pubRoot.delete(`http://localhost:3000/private/posts/${postId}`, { headers: { Authorization: z } }).then(
        response => {
            console.log(response);
            return response;
        }
    ).catch(error => { console.log(error) });
}

async function editPost(postId, content) {
    let r = pubRoot.post(`http://localhost:3000/private/posts/${postId}/content`,
        { data: content }, { headers: { Authorization: z } }).then(response => {
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
async function renderEvents(data) {
    let z =  Object.keys(data.result);
    console.log(z);
    for (let i = 0 ; i < z.length ; i++) {
        let key = z[i];
        console.log(key);
        let current = data.result[key + ""];
        let content = current.details;
        let eventid = current.eventId;
        let host = current.host;
        let img = current.imageURL;
        let name = current.name;
        let time = current.time;
        let newTile = `
        <div class="box" id="childbox` + key + `">
        <p class="title">` + name + `</p>
        <p>@` + host  + ` ` +  time +`</p>
        <p>` + content + ` <img src="` + img+ `"></p>  
      </div>
      <br><br>`;
      $("div#events").prepend(newTile);
    }
}
async function getEvents() {
    let r = pubRoot.get('http://localhost:3000/public/events').then(response => {
        console.log(response.data);
        renderEvents(response.data);
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
