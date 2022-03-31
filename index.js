const productos = [
  {
      "id": 1,
      "title": "Escuadra",
      "price": 123.45,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
  },
  {
      "id": 2,
      "title": "pepito",
      "price": 234.56,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
  },
  {
      "id": 3,
      "title": "Globo Terráqueo",
      "price": 345.67,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
  }

]


 const getProductos = () => {
  return productos;
};


 const getProducto = (id) => {
  const index = productos.findIndex(producto => producto.id === parseInt(id));
  if (index === -1) {
      return 'no existe el id buscado';
  }
  return productos[index];
}

 const deleteProducto = (id) => {
  const index = productos.filter(producto => producto.id === parseInt(id));
  if (index === -1) {
      return 'no existe el id buscado';
  }
  productos.splice(index, 1);
  return `el producto con id ${id} fue eliminado correctamente`
}

 const addProducto = producto => {
  const productoNuevo = { ...producto, id: productos.length + 1 };
  productos.push(productoNuevo);
  return `el producto ${productoNuevo.title} fue agregado, con un precio de $${productoNuevo.price} y un thumbnail de ${productoNuevo.thumbnail}, su id asignado es ${productoNuevo.id}`
};

 const updateProducto = (id) => {
  const index = productos.findIndex(prod => prod.id === parseInt(id));
  if (index === -1) {
      return 'no existe el id buscado';
  }}

module.exports = getProductos
// module.exports = getProducto
// module.exports = deleteProducto
// module.exports = addProducto
// module.exports = updateProducto