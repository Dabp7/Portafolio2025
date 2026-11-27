# Plan de práctica de .NET y PostgreSQL

## Dónde se aplica

ReconcileLab y datos de DocumentFlow.

## Qué practicar

Máquinas de estados, transacciones, restricciones únicas, concurrencia y consultas paginadas.

## Evidencia para el portafolio

Carrera reproducible entre dos workers con PostgreSQL real; explicar por qué la restricción y la transacción son necesarias.

## Decisiones de implementación

.NET 10 LTS es la base propuesta; fijar SDK en global.json y parches soportados. EF Core en ReconcileLab; pg en Node.

## Criterio para avanzar

Explicar la decisión con un caso de fallo y reproducir la comprobación desde el README. Añadir una tecnología nueva solo si resuelve un problema pendiente del proyecto.

## Referencia

[Documentación oficial](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core).
