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
    console.log("z = " + z);
    console.log("username= " + _username);

    let r = axios.post('http://localhost:3000/private/create',
        {
            headers: { Authorization: z },
            data: {username: _username,
            content: "fdsjafdjasjfldasjlfdasjlfdasjlfdasjkldasfkjlfdaskjfd"}
        });
    r.then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}