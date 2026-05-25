import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Compras from "../src/compras/compras";
import * as ComprasApi from "../src/api/compras";

describe("Compras Component", () => {
  beforeEach(() => {
    localStorage.setItem("clienteID", "1");
  });

  it("debe mostrar mensaje cuando no existen compras", async () => {
    spyOn(ComprasApi, "getVentasByUsuario").and.returnValue(
      Promise.resolve([])
    );

    render(<Compras />);

    expect(screen.getByText("Cargando compras...")).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText("No tienes compras registradas.")).toBeTruthy();
    });
  });

  it("debe mostrar listado de compras", async () => {
    spyOn(ComprasApi, "getVentasByUsuario").and.returnValue(
      Promise.resolve([
        {
          idVenta: 1,
          idUsuario: 1,
          fechaCreacion: "2026-05-24",
          total: 15000,
        },
      ])
    );

    render(<Compras />);

    await waitFor(() => {
      expect(screen.getByText("Mis Compras")).toBeTruthy();
      expect(screen.getByText(/Compra #1/)).toBeTruthy();
      expect(screen.getByText("Ver detalle")).toBeTruthy();
    });
  });

  it("debe mostrar detalle de una compra", async () => {
    spyOn(ComprasApi, "getVentasByUsuario").and.returnValue(
      Promise.resolve([
        {
          idVenta: 1,
          idUsuario: 1,
          fechaCreacion: "2026-05-24",
          total: 15000,
        },
      ])
    );

    spyOn(ComprasApi, "getDetallesByVenta").and.returnValue(
      Promise.resolve([
        {
          idDetalle: 1,
          idVenta: 1,
          idCarta: 25,
          cantidad: 2,
          precio: 7500,
          imagenProducto: "pikachu.png",
          nombreProducto: "Pikachu",
        },
      ])
    );

    render(<Compras />);

    await waitFor(() => {
      expect(screen.getByText("Ver detalle")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Ver detalle"));

    await waitFor(() => {
      expect(screen.getByText("Pikachu")).toBeTruthy();
      expect(screen.getByText("2")).toBeTruthy();
      expect(screen.getByText("$7500")).toBeTruthy();
      expect(screen.getByText("$15000")).toBeTruthy();
    });
  });
});