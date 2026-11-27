# Plan del portafolio de Diego Bercian

El portafolio debe permitir que una persona entienda tu perfil, examine trabajo público y encuentre cómo contactarte. La dirección elegida es Full Stack con foco en backend, AWS y desarrollo asistido por IA.

## Problema que resuelve

El sitio anterior presenta principalmente la etapa académica de 2025 y separa información breve en varias páginas. La nueva versión conecta experiencia actual, proyectos, decisiones y evidencia, con una navegación continua y clara.

## Tecnología y decisiones

| Tecnología | Responsabilidad |
| --- | --- |
| React y Vite | Reutilizar el proyecto existente y producir un sitio estático. |
| JavaScript y módulos de contenido | Preservar el lenguaje del repositorio; el contenido vive en `src/data/portfolio.js`. TypeScript es una futura migración deliberada, no una afirmación sobre este código. |
| CSS responsive | Sistema visual propio con tipografía, contraste, foco y reducción de movimiento. |
| Lucide React | Iconos consistentes y ligeros. |
| HTML dialog | Casos de estudio con navegación por teclado, cierre y restitución de foco del navegador. |
| Firebase Hosting | Conservar la configuración existente y alinear el directorio con `dist`. |
| Sites | Copia privada del rediseño para revisión; separada del despliegue actual de Firebase y de la cuenta GitHub personal. |

## Estructura y contenido

1. Presentación clara y un flujo documental conceptual que se puede explorar.
2. Proyectos con filtros: publicados, próximos y todos. SuperKinal y Ventas Online enlazan sus repositorios reales; las tres ideas nuevas permanecen como planificadas.
3. Cada caso explica problema, alcance, tecnología y cómo se comprueba.
4. Experiencia de Digifact descrita de forma general y sin enlaces ni material interno.
5. Capacidades agrupadas por frontend, backend, cloud y calidad; no usar porcentajes de dominio inventados.
6. Prácticas con IA: especificar, implementar, verificar y revisar. No atribuir desarrollo de modelos.
7. Formación actual, contacto por correo y descarga del CV.

## Mejoras implementadas y mantenimiento

- [ ] Revisar el rediseño en móvil y escritorio antes de sustituir la versión pública.
- [ ] Confirmar datos de contacto y el texto de presentación.
- [ ] Reemplazar las ilustraciones conceptuales por capturas reales de proyectos cuando estén preparadas; distinguir ambas en el texto.
- [ ] Actualizar `src/data/portfolio.js` al terminar cada proyecto: `status`, `url`, alcance y pruebas reales.
- [ ] Al publicar DocumentFlow, añadir video y dos decisiones técnicas con enlaces a su README.
- [ ] Preparar versión inglesa con revisión humana cuando esté lista; no usar un selector sin traducción real.
- [ ] Añadir Open Graph con una URL y una imagen definitivas al elegir dominio público.

## Criterios de aceptación

La navegación funciona con teclado y en móvil; no hay scroll horizontal ni texto recortado. Los filtros y modales funcionan y Escape cierra el caso. El CV existe y se descarga. Contacto abre el correo y el botón copiar muestra resultado. Los repositorios planificados no tienen enlaces ficticios. Un build limpio produce `dist` y Firebase publica ese directorio.

## Publicación personal

El sitio actual de Firebase y GitHub no deben sustituirse por una copia no revisada. Trabajar en una rama del repositorio personal, revisar el diff y el build y después publicar con la identidad correcta. La conexión de GitHub de esta sesión es laboral; verificar la cuenta antes de cualquier push. La vista privada de Sites es una instancia separada para revisar el rediseño.

## Entregables

Código editable del rediseño, bundle estático, CV, configuración de hosting, instrucciones de ejecución y cambios resumidos. El plan del portafolio corresponde al código entregado; los planes de DocumentFlow, ReconcileLab y POS Sandbox son trabajo futuro.
