const getProductos = require("./index")
const getProducto = require("./index")
const deleteProducto = require("./index")
const addProducto = require("./index")
const updateProducto = require("./index")

//  -----------------
 const express = require ("express")
 const app = express()
 
 app.use(express.urlencoded({extended: true}));

 const router = express.Router()
 app.use ("/api", router)
 router.use(express.json())

// -------------------
const {engine} = require("express-handlebars")
app.engine("hbs", engine())
app.set("view engine", "hbs")
app.set("views", "./views")
// -------------------


 router.get('/productos', (req, res) => {
  let producto = getProductos();
  let productos = JSON.stringify(producto)
  res.render("productos",  {productos});
});


router.get('/productos/productosnuevos', (req, res) => {
  let productoNuevo = addProducto(req.body);
  // res.render("formulario", {productoNuevo});
  console.log(productoNuevo)
  res.render("formulario",productoNuevo.length !== 0 ? {productos: productoNuevo}:{error: 'no hay productos cargados'})
});

// router.get('/productos/:id', async (req, res) => {
//   const id = req.params.id;
//   let producto = getProducto(id);
//   res.send(producto);
// });

// router.delete('/productos/:id',  (req, res) => {
//   const id = req.params.id;
//   let producto =  deleteProducto(id);
//   res.send(producto);
// });


// router.put('/productos/:id', (req, res) => {
//   const id = req.params.id;
//   let productoNuevo = req.body;
//   let producto = updateProducto(id, productoNuevo);

const server = require('http').Server(app)
const io = require('socket.io')(server)

// let messages = [
// ];

// io.on('connection', function(socket) {
//     console.log('Un cliente se ha conectado');
//     socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 

//     socket.on('new-message', function(data) {
//       data.fyh = new Date().toLocaleString()
//       messages.push(data); // agregar mensajes a array 
//         io.sockets.emit('messages', messages); //emitir a todos los clientes
//     });    
// });

//-------------------sockets -------------------//
const messages = []

io.on('connection',  (socket) => { 

    io.emit('productos', producto.getAll())
    socket.on('addNewProduct', (data) => {
        console.log(data)
        producto.save(data)
        io.emit('productos', producto.getAll())
    }) 

    //chat
    
    socket.on('newMessage', (data) => {
        io.emit('message', data)
    })   
});


 const PORT = process.env.PORT || 8080
 const servidor = app.listen(PORT, () => {
     console.log(`Servidor express escuchando en el puerto ${PORT}`)
 })
 servidor.on('error', error => console.log(`Error en servidor ${error}`))
