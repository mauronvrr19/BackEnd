const fs = require("fs")

class container {
    constructor(archivo){
        this.archivo = archivo ;
    }
    async escribir(dato) {
        try {
            //  creo la promera y el dato es el json
            await fs.promises.writeFile(this.archivo, dato)
            console.log("todo ok")
        }
        catch(error) {
            console.log (error)
        }
    }
    async borrar(){
        try{
            // creo la promesa y le paso un array vacio
            await fs.promises.writeFile(this.archivo, "[]")
            console.log("borrado")
        }
        catch(error){ 
throw new error (error)
        }
    }
async leer () {
    try{
      const read =  await fs.promises.readFile(this.archivo,"utf-8")
      console.log(JSON.parse(read))
     return read
    }
    catch(error){   
throw new error (error)
    }
}
async id (id){ 
    try{
        const read =  await fs.promises.readFile(this.archivo,"utf-8")
        const parceado = JSON.parse(read)
        const mapa = console.table(parceado.find(prod =>prod.id == id))
      }
      catch(error){  
            console.log (error)
      }
    
}
async borrarxid (id){
    try{
        const read =  await fs.promises.readFile(this.archivo,"utf-8")
        const parceado = JSON.parse(read)
        const mapa = console.table(parceado.filter(prod =>prod.id !== id))
        return mapa
      }
      catch(error){  
            console.log (error)
      }

}


    async sobreescribir(nombre, apellido, id) {
    const nuevo = {
        nombre: nombre ,
        apellido: apellido,
        id: id,
    }
    try {
        const cont = await fs.promises.readFile(this.archivo,"utf-8")
        const now = JSON.parse(cont)
        nuevo.id = now.length + 1;
        now.push(nuevo)
        fs.writeFileSync(this.archivo, JSON.stringify(now))
    }
    catch(e){
        console.log(error)
    }
    }
}

module.exports = container;


