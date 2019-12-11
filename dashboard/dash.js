const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"

  });
  $(function() {
    alert("hello world?");
    console.log(document.cookie);
    getRecentPosts();
    });

    
    function getToken() {
        return document.cookie;
    }
    
    async function getRecentPosts() {
        let z = 'Bearer '+ getToken();
        console.log(z);
    
        let r = pubRoot.get('http://localhost:3000/account/status',
        {
            headers: {Authorization: z},
         });
         r.then(response => {
             console.log(response.data.user);
            }).catch(error => {
            console.log(error);
            });
    };
