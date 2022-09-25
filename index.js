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

onChildAdded(chatRef, function add_message(msg) {
    let new_span = document.createElement("span")
    new_span.className = "msg"
    new_span.appendChild(document.createTextNode(msg.val().message))
    msg_block.appendChild(new_span)
}
// ,
//     {
//         onlyOnce: true
//     }
)

function send() {
    // let xhr = new XMLHttpRequest()
    // xhr.open("POST", address)
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //         console.log(xhr.status);
    //         console.log(xhr.responseText);
    //     }
    // };
    // let data = `{
    //     "message": "${msg_input.value}"
    // }`;
    // alert(data)
    push(chatRef,
        {
          message: msg_input.value
        }
    )
    // xhr.send(data.toString())
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
