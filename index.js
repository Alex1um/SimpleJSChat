import {initializeApp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import {getAuth, signInWithCustomToken} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import {getDatabase, onChildAdded, push, ref} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUQTOYmJIjeL-ghM5Q8lEDwxrmm-OJ2c4",
    authDomain: "test-80e7e.firebaseapp.com",
    databaseURL: "https://test-80e7e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-80e7e",
    storageBucket: "test-80e7e.appspot.com",
    messagingSenderId: "653488847027",
    appId: "1:653488847027:web:5b7ab36378146ed368d8c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let chatRef = ref(db, "chat");
let name = undefined


const url_params = new URLSearchParams(window.location.search)
const token = url_params.get('t')

const auth = getAuth(app);
signInWithCustomToken(auth, token)
    .then((userCredntial) => {
        name = userCredntial.user.uid
    })
    .catch((error) => {
        location.href = "https://auth.weplaywith.cf/"
    })

// form.onsubmit = process_req
const msg_block = document.getElementById("msg-box")
const msg_input = document.getElementById("msg-input")

msg_block.scrollTop = msg_block.scrollHeight;

onChildAdded(chatRef, function add_message(msg) {
        let new_div = document.createElement("div")
        let val = msg.val()
        new_div.className = "msg row p-2"
        if (val.name === name) {
            new_div.innerHTML = `
        <span class="col-auto align-self-center"><span class="bg-primary rounded-circle"><span class="visually-hidden">New message</span></span></span>
        <fieldset class="col-8 border rounded-2 p-1 position-relative">
            <legend class="float-none w-auto mx-5 mx-sm-1 my-0">${val.name}</legend>
            <p class="text-break m-0 p-2 pt-0">${val.message}</p>
        </fieldset>
        <span class="col-3"></span>
        `
        } else {
            new_div.innerHTML = `
        <span class="col-3"></span>
        <fieldset class="col-8 border rounded-2 p-1 position-relative">
            <legend class="float-none w-auto mx-sm-1 my-0">${val.name}</legend>
            <p class="text-break m-0 p-2 pt-0">${val.message}</p>
        </fieldset>
        <span class="col-auto align-self-center"><span class="bg-primary rounded-circle"><span class="visually-hidden">New message</span></span></span>
    `
        }

        msg_block.appendChild(new_div)
        msg_block.scrollTop = msg_block.scrollHeight;
    }
)

function send() {
    if (msg_input.value !== "") {
        push(chatRef,
            {
                message: msg_input.value + "\n\n",
                name: name,
            }
        )
        // console.log(
        //     JSON.stringify({
        //         message: msg_input.value + "\n\n",
        //         name: name,
        //     })
        // )
        msg_input.value = ""
    }
}

msg_input.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
        ev.preventDefault()
        send()
    }
})

document.getElementById("msg-send").onclick = function (ev) {
    send()
}
