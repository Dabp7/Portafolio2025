# Plantilla de tarea para un proyecto

## Resultado esperado

Describir el comportamiento que la persona usuaria podrá completar después del cambio.

## Contexto

Proyecto, fase, archivos relevantes y contrato que ya existe.

## Alcance

Incluye cambios necesarios para este resultado. Fuera de alcance: decisiones o funcionalidades que deben permanecer para otra tarea.

## Criterios de aceptación

- [ ] Caso normal observable.
- [ ] Entrada inválida o permiso insuficiente.
- [ ] Reintento, concurrencia o recuperación si aplica.
- [ ] Instrucción reproducible para comprobarlo.

## Prueba que guía el cambio

Describir fixture, acción y resultado esperado. Si corrige un bug, demostrar que falla antes del cambio.

## Evidencia del PR

Commit, comandos realmente ejecutados, resultado y limitaciones pendientes. No marcar pruebas como aprobadas a partir de una recomendación del agente.

## Solicitud a un asistente

Lee el README, las instrucciones del repositorio y el plan de esta fase. Implementa únicamente el resultado y los criterios de esta tarea. Si falta un contrato, propón la decisión antes de ampliar el alcance. No añadas secretos ni dependencias sin necesidad. Verifica con los comandos reales del proyecto y entrega diff, evidencia y pendientes.
