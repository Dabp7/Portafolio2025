# Plan de práctica de TypeScript y Node.js

## Dónde se aplica

DocumentFlow, API de POS y herramientas de integración.

## Qué practicar

Diseñar contratos, validar entradas, separar dominio de HTTP, manejar streams, errores y cancelación.

## Evidencia para el portafolio

API con requestId, Zod y worker separado; mostrar una prueba de error y otra de idempotencia.

## Decisiones de implementación

Node.js 24 LTS es una base soportada consultada el 23 de noviembre de 2026. Fijar major en .nvmrc y versiones resueltas en lockfile. No usar latest en CI.

## Criterio para avanzar

Explicar la decisión con un caso de fallo y reproducir la comprobación desde el README. Añadir una tecnología nueva solo si resuelve un problema pendiente del proyecto.

## Referencia

[Documentación oficial](https://nodejs.org/en/about/previous-releases).
