import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Registro } from "../src/login/Registro";
import * as ApiAuth from "../src/api/apiAuth";

describe("Registro Component", () => {
  it("debe renderizar el formulario de registro", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    expect(screen.getByText("Crear Cuenta")).toBeTruthy();
    expect(screen.getByText("Nombre")).toBeTruthy();
    expect(screen.getByText("Apellido")).toBeTruthy();
    expect(screen.getByText("RUT")).toBeTruthy();
    expect(screen.getByText("Correo")).toBeTruthy();
    expect(screen.getByText("Contraseña")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
  });

  it("debe mostrar mensaje de éxito al registrar usuario", async () => {
    spyOn(ApiAuth, "registerRequest").and.returnValue(
      Promise.resolve("Registro exitoso")
    );

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "Luis" },
    });

    fireEvent.change(screen.getByPlaceholderText("Tu apellido"), {
      target: { value: "Muñoz" },
    });

    fireEvent.change(screen.getByPlaceholderText("11.111.111-1"), {
      target: { value: "11.111.111-1" },
    });

    fireEvent.change(screen.getByPlaceholderText("correo@gmail.com"), {
      target: { value: "luis@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(screen.getByText("Registro exitoso")).toBeTruthy();
    });
  });

  it("debe mostrar mensaje de error si falla el registro", async () => {
    spyOn(ApiAuth, "registerRequest").and.returnValue(
      Promise.reject({ message: "Correo ya registrado" })
    );

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "Luis" },
    });

    fireEvent.change(screen.getByPlaceholderText("correo@gmail.com"), {
      target: { value: "luis@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(screen.getByText("Correo ya registrado")).toBeTruthy();
    });
  });
});