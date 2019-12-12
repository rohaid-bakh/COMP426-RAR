// USERNAME

import * as dash from "./dash.js";

let z;
let _username;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

$(function () {
    // Handles Event Creating
    // $("#makeEventButton").on("click", function (event) { renderCreateEventModal() });
    // $(document).on("click", '#cancelEventModal', function (event) {
    //     event.preventDefault();
    //     cancelEventModal()
    // });
    // $(document).on("click", "#submitCreateEvent", function (event) { submitCreateEvent() });

});


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

export const getRandomInt = function () {
    return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
};