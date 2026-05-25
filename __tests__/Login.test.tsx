import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../src/login/Login";
import * as ApiAuth from "../src/api/apiAuth";

describe("Login Component", () => {
  it("debe renderizar el formulario de inicio de sesión", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    expect(screen.getByText("Correo")).toBeTruthy();
    expect(screen.getByText("Contraseña")).toBeTruthy();
    expect(screen.getByText("Entrar")).toBeTruthy();
  });

  it("debe mostrar mensaje de error si el inicio de sesión falla", async () => {
    spyOn(ApiAuth, "loginRequest").and.returnValue(
      Promise.reject(new Error("Credenciales inválidas"))
    );

    const { container } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("correo@gmail.com"), {
      target: { value: "error@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });

    const form = container.querySelector("form") as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Credenciales inválidas")).toBeTruthy();
    });
  });
});