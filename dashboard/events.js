import * as dash from "dash.js";

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

$(function() {

});

// When creating event we should provide event name, event host, event time, and event details.
async function createEvent() {
    if (!name || !host || !time || !details) {
        alert("Event should have a name, host, time, and details");
    } else {
        let eventId = dash.getRandomInt();
        let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}`, {
            data: {
                "eventId" : eventId,
                "name": name,
                "host": host,
                "time": time,
                "details": details,
                "user": dash._username,
                "imageURL": (imageURL) ? imageURL : ""
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

async function updateName (newName) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/name`, {data: newName}).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateHost (newHost) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/host`, {data: newHost}).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateTime (newTime) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/time`, {data: newTime}).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateDetails (newDetails) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/details`, {data: newDetails}).then(response => {
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

async function updateImageURL (newImageURL) {
    let r = pubRoot.post(`http://localhost:3000/public/events/${eventId}/imageURL`, {data: newImageURL}).then(response => {
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
    ).catch(error => {console.log(error)});
};

