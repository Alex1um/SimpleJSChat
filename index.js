import {initializeApp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import {getAuth} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
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


const auth = getAuth(app);
const form = document.getElementById("auth-form")
// form.onsubmit = process_req
const name_inp = document.getElementById("auth-form-name")
const pass_inp = document.getElementById("auth-form-pass")
const msg_block = document.getElementById("msg-box")
const msg_input = document.getElementById("msg-input")

let auth_req = new XMLHttpRequest();
// auth_req.onreadystatechange = start_chat
// auth_req.addEventListener("onreadystatechange", start_chat)
form.addEventListener("submit", process_req_fetch)

function process_req(e) {
    e.preventDefault()
    auth_req.open('POST', "https://auth.weplaywith.cf", false);
    auth_req.setRequestHeader("Access-Control-Allow-Origin", "https://auth.weplaywith.cf")
    auth_req.setRequestHeader("mode", "no-cors")

    auth_req.send(JSON.stringify({
        name: name_inp.value,
        pass: pass_inp.value
    }));

    return false
}

const auth_addr = "https://firebase-auth.fly.dev"
// const auth_addr = "http://localhost:8080"

async function process_req_fetch(e) {
    e.preventDefault()
    await fetch(auth_addr, {
        method: "POST",
        // mode: "no-cors",

        headers: {
            "Access-Control-Allow-Origin": auth_addr,
            // "Origin": window.location.href,
            // 'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name_inp.value,
            pass: pass_inp.value
        })
    })
        .then((resp) => {
            console.log(resp)
        })
        .catch((error) => {
            console.log(error)
        })
}

function start_chat() {

    if (this.readyState !== 4) return false;

    if (this.status !== 200) return false;

    console.log(this.response)
    return false;

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
                    pass: pass,
                }
            )
            console.log(
                JSON({
                    message: msg_input.value + "\n\n",
                    name: name,
                })
            )
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
}
