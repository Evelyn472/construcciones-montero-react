# Construcciones Montero — Proyecto académico en React

Implementación parcial de un sitio web para una empresa de construcción y mantención. Este trabajo fue desarrollado como proyecto académico; el alcance corresponde a una parte del sitio solicitado en la asignatura y no a una plataforma completa en producción.

## Tecnologías

- React 19
- JavaScript (ES6+)
- HTML5
- CSS3
- Create React App / React Scripts

## Funcionalidades implementadas

- Vista principal con presentación de la empresa.
- Navegación interna entre la vista de Inicio y la vista de Contacto.
- Video de presentación en la página principal.
- Carrusel de servicios con cambio automático de imágenes cada cuatro segundos y controles manuales.
- Formulario de contacto controlado con `useState`.
- Validaciones de nombre, correo, teléfono y mensaje.
- Mensajes de error y confirmación visual en el formulario.
- Estilos adaptables a pantallas pequeñas mediante media queries.

## Capturas y recursos

Las imágenes, el logotipo y el video utilizados por la aplicación se encuentran en `public/img` y `public/video`.

## Cómo ejecutar el proyecto

Requisitos: Node.js y npm instalados.

```bash
npm install
npm start
```

La aplicación se abrirá en `http://localhost:3000`.

Para generar una compilación de producción:

```bash
npm run build
```

## Alcance y mejoras futuras

Este repositorio documenta el alcance académico implementado. Algunas opciones del menú son elementos visuales y todavía no cuentan con páginas independientes. El formulario realiza validaciones en el navegador y muestra una confirmación visual, pero no está conectado a un backend ni envía correos. Los botones de inicio de sesión y registro son elementos de interfaz sin autenticación implementada.

Posibles mejoras: completar las páginas restantes, conectar el formulario a una API o servicio de correo, implementar autenticación si el proyecto lo requiere y agregar pruebas automatizadas.

## Autoría

Proyecto académico desarrollado por Evelyn Mora como parte de su formación en Analista Programador.
