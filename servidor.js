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
// });


 
 
 const PORT = process.env.PORT || 8080
 const server = app.listen(PORT, () => {
     console.log(`Servidor express escuchando en el puerto ${PORT}`)
 })
 server.on('error', error => console.log(`Error en servidor ${error}`))