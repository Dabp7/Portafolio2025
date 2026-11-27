# Plan de práctica de Docker y despliegue

## Dónde se aplica

DocumentFlow, ReconcileLab y API de POS.

## Qué practicar

Build reproducible, procesos separados, healthchecks, migraciones y configuración por entorno.

## Evidencia para el portafolio

docker compose up desde un entorno limpio; README explica puertos, seed, apagado y volúmenes.

## Decisiones de implementación

Fijar imágenes por versión o digest al publicar. Terraform para infraestructura de la demo; SST es alternativa si el proyecto lo justifica, no un segundo sistema paralelo.

## Criterio para avanzar

Explicar la decisión con un caso de fallo y reproducir la comprobación desde el README. Añadir una tecnología nueva solo si resuelve un problema pendiente del proyecto.

## Referencia

[Documentación oficial](https://docs.docker.com/compose/).
