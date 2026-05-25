import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Pago from "../src/compras/Pago";

describe("Pago Component", () => {
  it("debe requerir el contexto de Stripe Elements para renderizarse", () => {
    expect(() =>
      render(
        <MemoryRouter>
          <Pago />
        </MemoryRouter>
      )
    ).toThrowError(/Could not find Elements context/);
  });
});