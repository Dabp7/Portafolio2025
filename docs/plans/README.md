# Plan de proyectos y portafolio de Diego Bercian

Esta carpeta organiza el trabajo para mostrar experiencia Full Stack con foco en backend, AWS y desarrollo asistido por IA. Contiene tres proyectos nuevos, un plan del portafolio, nueve planes de mejora de repositorios públicos y ocho guías de práctica por tecnología.

## Orden recomendado

1. Revisar el rediseño del portafolio y corregir la configuración publicada de los repositorios existentes.
2. Preparar SuperKinal como demo académica reproducible y mejorar Ventas Online con pruebas de reglas de negocio.
3. Construir DocumentFlow de punta a punta en local; publicar un primer resultado antes de agregar AWS.
4. Construir ReconcileLab para mostrar decisiones de consistencia e integración.
5. Construir POS Sandbox si querés destacar también la experiencia móvil.

No iniciar los tres proyectos grandes al mismo tiempo. Cada fase se cierra con un comportamiento demostrable y un PR pequeño; las estimaciones se ajustan después del primer corte vertical.

## Planes principales

- [DocumentFlow](proyectos-nuevos/01-documentflow/PLAN.md): exportaciones documentales, streaming y workers.
- [ReconcileLab](proyectos-nuevos/02-reconcilelab/PLAN.md): idempotencia y operaciones con resultado incierto.
- [POS Sandbox](proyectos-nuevos/03-pos-sandbox/PLAN.md): venta offline, persistencia y dispositivos simulados.
- [Portafolio](PORTAFOLIO_PLAN.md): perfil, casos públicos, experiencia, IA y contacto.

## Cómo trabajar cada fase

Convertir su resultado en una issue. Escribir una SPEC con objetivo, alcance, casos de error y criterios de aceptación. Implementar un corte pequeño, probarlo y adjuntar evidencia. Si la fase no se puede demostrar desde un clon limpio, corregir la instalación y la guía antes de ampliar el producto.

Los tres planes nuevos y las mejoras de los nueve repositorios existentes están implementados. La evidencia, pruebas y enlaces están en la entrega consolidada del portafolio.

## Identidad y publicación

Cuenta personal: `Dabp7`. Cuenta laboral: `diegodigifact`. Verificar la identidad y el remoto antes de publicar. Reutilizar conocimientos y patrones; los datos de demo, documentación y código deben ser propios. Elegir licencia, nombre y alcance del repositorio antes de hacerlo público.

## Referencias de versiones y herramientas

- [Versiones soportadas de Node.js](https://nodejs.org/en/about/previous-releases).
- [Soporte de .NET](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core).
- [Docker Compose](https://docs.docker.com/compose/).
- [GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart).
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/).

Fecha de preparación: 23 de noviembre de 2026. Antes de crear un scaffold, revisar compatibilidad y soporte y fijar versiones en sus archivos de configuración.

## Entrega implementada · 27 de noviembre de 2026

Se completaron los tres proyectos nuevos y las mejoras aprobadas para los nueve repositorios existentes. Las doce entregas tienen README, evidencia reproducible, pruebas y GitHub Actions. AWS se dejó para una etapa posterior, sin abrir cuenta ni crear recursos. El resumen, enlaces y limitaciones están en el portafolio actualizado: https://github.com/Dabp7/Portafolio2025/blob/main/docs/ENTREGA.md

| Proyecto | Resultado |
|---|---|
| Portafolio2025 | Cinco casos públicos, enlaces reales, capturas y Playwright escritorio/móvil; PR #2 integrado en main. |
| IN5BM_SuperKinal | Demo sintética, 24 pruebas, migración/JAR, capturas JavaFX y video; integrado en master. |
| ventasOnline_LabFinal | Compras concurrentes y permisos, 10 pruebas MongoDB, seed y arranque reales; integrado en master. |
| DocumentFlow | Exportación durable y ZIP/PDF, recuperación e idempotencia; 16 pruebas y Compose. |
| ReconcileLab | Conciliación con proveedor simulado, outbox y workers; verificación .NET/PostgreSQL. |
| POS Sandbox | SQLite offline, sincronización idempotente y pagos/periféricos simulados; prueba Android API36. |
| Back_BlogAprendizaje | Contrato de comentarios, seed y 10 pruebas MongoDB; integrado en master. |
| Front_BlogAprendizaje | Lectura y comentarios, cinco recorridos Playwright; integrado en master. |
| Gestion_Coperex | Permisos, exportación filtrada y cinco pruebas MongoDB; integrado en master. |
| Gestion_Estudiantes_2020527 | Propiedad, concurrencia y nueve pruebas MongoDB; integrado en master. |
| Gestion_Opiniones_2025 | Autoría, categorías, comentarios y ocho pruebas MongoDB; integrado en master. |
| Laboratorio_2 | Reservas concurrentes, roles y nueve pruebas MongoDB; integrado en master. |

Las demos usan datos sintéticos. POS simula pagos e impresora y no se publicó en tienda. Firebase no se desplegó desde esta tarea.
