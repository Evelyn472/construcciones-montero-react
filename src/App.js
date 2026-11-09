
import { useEffect, useState } from 'react';
import './App.css';

const imagenes = [
  { src: '/img/Construccion.png', nombre: 'Construcción y ampliaciones' },
  { src: '/img/Tabiqueria.png', nombre: 'Tabiquería' },
  { src: '/img/Ceramica.png', nombre: 'Instalación de cerámicas' },
  { src: '/img/Mantenciones.png', nombre: 'Mantenciones' }
];

function App() {
  const [pagina, setPagina] = useState('inicio');
  const [imagenActual, setImagenActual] = useState(0);
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (pagina !== 'inicio') return;

    const intervalo = setInterval(() => {
      setImagenActual(actual => (actual + 1) % imagenes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [pagina]);

  function irA(destino) {
    setPagina(destino);
    window.scrollTo(0, 0);
  }

  function validar(campo, valor) {
    const nuevoError = { ...errores };

    if (campo === 'nombre') {
      if (!valor.trim()) {
        nuevoError.nombre = 'Debes ingresar tu nombre';
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        nuevoError.nombre = 'El nombre solo debe contener letras';
      } else {
        delete nuevoError.nombre;
      }
    }

    if (campo === 'correo') {
      if (!valor.trim()) {
        nuevoError.correo = 'Debes ingresar tu correo';
      } else if (!/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(valor)) {
        nuevoError.correo = 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com';
      } else {
        delete nuevoError.correo;
      }
    }

    if (campo === 'telefono') {
      if (!valor.trim()) {
        nuevoError.telefono = 'Debes ingresar tu teléfono';
      } else if (!/^(9\s?\d{4}\s?\d{4}|\+569\s?\d{4}\s?\d{4})$/.test(valor)) {
        nuevoError.telefono = 'Ingresa un teléfono válido';
      } else {
        delete nuevoError.telefono;
      }
    }

    if (campo === 'mensaje') {
      if (!valor.trim()) {
        nuevoError.mensaje = 'Debes ingresar un mensaje';
      } else {
        delete nuevoError.mensaje;
      }
    }

    setErrores(nuevoError);
  }

  function cambiarCampo(event) {
    const { name, value } = event.target;

    setDatos(actual => ({ ...actual, [name]: value }));
    setEnviado(false);
    validar(name, value);
  }

  function enviarFormulario(event) {
    event.preventDefault();

    const campos = Object.keys(datos);
    const nuevosErrores = {};

    campos.forEach(campo => {
      const valor = datos[campo].trim();

      if (!valor) {
        nuevosErrores[campo] =
          campo === 'nombre' ? 'Debes ingresar tu nombre' :
          campo === 'correo' ? 'Debes ingresar tu correo' :
          campo === 'telefono' ? 'Debes ingresar tu teléfono' :
          'Debes ingresar un mensaje';
      } else if (
        campo === 'nombre' &&
        !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)
      ) {
        nuevosErrores.nombre = 'El nombre solo debe contener letras';
      } else if (
        campo === 'correo' &&
        !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(valor)
      ) {
        nuevosErrores.correo = 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com';
      } else if (
        campo === 'telefono' &&
        !/^(9\s?\d{4}\s?\d{4}|\+569\s?\d{4}\s?\d{4})$/.test(valor)
      ) {
        nuevosErrores.telefono = 'Ingresa un teléfono válido';
      }
    });

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true);
    }
  }

  return (
    <div className="App">
      <header className={pagina === 'contacto' ? 'header-pagina' : ''}>
        {pagina === 'inicio' && (
          <div className="botones-usuario">
            <button type="button">Iniciar sesión</button>
            <button type="button">Registrarse</button>
          </div>
        )}

        <h1>Construcciones Montero</h1>
        <img id="logo" src="/img/LOGO.png" alt="Logo de Construcciones Montero" />
      </header>

      <nav className="menu-principal">
        <button onClick={() => irA('inicio')}>Inicio</button>
        <button onClick={() => irA('inicio')}>Nosotros</button>
        <button onClick={() => irA('inicio')}>Servicios</button>
        <button onClick={() => irA('inicio')}>Blog</button>
        <button onClick={() => irA('contacto')}>Contacto</button>
        <button onClick={() => irA('contacto')}>Mi Cotización</button>
      </nav>

      {pagina === 'inicio' ? (
        <main>
          <h2>Conoce nuestro trabajo</h2>

          <div className="video-contenedor">
            <video className="video-construccion" autoPlay muted loop controls>
              <source src="/video/construccion.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </div>

          <section>
            <h2>Construcción y mantención para tu hogar</h2>

            <p>
              Cada espacio tiene el potencial de convertirse en algo mejor.
              En Construcciones Montero hacemos realidad tus proyectos,
              cuidando cada detalle desde el inicio hasta el resultado final.
            </p>

            <h3>Compromiso en cada proyecto</h3>

            <p>
              Trabajamos con responsabilidad y atención a los detalles,
              buscando entregar soluciones funcionales y de calidad.
            </p>
          </section>

          <section>
            <h2>Nuestros servicios</h2>

            <div className="carrusel">
              <div className="contenedor-imagen">
                <img
                  src={imagenes[imagenActual].src}
                  alt={imagenes[imagenActual].nombre}
                />
              </div>

              <h3>{imagenes[imagenActual].nombre}</h3>

              <div className="controles-carrusel">
                {imagenes.map((imagen, indice) => (
                  <button
                    key={imagen.src}
                    className={indice === imagenActual ? 'punto activo' : 'punto'}
                    onClick={() => setImagenActual(indice)}
                    aria-label={`Mostrar ${imagen.nombre}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <section className="seccion-contacto">
            <h2>Contáctanos</h2>

            <p>
              ¿Tienes un proyecto en mente o necesitas realizar una reparación
              en tu hogar? Estamos disponibles para conocer tu idea y ayudarte.
            </p>

            <h3>Solicita información</h3>

            <p>
              Puedes comunicarte con nosotros para consultar por nuestros
              servicios, cotizar un trabajo o resolver tus dudas.
            </p>

            <p><strong>Teléfono:</strong> +56 9 72549922</p>
            <p><strong>Correo:</strong> construccionesmontero@gmail.com</p>
            <p>
              <strong>Horario de atención:</strong> Lunes a viernes,
              de 09:00 a 18:00 hrs.
            </p>

            <h3>Formulario de contacto</h3>

            <form className="formulario-contacto" onSubmit={enviarFormulario} noValidate>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                maxLength="100"
                autoComplete="name"
                value={datos.nombre}
                onChange={cambiarCampo}
              />
              <p className="error">{errores.nombre || ''}</p>

              <label htmlFor="correo">Correo:</label>
              <input
                type="text"
                id="correo"
                name="correo"
                maxLength="100"
                autoComplete="email"
                value={datos.correo}
                onChange={cambiarCampo}
              />
              <p className="error">{errores.correo || ''}</p>

              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                autoComplete="tel"
                value={datos.telefono}
                onChange={cambiarCampo}
              />
              <p className="error">{errores.telefono || ''}</p>

              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                maxLength="500"
                value={datos.mensaje}
                onChange={cambiarCampo}
              />
              <p className="error">{errores.mensaje || ''}</p>

              <button type="submit">Enviar</button>

              {enviado && (
                <p className="mensaje-enviado" role="status">
                  Mensaje enviado correctamente
                </p>
              )}
            </form>
          </section>
        </main>
      )}

      <footer>
        <span>Construcciones Montero</span>
        <span>Construcción y mantención en general</span>
        <span>© 2026 Construcciones Montero</span>
      </footer>
    </div>
  );
}

export default App;
