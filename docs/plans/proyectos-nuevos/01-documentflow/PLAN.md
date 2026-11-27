# Plan de DocumentFlow

Repositorio propuesto: `Dabp7/documentflow`. Estado: plan para implementar.

## Problema y usuarios

Una exportación grande puede bloquear la aplicación, agotar memoria o dejar una solicitud perdida si el worker se reinicia. El usuario necesita pedir documentos, seguir el progreso y descargar un resultado verificable sin mantener abierta la página.

Personas que solicitan exportaciones y operadores que necesitan ver fallos y recuperar trabajos. La demo usa documentos sintéticos y una cuenta de demostración.

## Resultado buscado

Construir un flujo completo de solicitud, procesamiento en segundo plano y entrega de ZIP. Demostrar idempotencia, streaming, concurrencia acotada y recuperación.

## Tecnologías y responsabilidad

| Tecnología | Función | Decisión |
| --- | --- | --- |
| TypeScript y Node.js 24 LTS | API, worker y contratos compartidos | Un lenguaje en todo el pipeline; validar datos externos en tiempo de ejecución. |
| Express y Zod | HTTP y validación | Rutas pequeñas y esquemas de entrada explícitos; OpenAPI alineado con esos contratos. |
| React y Vite | Panel de solicitudes | Estados de carga, progreso y error; polling con backoff, sin websockets en el MVP. |
| PostgreSQL y pg | Fuente de verdad de solicitudes y trabajos | Transacciones, restricciones únicas, leases y reclamo concurrente con SKIP LOCKED. |
| Streams de Node.js y yazl | ZIP incremental | Mantener contrapresión; no acumular todos los documentos ni el ZIP completo en RAM. |
| Puppeteer con Chromium | PDF de plantillas locales | HTML fijo y contenido ficticio; impedir URLs arbitrarias y scripts aportados por usuarios. |
| Adaptador filesystem y AWS S3 | Objetos de entrada y resultados | Filesystem para demo local; S3 como extensión sin cambiar el dominio. |
| Docker Compose | API, worker y base local | Inicio reproducible y volúmenes de demo. API y worker son procesos separados. |
| Vitest y Playwright | Pruebas de dominio, integración y navegador | Cubrir recuperación real y solicitudes duplicadas; no solo mocks de funciones. |
| Terraform y AWS ECS Fargate | Extensión cloud opcional | Worker en contenedor, S3 y cola SQS si se agrega; publicar costo observado y destrucción de recursos. |

## Alcance de la primera versión

- Crear una solicitud por rango de fechas, tipo de documento y formato ZIP.
- Listar solicitudes con estados queued, processing, completed, failed y cancelled.
- Procesar un dataset sintético por páginas y construir el ZIP por streaming.
- Recuperar trabajos cuyo lease expiró tras matar un worker.
- Cancelar un trabajo y limpiar sus temporales; descargar solo resultados terminados.
- Guardar conteos, tamaños, checksum y duración por ejecución.

## Fuera de alcance

- Facturas fiscales reales, validación normativa, firma digital, edición libre de HTML, Kubernetes, cobros, multiempresa o autenticación empresarial.
- No usar DynamoDB y PostgreSQL como dos fuentes de verdad simultáneas. Una proyección DynamoDB queda para un experimento posterior, con sincronización definida.

## Arquitectura

```text
React → API Express → PostgreSQL
                      ↓
                 worker Node
          lectura paginada → PDF → ZIP stream → storage
                      ↓
              estado y resultado en PostgreSQL
```

## Estructura del repositorio

```text
apps/api/src/          HTTP, validación y control de acceso
apps/worker/src/       reclamo, pipeline, heartbeat y recuperación
apps/web/src/          formulario, lista, detalle y descarga
packages/contracts/   tipos, esquemas y errores
packages/domain/      estados, filtros, política de reintentos
packages/storage/     filesystem y adaptador S3
db/migrations/        esquema y restricciones
scripts/              seed, escenarios y benchmark
tests/integration/    procesos y base reales de demo
infra/terraform/      fase cloud opcional
docs/                 decisiones, arquitectura y evidencia
```

## Modelo de datos

