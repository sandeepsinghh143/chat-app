const socket = io();
const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("message");
const allMessages = document.getElementById("messages");

//received from socket
socket.on("message",(message,id)=>{
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = message;
    if(socket.id==id){
        div.className="text-right"
        p.className = "user-text client-text";
    }else{
        p.className = "user-text";
    }
    div.append(p);
    allMessages.append(div);
    allMessages.scrollTo(0, allMessages.scrollHeight);
})
//send to socket
sendButton.addEventListener("click",(e)=>{
    const message = messageInput.value;
    if(message!== ""){
        socket.emit("message",message);
    }
    messageInput.value="";
})

messageInput.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        const message = messageInput.value;
        if(message!== ""){
            socket.emit("message",message);
        }
        messageInput.value="";
        }
})