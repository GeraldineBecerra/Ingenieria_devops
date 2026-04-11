import { useEffect, useState } from "react";
import { getVentasByUsuario, getDetallesByVenta } from "../api/compras";
import type { Venta, Detalle } from "../api/interfaces/compras.interface";

const Compras = () => {
  const [compras, setCompras] = useState<Venta[]>([]);
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("clienteID");

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await getVentasByUsuario(userId);
        setCompras(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, [userId]);

  const verDetalle = async (idVenta: number) => {
    try {
      const data = await getDetallesByVenta(idVenta);
      setDetalles(data);
      setVentaSeleccionada(idVenta);
    } catch (error) {
      console.error("Error al cargar detalles", error);
    }
  };

  if (loading) return <p>Cargando compras...</p>;
  if (!compras.length) return <p>No tienes compras registradas.</p>;

  return (
    <div className="container mt-4">
      <h2 className=" bg-white bg-opacity-75 p-4 rounded shadow text-center">
        Mis Compras
      </h2>

      {compras.map((venta) => (
        <div
          key={venta.idVenta}
          className="card mb-3 bg-white bg-opacity-75 p-4 rounded shadow"
        >
          <div className="card-header d-flex justify-content-between">
            <div>
              <strong>Compra #{venta.idVenta}</strong> -{" "}
              {new Date(venta.fechaCreacion).toLocaleDateString()}
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => verDetalle(venta.idVenta)}
            >
              Ver detalle
            </button>
          </div>

          {/* Mostrar detalles SOLO si esta venta está seleccionada */}
          {ventaSeleccionada === venta.idVenta && (
            <div className="card-body bg-white shadow-sm rounded bg-opacity-75">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Carta</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>

                <tbody>
                  {detalles.map((detalle) => (
                    <tr key={detalle.idDetalle}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {/* Imagen de la carta */}
                          {detalle.imagenProducto ? (
                            <img
                              src={detalle.imagenProducto}
                              alt={detalle.nombreProducto}
                              style={{
                                width: "50px",
                                height: "70px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <span>Sin imagen</span>
                          )}

                          {/* Nombre de la carta */}
                          <span>
                            {detalle.nombreProducto ?? "Carta desconocida"}
                          </span>
                        </div>
                      </td>

                      <td>{detalle.cantidad}</td>
                      <td>${detalle.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-end">
                <strong>Total:</strong> ${venta.total}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Compras;
