# Plan de práctica de AWS para procesamiento documental

## Dónde se aplica

Extensión cloud de DocumentFlow.

## Qué practicar

S3 para objetos; ECS Fargate para worker; SQS opcional como transporte de entrega al menos una vez. IAM por componente, logs y expiración de artefactos.

## Evidencia para el portafolio

Diagrama de recursos, plan Terraform, escenario de reintento y destrucción documentada.

## Decisiones de implementación

PostgreSQL conserva la verdad del trabajo. Si se añade cola, escribir una outbox en la misma transacción y publicar desde un proceso recuperable. DynamoDB es una extensión de proyección, no una obligación.

## Criterio para avanzar

Explicar la decisión con un caso de fallo y reproducir la comprobación desde el README. Añadir una tecnología nueva solo si resuelve un problema pendiente del proyecto.

## Referencia

[Documentación oficial](https://docs.aws.amazon.com/).
