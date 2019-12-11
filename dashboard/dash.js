const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"

  });
  $(function() {
    alert("hello world?");
    console.log(document.cookie);
    getRecentPosts();
    });

    
    function getToken() {
        return document.cookie + "";
    }
    async function getRecentPosts() {
        let z = 'Bearer '+ getToken().substring(4);
    
        let r = pubRoot.get('http://localhost:3000/account/status',
        {
            headers: {Authorization: z},
         });
         r.then(response => {
             console.log(response.data);
            }).catch(error => {
            console.log(error);
            });
    };
