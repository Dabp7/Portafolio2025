# Plan de práctica de Pruebas y CI

## Dónde se aplica

Todos los proyectos.

## Qué practicar

Dominio con pruebas rápidas; integración con almacenamiento real de demo; E2E para recorridos esenciales.

## Evidencia para el portafolio

Una prueba que falla antes del fix y pasa después; CI que corre desde un clon limpio.

## Decisiones de implementación

Vitest para TypeScript, xUnit para .NET, Jest y Testing Library para móvil, Playwright para web. Seleccionar lo necesario por proyecto.

## Criterio para avanzar

Explicar la decisión con un caso de fallo y reproducir la comprobación desde el README. Añadir una tecnología nueva solo si resuelve un problema pendiente del proyecto.

## Referencia

[Documentación oficial](https://docs.github.com/en/actions/get-started/quickstart).