| Entidad | Campos principales | Invariante |
| --- | --- | --- |
| export_requests | id, actor_id, idempotency_key, payload_hash, state, filters_json, snapshot_at, created_at | UNIQUE(actor_id,idempotency_key); misma clave con payload diferente devuelve 409. |
| jobs | request_id, attempt, lease_owner, lease_until, heartbeat_at, next_attempt_at | Reclamo transaccional; heartbeat y token de fencing para impedir que un worker vencido publique. |
| documents | id, owner_id, kind, issued_at, object_key, bytes | Dataset inmutable de demo; orden estable por issued_at e id y filtro de propietario. |
| artifacts | request_id, object_key, checksum, document_count, bytes, completed_at | Un resultado activo por solicitud. Publicar desde una clave temporal solo tras completar el ZIP. |
| job_events | request_id, from_state, to_state, code, at | Historial de transición y errores sin volcar contenido documental. |

## Contratos de integración

| Operación | Entrada | Resultado esperado |
| --- | --- | --- |
| POST /api/exports | Idempotency-Key y filtros validados | 202 con id y state; repetición devuelve el mismo recurso; payload distinto devuelve 409. |
| GET /api/exports | paginación por cursor | 200 con resultados propios y nextCursor. |
| GET /api/exports/:id | identidad de demo | 200 con conteos y estado; 404 para recursos ajenos o inexistentes. |
| POST /api/exports/:id/cancel | solicitud queued o processing | 202 si se solicita cancelación; terminal incompatible devuelve 409. |
| POST /api/exports/:id/retry | solicitud failed recuperable | 202 con nuevo intento y mismo id; no duplicar un intento que sigue activo. |
| GET /api/exports/:id/download | estado completed | Descarga autorizada local o URL firmada breve en S3; 409 si no está lista. |

Los errores HTTP usan `code`, `message` y `correlationId`; no devuelven stacks ni conexión de base de datos. La cuenta de demo queda explícitamente delimitada y no se presenta como autenticación productiva.

## Reglas que no deben romperse

- Interpretar el rango como [desde, hasta) en UTC, mostrando la zona de la selección. No convertir una fecha local en UTC por concatenación de cadenas.
- Usar cursor estable y un snapshot lógico del dataset para que no aparezcan ni desaparezcan documentos durante la exportación.
- Separar idempotencia HTTP, reclamo de jobs y publicación de artefactos; una sola restricción única no resuelve los tres problemas.
- Limitar bytes en vuelo y concurrencia de Chromium, además de número de documentos. Registrar el pico RSS del proceso y de los procesos Chromium cuando se midan.
- Si el worker cae, otro puede reclamar el lease vencido. El worker viejo no puede finalizar después del nuevo; validar el fencing token al cambiar estado.
- Un documento corrupto falla la solicitud completa en el MVP, con código identificable y sin ZIP presentado como completo. Una modalidad parcial deberá tener manifiesto explícito en otra versión.

## Fases y backlog para convertir en issues

### Fase 1 Contrato y demo base

- [ ] Crear workspace, Compose, migración, seed y estados.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: La API lista 100 documentos ficticios; instalación limpia y migración documentadas.

### Fase 2 Corte vertical

- [ ] Solicitar exportación, generar ZIP pequeño con worker y descargar desde React.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Una solicitud de 10 documentos termina y su contenido coincide con el seed.

### Fase 3 Idempotencia y concurrencia

- [ ] Clave de solicitud, reclamo transaccional, lease, heartbeat y fencing.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Diez solicitudes iguales producen un recurso; dos workers no publican dos resultados.

### Fase 4 Streaming y PDF

- [ ] Lectura por cursor, bytes acotados, Chromium, ZIP incremental y limpieza.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Un dataset ampliado no se carga completo en RAM; conteos y checksum coinciden.

### Fase 5 Fallos y experiencia

- [ ] Cancelar, matar worker, reintentar, mostrar errores y estados accesibles.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Recuperación tras reinicio y cancelación no dejan resultados incompletos descargables.

### Fase 6 Publicación

- [ ] CI, video, arquitectura, benchmark y README. Cloud solo después.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Un clon limpio ejecuta demo y pruebas; los resultados tienen entorno y dataset.

## Pruebas de aceptación

