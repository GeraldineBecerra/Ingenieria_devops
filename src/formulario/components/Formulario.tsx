import { Form, Row, Col, Button, Container, Alert, Modal } from "react-bootstrap";
import "./Formulario.css";
import { useState, type FormEvent, useEffect, useMemo } from "react";
import { useCart } from "../../cartas/context/CartContext";
import { useNavigate } from "react-router-dom";


export const Formulario = () => {
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Campos del formulario
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rut, setRut] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [otraComuna, setOtraComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [numero, setNumero] = useState("");

  const navigate = useNavigate();
  

    const [modalMsg, setModalMsg] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);

  const regiones = ["Metropolitana", "Valparaíso", "Biobío"];
  const comunasPorRegion = useMemo<Record<string, string[]>>(() => ({
    Metropolitana: ["Santiago", "Puente Alto", "Maipú"],
    Valparaíso: ["Valparaíso", "Viña del Mar", "Quilpué"],
    Biobío: ["Concepción", "Talcahuano", "Hualpén"],
  }), []);
  const comunasFiltradas = region ? comunasPorRegion[region] : [];

  const { cart, totalAmount } = useCart();

  const handleCloseModal = () => setShowModal(false);
  // --- Cargar datos desde localStorage al iniciar ---
  useEffect(() => {
    
    const c = localStorage.getItem("userEmail");
    const n = localStorage.getItem("userNombre");
    const a = localStorage.getItem("userApellido");
    const r = localStorage.getItem("userRut");

    
    if (c) setCorreo(c);
    if (n) setNombre(n);
    if (a) setApellidos(a);
    if (r) setRut(r);

    // Autocompletar dirección si existe
    const fetchDireccion = async () => {
      const clienteID = localStorage.getItem("clienteID");
      if (!clienteID) return;

      try {
        const response = await fetch(`http://localhost:8080/direccion/usuario/${clienteID}`);
        if (response.ok) {
          const data = await response.json();
          setDireccion(data.calle || "");
          setNumero(data.numero || "");
          setRegion(data.region || "");
          if (data.comuna) {
            if (comunasPorRegion[data.region]?.includes(data.comuna)) {
              setComuna(data.comuna);
            } else {
              setComuna("otra");
              setOtraComuna(data.comuna);
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar dirección:", error);
      }
    };

    fetchDireccion();
  }, [comunasPorRegion]);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setShowSuccess(true);


    setTimeout(() => {
      navigate("/pago");
    }, 1200);
  };

  // --- Guardar dirección en la base de datos ---
  const guardarDireccion = async () => {
    try {
      const idUsuario = localStorage.getItem("clienteID");
      if (!idUsuario) throw new Error("Usuario no encontrado");

      const direccionPayload = {
        calle: direccion,
        numero,
        region,
        comuna: comuna === "otra" ? otraComuna : comuna,
      };

      const response = await fetch(
        `http://localhost:8080/direccion/usuario/${idUsuario}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(direccionPayload),
        }
      );

      if (!response.ok) throw new Error("Error al guardar la dirección");

      const data = await response.json();

      setModalTitle("Dirección guardada");
      setModalMsg("✔ La dirección se ha guardado correctamente.");
      setShowModal(true);
      console.log(data);
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof Error) {
        setModalTitle("Error");
        setModalMsg(error.message);
      } else {
        setModalTitle("Error");
        setModalMsg("Ocurrió un error al guardar la dirección.");
      }

      setShowModal(true);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={8}>
          <div className="p-3 border rounded bg-light">
            <h5 className="mb-3">Completa tus datos para procesar tu compra</h5>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

              
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico *</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un correo válido.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="alert alert-info py-2">
                Usaremos estos datos para verificar tu identidad y enviarte información de tu compra.
              </div>

           
              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  required
                  placeholder="Nombre..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>

             
              <Form.Group className="mb-3">
                <Form.Label>Apellidos *</Form.Label>
                <Form.Control
                  required
                  placeholder="Apellidos..."
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>

             
              <Form.Group className="mb-3">
                <Form.Label>RUT *</Form.Label>
                <Form.Control
                  required
                  placeholder="11.222.333-4"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu RUT.
                </Form.Control.Feedback>
              </Form.Group>

           
              <Form.Group className="mb-3">
                <Form.Label>Región</Form.Label>
                <Form.Select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setComuna("");
                  }}
                >
                  <option value="">Seleccione región</option>
                  {regiones.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </Form.Select>
              </Form.Group>

             
              {region && (
                <Form.Group className="mb-3">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Select
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                  >
                    <option value="">Seleccione comuna</option>
                    {comunasFiltradas.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="otra">Otra comuna</option>
                  </Form.Select>
                </Form.Group>
              )}

             
              {comuna === "otra" && (
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese su comuna</Form.Label>
                  <Form.Control
                    type="text"
                    value={otraComuna}
                    onChange={(e) => setOtraComuna(e.target.value)}
                  />
                </Form.Group>
              )}

              
              <Form.Group className="mb-3">
                <Form.Label>Dirección *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Calle / Avenida..."
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu dirección.
                </Form.Control.Feedback>
              </Form.Group>

             
              <Form.Group className="mb-3">
                <Form.Label>Número *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Número..."
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu número.
                </Form.Control.Feedback>
              </Form.Group>

             
              <Button variant="secondary" className="mb-3" onClick={guardarDireccion}>
                Guardar Dirección
              </Button>

             
              <Form.Check
                required
                className="mb-3"
                label={
                  <>
                    Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a>.
                  </>
                }
                feedback="Debes aceptar antes de continuar."
                feedbackType="invalid"
              />

              <Button className="w-100" type="submit" variant="primary">
                Continuar con el pago
              </Button>
            </Form>

            {showSuccess && (
              <Alert variant="success" className="mt-3 text-center">
                ✔ Datos ingresados correctamente. Redirigiendo…
              </Alert>
            )}
          </div>
        </Col>

        
        <Col md={4}>
          <div className="p-3 border rounded bg-white shadow-sm">
            <h5 className="mb-3">Resumen de Compra</h5>
            {cart.length === 0 ? (
              <p className="text-muted">No hay productos en el carrito.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.carta.id} className="d-flex align-items-center mb-3">
                    <img src={item.carta.img} width="55" height="55" className="me-3 rounded"/>
                    <div className="flex-grow-1">
                      <p className="m-0 fw-semibold">{item.carta.nombre}</p>
                      <small className="text-muted">{item.cantidad} × ${item.carta.precio}</small>
                    </div>
                    <strong>${item.carta.precio * item.cantidad}</strong>
                  </div>
                ))}
                <hr />
                <p className="d-flex justify-content-between">
                  <span className="fw-semibold">Total:</span>
                  <strong>${totalAmount}</strong>
                </p>
              </>
            )}
          </div>
        </Col>
      </Row>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
