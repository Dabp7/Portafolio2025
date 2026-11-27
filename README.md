# Portafolio de Diego Bercian

Portafolio profesional con proyectos públicos, experiencia Full Stack, backend y AWS, prácticas de desarrollo asistido por IA y contacto. React, Vite, CSS y Lucide React.

## Ejecutar

Usar Node.js 24 LTS y npm. Las versiones resueltas están en package-lock.json.

```sh
npm ci
npm run dev
```

## Compilar y revisar

```sh
npm run build
npm run verify:dist
npm run lint
npx playwright install chromium
npm run test:e2e
npm run preview
```

El build queda en `dist`. Firebase Hosting está configurado para publicar ese directorio y resolver las rutas del sitio. Las rutas anteriores `/habilidades`, `/sobre-mi` y `/educacion` llevan a sus secciones equivalentes.

## Editar contenido

- `src/data/portfolio.js`: proyectos, estados, tecnologías y experiencia.
- `src/Portfolio.jsx`: secciones e interacciones.
- `src/index.css`: diseño responsive y reducción de movimiento.
- `public/Diego-Bercian-CV.pdf`: CV descargable.
- `index.html`: título y metadatos.

Los proyectos `planned` no se presentan como terminados y no llevan enlaces a repositorios inexistentes. Las capturas de SuperKinal y las nuevas demos están en public/projects y usan datos sintéticos. Ventas Online conserva una vista conceptual en CSS. Ninguna imagen muestra sistemas privados de una empresa.

## Recorrido de comprobación

Revisar menú móvil, navegación por teclado, filtros de proyectos, apertura y cierre de casos con Escape, descarga del CV, correo y copia al portapapeles. Comprobar en escritorio y a 390 px de ancho. Las ilustraciones son decorativas y están excluidas del árbol accesible.

## Hosting

Firebase conserva su configuración previa, con `dist` como salida. La copia privada de Sites usa `.openai/hosting.json` y un repositorio de fuente separado. No cambia la audiencia ni publica en Firebase automáticamente.

Antes de publicar en GitHub, comprobar que la identidad y el remoto corresponden a `Dabp7/Portafolio2025`. El despliegue personal se realiza después de revisar el diff y el build.

## Trabajo aprobado

El 26 de noviembre de 2026 se aprobó implementar el portafolio, los tres proyectos nuevos y las mejoras de los repositorios existentes. Los planes originales están en `docs/plans/`. El seguimiento y los límites de cada entrega están en `docs/ROADMAP.md`.

AWS queda aplazado. DocumentFlow debe funcionar con PostgreSQL y almacenamiento filesystem sin credenciales ni servicios cloud. El contenido del portafolio distingue proyectos planificados de resultados implementados.

GitHub Actions ejecuta instalación limpia, lint, build, comprobación de assets/PDF/hosting y pruebas Playwright en escritorio y móvil, incluidos filtros, casos, foco, contacto, copia de correo y descarga de CV.
