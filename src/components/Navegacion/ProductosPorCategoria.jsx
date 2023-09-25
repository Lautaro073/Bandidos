// ProductosPorCategoria.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function ProductosPorCategoria(props) {
    




    const [productos, setProductos] = useState([]);
    const { agregarAlCarrito } = props;
    const params = useParams();
    const categoriaNombre = params.categoria;

    useEffect(() => {
        async function obtenerProductos() {
            try {
                const response = await axios.get(`https://pesadillabandidos.repl.co/api/categorias/categoria/${categoriaNombre}`);
                setProductos(response.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        }

        obtenerProductos();
    }, [categoriaNombre]);

    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-4 text-white">{categoriaNombre} disponibles:</h2>
                <div className="row">
                    {productos.length > 0 ? (
                        productos.map((producto) => (
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
                        ))
                    ) : (
                        <div className="col-12 text-center text-white">
                            Por el momento no hay productos disponibles en la categoría {categoriaNombre}.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductosPorCategoria;
