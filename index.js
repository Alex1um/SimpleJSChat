import {initializeApp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import {getDatabase, push, ref, onValue, onChildAdded} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"
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
const chatRef = ref(db, "chat");

const msg_block = document.getElementById("msg-box")

msg_block.scrollTop = msg_block.scrollHeight;

onChildAdded(chatRef, function add_message(msg) {
    let new_div = document.createElement("div")
    new_div.className = "msg row p-2"
    new_div.innerHTML = `
    <span class="col-auto"></span>
    <span class="col-8 border rounded-2 text-break p-1">${msg.val().message}</span>
    <span class="col-3"></span>
    `

    msg_block.appendChild(new_div)
    msg_block.scrollTop = msg_block.scrollHeight;
}
)

// const address = "https://test-80e7e-default-rtdb.europe-west1.firebasedatabase.app/chat.json"
// const es = new EventSource(address)
// es.onmessage = (e) => {
//     console.log(e)
//     console.log("kekw")
// }
// es.onopen = (e) => {
//     console.log(e)
//     console.log("connected")
// }


function send() {
    if (msg_input.value !== "") {
        push(chatRef,
            {
                message: msg_input.value + "\n\n"
            }
        )
        msg_input.value = ""
    }
}

const msg_input = document.getElementById("msg-input")
msg_input.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
        ev.preventDefault()
        send()
    }
})

document.getElementById("msg-send").onclick = function (ev) {
    send()
}
