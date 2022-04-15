// let socket = io.connect(); 
// socket.on('messages', function(data) { 
//   console.log(data);
//   render(data);
// });

// function render(data) { 
//     let html = data.map(function(elem, index){ 
//       return(`<div>
//             <strong>${elem.author}</strong>: 
//             <em>${elem.text}</em> </div>`) 
//     }).join(" "); 
//     document.getElementById('messages').innerHTML = html; 
// }

// function addMessage() { 
//     let mensaje = { 
//       author: document.getElementById('username').value, 
//       text: document.getElementById('texto').value
//     }; 
//     socket.emit('new-message', mensaje); // new-message es el nombre del evento (recordatorio)

//     document.getElementById('texto').value = ''
//     document.getElementById('texto').focus()

//     return false;
// }
const socket = io.connect('http://localhost:8080');
document.getElementById('sendMessage').disabled = true
const templateTable = Handlebars.compile(`
    <table class="table table-striped">
        <thead>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
        </thead>
        <tbody>
            {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>{{this.price}}</td>
                    <td><img src="{{this.thumbnail}}" width="100px" height="100px"></td>
                </tr>
            {{/each}}
        </tbody>
    </table>
`)

socket.on('productos',(data) => {
    document.getElementById('productos').innerHTML = templateTable({productos : data})
})

document.getElementById('addList').addEventListener('click',() => {
        const data = {
            title : document.getElementById('title').value,
            price : document.getElementById('price').value,
            thumbnail : document.getElementById('thumbnail').value
        }
        socket.emit('addNewProduct',data)
})

document.getElementById('sendMessage').addEventListener('click',() => {
    if(document.getElementById('chat-input').value !== '' && document.getElementById('username').value !== ''){    
        const data = {
        userId : socket.id,
        username: document.getElementById('username').value,
        message : document.getElementById('chat-input').value
    }
    console.log(data)
    socket.emit('newMessage',data)
    document.getElementById('chat-input').value = ''
    document.getElementById('sendMessage').disabled = true
    }else{
        document.getElementById('sendMessage').disabled = true
    }
})

document.getElementById('chat-input').addEventListener('keyup',(e) => {
    document.getElementById('sendMessage').disabled = false
    if(typing == false) {
        typing = true
        socket.emit('typing',{userId:socket.id, typing:true})
        timeout = setTimeout(timeoutFunction, 3000);
        if(document.getElementById('chat-input').value ===""){
            document.getElementById('sendMessage').disabled = true
        }
    } else {
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 3000);
        if(document.getElementById('chat-input').value ===""){
            document.getElementById('sendMessage').disabled = true
        }
    }
})

socket.on('message',(data) => {
    if( data.userId === socket.id ){
        document.getElementById('chat-messages').innerHTML += `<li style="color:blue;" class="me chat__message"> <img width="20" src="public/img/${data.userId}.png" ><span class="user">${data.username}</span> <br> <br>  <span class="date"> ${fullDate()} </span> - <span class="message">${data.message}</span></li>`
    }else {
        document.getElementById('chat-messages').innerHTML += `<li class="another chat__message"> <img width="20" src="public/img/${data.userId}.png" > <span class="user">${data.username}</span> <br><br> <span class="date"> ${fullDate()} </span> - <span class="message">${data.message}</span></li>`
    } 
})


const fullDate = () => {
    const date = new Date()
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const month = (date.getMonth() + 1) < 10  ? `0${date.getMonth()}` : date.getMonth() 
    const year = date.getFullYear()
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return  `${day}/${month}/${year} ${hours}:${minutes}` 
} 