| Escenario | Cómo provocarlo | Resultado exigido |
| --- | --- | --- |
| Doble clic y reintento HTTP | Misma clave y mismo payload | Un id de solicitud; mismo resultado al repetir. |
| Colisión de clave | Misma clave con filtros diferentes | 409 y ningún trabajo extra. |
| Concurrencia | Dos workers reclaman a la vez | Un propietario efectivo y un resultado activo. |
| Caída y lease vencido | Matar worker en mitad del ZIP | Recuperación sin publicar ZIP parcial ni dejar el trabajo indefinido. |
| Worker vencido | Pausar worker viejo y permitir reclamo nuevo | El fencing impide que el viejo sobrescriba el resultado. |
| Fechas | Rango de un día y cambios de zona | Límites coherentes; ni omisiones ni duplicados. |
| Documento inválido | Fixture corrupto | Estado failed, código claro y limpieza. |
| Autorización | Consultar/exportar id de otro actor de demo | No filtrar metadatos ni obtener artefactos ajenos. |

## Guion de la demo

Crear 1 000 documentos sintéticos, iniciar exportación, mostrar progreso y descarga. Repetir el POST con la misma clave. Matar el worker y demostrar recuperación. Cerrar con el reporte de memoria, conteo y checksum. Un objetivo mayor de volumen se fija tras medir la primera versión; no prometer cientos de miles antes de probarlo.

## Configuración

DATABASE_URL, STORAGE_DRIVER, STORAGE_ROOT, MAX_INFLIGHT_BYTES, PDF_CONCURRENCY, WORKER_LEASE_SECONDS, DEMO_ACTOR_ID. En fase S3: AWS_REGION, S3_BUCKET; preferir identidad del entorno sobre llaves en archivos.

## Comandos que debe ofrecer el proyecto

Estos nombres son el contrato a implementar en el scaffold. No describen scripts ya creados.

```text
npm ci
docker compose up -d db
npm run db:migrate
npm run seed
npm run dev
npm run verify
npm run test:integration
npm run demo:failure
npm run benchmark
```

## Riesgos y decisiones

Chromium aumenta memoria y superficie de entrada: la plantilla es propia y solo accede a recursos locales permitidos. La recuperación necesita límites de reintentos y clasificación de errores. Antes de AWS, identificar recursos, presupuesto y comandos de destrucción; el MVP funciona sin cuenta cloud.

## Flujo de desarrollo con IA

Una tarea debe empezar con problema, alcance y criterios observables en una SPEC. Pedir primero el contrato y los casos de error; después implementar un cambio pequeño en una rama. Un bug empieza con una prueba que lo reproduce. El agente revisor contrasta el diff, las pruebas y la SPEC; la persona responsable decide qué se integra.

Guardar en `docs/evidence/` el comando ejecutado, resultado, fecha y commit. Distinguir pruebas ejecutadas de comprobaciones pendientes. Limitar cada tarea a un resultado revisable; detener los reintentos si falta un dato o permiso. Añadir `CLAUDE.md` con comandos reales y restricciones del repositorio. Los asistentes pueden proponer código; los resultados deben poder reproducirse sin una suscripción a IA.

## Publicación en GitHub personal

- Crear el repositorio bajo `Dabp7` cuando el primer corte vertical funcione. Usar nombres, datos y código propios.
- README con problema, captura o video, arquitectura, instalación, demo, pruebas, decisiones y límites.
- `.env.example` con nombres y valores ficticios; excluir `.env`, archivos de base local, tokens, artefactos y datos personales.
- CI para build, análisis estático y pruebas. Publicar las mediciones junto al dataset, hardware, versiones y comandos.
- Preparar `docs/architecture.md`, `docs/decisions/`, `docs/demo.md`, licencia elegida conscientemente y ejemplos de solicitudes.
- Abrir PR pequeños. La demo y los enlaces deben funcionar desde una sesión nueva antes de marcar `v1.0.0`.
- Incorporar el proyecto al portafolio como publicado solo cuando exista el repositorio y una demostración verificable.

## Entrega final

Otra persona puede clonar el repositorio, configurar el ejemplo, iniciar la demo y ejecutar las pruebas con las instrucciones del README. Los errores explican qué pasó y qué hacer. La ejecución no depende de un servicio de la empresa ni de recursos privados.
