import Carrusel from "./carrusel";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Inicio(props) {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("Todos los productos");
  const { agregarAlCarrito } = props;

  useEffect(() => {
    async function obtenerProductos() {
      let url = "productos";
      if (id) {
        url += `?categoria=${id}`; // Suponiendo que tu API filtra productos por categoría con el parámetro "categoria".
      }

      try {
        const response = await axios.get(url);
        setProductos(response.data);

        // Establecer el nombre de la categoría, suponiendo que cada producto tiene un campo "nombre_categoria".
        if (response.data[0]) {
          setCategoriaNombre(response.data[0].nombre_categoria);
        } else {
          setCategoriaNombre("Categoría sin productos");
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    obtenerProductos();
  }, [id]);

  return (
    <>
      <Carrusel />
      <div className="container mt-5">
        <h2 className="mb-4 text-white">{categoriaNombre} disponibles:</h2>
        <div className="row">
          {productos.map((producto) => (
            <div key={producto.id_producto} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-img-container">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {producto.nombre} - ${producto.precio}
                  </h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <button
                    className="btnn btn-primary"
                    onClick={() => agregarAlCarrito(producto.id_producto, 1)}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Inicio;
