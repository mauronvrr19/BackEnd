const container = require("./index")
const contenido = new container("./productos.txt")

contenido.escribir (JSON.stringify(
    [                                                                                                                                                     
        {                                                                                                                                                    
          title: 'Escuadra',                                                                                                                                 
          price: 123.45,                                                                                                                                     
          thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
          id: 1                                                                                                                                              
        },                                                                                                                                                   
        {                                                                                                                                                    
          title: 'Calculadora',                                                                                                                              
          price: 234.56,                                                                                                                                     
          thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
          id: 2                                                                                                                                              
        },                                                                                                                                                   
        {                                                                                                                                                    
          title: 'Globo Terráqueo',                                                                                                                          
          price: 345.67,                                                                                                                                     
          thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
          id: 3                                                                                                                                              
        }                                                                                                                                                    
      ]         
    
    )    )


const express = require ("express")
const app = express()

app.use(express.static("public"))

app.get("/productos",(req, res)=>{
contenido.leer().then(resp => res.send(resp))
})

app.get("/productosRandom",(req, res)=>{
    contenido.leer().then(resp => res.send
        (resp [Math.floor(Math.random()*resp.length)
        ]))
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))