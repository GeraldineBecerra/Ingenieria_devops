import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Perfil from "../src/usuario/components/Perfil";
import * as UserServer from "../src/api/userServer";

describe("Perfil Component", () => {
  beforeEach(() => {
    localStorage.setItem("clienteID", "1");
  });

  it("debe mostrar los datos del usuario", async () => {
    spyOn(UserServer, "getUserById").and.returnValue(
      Promise.resolve({
        idUsuario: 1,
        nombre: "Luis",
        apellido: "Muñoz",
        email: "luis@test.com",
        rut: "11.111.111-1",
        contraseña: ""
      })
    );

    render(<Perfil />);

    await waitFor(() => {
      expect(screen.getByText("Mi Perfil")).toBeTruthy();
      expect(screen.getByDisplayValue("Luis")).toBeTruthy();
      expect(screen.getByDisplayValue("Muñoz")).toBeTruthy();
    });
  });

  it("debe validar nombre vacío", async () => {
    spyOn(UserServer, "getUserById").and.returnValue(
      Promise.resolve({
        idUsuario: 1,
        nombre: "Luis",
        apellido: "Muñoz",
        email: "luis@test.com",
        rut: "11.111.111-1",
        contraseña: ""
      })
    );

    render(<Perfil />);

    await waitFor(() => {
      expect(screen.getByText("Mi Perfil")).toBeTruthy();
    });

    const nombreInput = screen.getByDisplayValue("Luis");

    fireEvent.change(nombreInput, {
      target: {
        name: "nombre",
        value: ""
      }
    });

    fireEvent.click(screen.getByText("Guardar"));

    expect(
      screen.getByText("Nombre y apellido no pueden estar vacíos")
    ).toBeTruthy();
  });

  it("debe mostrar modal de eliminación", async () => {
    spyOn(UserServer, "getUserById").and.returnValue(
      Promise.resolve({
        idUsuario: 1,
        nombre: "Luis",
        apellido: "Muñoz",
        email: "luis@test.com",
        rut: "11.111.111-1",
        contraseña: ""
      })
    );

    render(<Perfil />);

    await waitFor(() => {
      expect(screen.getByText("Mi Perfil")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Eliminar cuenta"));

    expect(
      screen.getByText("Confirmar eliminación")
    ).toBeTruthy();

    expect(
      screen.getByText(/¿Estás seguro/)
    ).toBeTruthy();
  });
});