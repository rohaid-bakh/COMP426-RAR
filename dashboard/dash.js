const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"

  });
  $(function() {
    createPosts();
    getRecentPosts();
    console.log(document.cookie);
    });

    
    function getToken() {
        return document.cookie;
    }
    async function createPosts() {
        let token = 'Bearer ' + getToken();
        let post = pubRoot.post('http://localhost:3000/posts/create', {
            headers: {Authorization: token,},
            content: "Hello World",
            username: "rohaidbzz",
    });  post.then(response => {
        console.log(response.data.user);
       }).catch(error => {
       console.log(error);
       });
        
    }
    
    async function getRecentPosts() {
        let z = 'Bearer '+ getToken();
    
        let r = pubRoot.get('http://localhost:3000/account/status',
        {
            headers: {Authorization: z},
         });
         r.then(response => {
             console.log(response.data.user);
            }).catch(error => {
            console.log(error);
            });
        // let r = pubRoot.get('http://localhost:3000/account/')
    };
