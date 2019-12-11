let _username;
let z;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"

});

$(function () {
    // alert("hello world?");
    // console.log(document.cookie);
    getRecentPosts();
    $(document).on("click", '#submitPostButton', createPost);
});


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

async function createPost() {
    let content = "sdadasdasdsasfdfdsfdasdfsdasdsadsa";
    let postId = getRandomInt();
    let r = axios.post('http://localhost:3000/private/posts',
        {
            data: {[postId]: {
                "id": postId,
                "username": _username,
                "content": content,
                "replies": [],
                "hearts": [],
                "timestamp": new Date()
              } 
            }
        }, {
            headers: {Authorization: z},
        }
        );
    r.then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
}

async function getPosts() {
    let r = axios.get('http://localhost:3000/private/posts', {headers: {Authorization: z}}).then(response => {
        console.log(response);
        return response;
    }).catch(error => {console.log(error)});
}


let getRandomInt = function () {
    return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
  };