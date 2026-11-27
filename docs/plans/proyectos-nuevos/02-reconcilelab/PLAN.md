# Plan de ReconcileLab

Repositorio propuesto: `Dabp7/reconcilelab`. Estado: plan para implementar.

## Problema y usuarios

Un proveedor puede aceptar una operación y perder la respuesta. Un reintento ciego duplica el efecto; tratar el timeout como rechazo también deja datos inconsistentes.

Equipos que integran APIs y necesitan resolver respuestas inciertas. La demo simula movimientos de negocio sin dinero real.

## Resultado buscado

Demostrar una máquina de estados, idempotencia y conciliación con un proveedor simulado cuyo comportamiento se controla.

## Tecnologías y responsabilidad

| Tecnología | Función | Decisión |
| --- | --- | --- |
| C# y .NET 10 LTS | API y worker de conciliación | Separar reglas del dominio y transporte; usar CancellationToken sin confundir cancelación con rechazo del proveedor. |
| ASP.NET Core y OpenAPI | API documentada | Contratos, errores Problem Details y escenarios reproducibles. |
| PostgreSQL y EF Core | Operaciones, intentos y outbox | Transacciones, constraints únicas y concurrencia optimista; migraciones versionadas. |
| HttpClient y políticas acotadas | Comunicación con proveedor | Timeouts y backoff para consultas; nunca reintentar escrituras automáticamente sin idempotencia del proveedor. |
| Proveedor simulado independiente | Control de fallos | Aceptar y cortar respuesta, retrasar, rechazar y devolver resultados duplicados. |
| React y TypeScript | Panel explicativo | Timeline de intentos y botones de escenarios; mostrar uncertainty de forma clara. |
| xUnit y Testcontainers | Pruebas con PostgreSQL real | Carreras, reinicios y transición de estados; fixture de proveedor determinista. |
| Docker Compose y GitHub Actions | Demo y CI | Los mismos escenarios deben funcionar localmente y en CI. |

## Alcance de la primera versión

- Crear operaciones ficticias con referencia, moneda e importe.
- Consultar estado y timeline sin modificarlo desde el navegador.
- Simular respuesta perdida después de aceptación, rechazo permanente y error transitorio.
- Conciliar consultando el proveedor y reintentar solo con resultado concluyente y política definida.
- Procesar outbox tras reinicio y manejar dos workers.
- Exportar un registro de la simulación con ids ficticios.

## Fuera de alcance

- No hacer cobros reales, emitir documentos fiscales ni integrar certificados de la empresa.
- No prometer exactamente una ejecución de red: se busca un único efecto lógico cuando el proveedor admite idempotencia. Si no la admite, el caso incierto puede requerir revisión humana.

## Arquitectura

```text
React → ASP.NET Core → PostgreSQL
                        operations + outbox
                              ↓
                      reconciliation worker
                              ↓
                     provider simulator
                    lookup / submit / scenarios
```

## Estructura del repositorio

```text
src/ReconcileLab.Domain/         estados, importes e invariantes
src/ReconcileLab.Application/    casos de uso y puertos
src/ReconcileLab.Infrastructure/ PostgreSQL, HTTP y outbox
src/ReconcileLab.Api/            endpoints y OpenAPI
src/ReconcileLab.Worker/         conciliación
src/ProviderSimulator/           proveedor determinista
apps/web/                       panel React
tests/Unit/                     dominio
tests/Integration/              PostgreSQL y proveedor
docs/scenarios/                 guiones reproducibles
```

## Modelo de datos

| Entidad | Campos principales | Invariante |
| --- | --- | --- |
| operations | id, actor_id, client_key, request_hash, amount_minor, currency, state, version | UNIQUE(actor_id,client_key); hash del payload inmutable. |
| attempts | id, operation_id, correlation_id, started_at, result_code | Ningún intento borra el historial del anterior. |
| outbox | id, operation_id, kind, available_at, processed_at | Se crea en la misma transacción que la operación; entrega al menos una vez. |
| provider_operations | provider_key, reference, effect_count, state | Almacén del simulador separado del sistema conciliador. |
| audit_events | operation_id, previous_state, next_state, evidence, at | Transiciones válidas y evidencia de la consulta al proveedor. |

## Contratos de integración

| Operación | Entrada | Resultado esperado |
| --- | --- | --- |
| POST /api/operations | Idempotency-Key, amountMinor, currency, reference | 202 con operationId; misma clave reutiliza resultado; payload diferente 409. |
| GET /api/operations/:id | identidad de demo | Estado y timeline; no incluir secretos ni payloads completos. |
| POST /api/operations/:id/reconcile | operación uncertain o pendiente | 202 para reconciliar; no enviar otra escritura inmediatamente. |
| POST /simulator/scenarios | nombre de escenario de demo | Escenario seleccionado para la próxima operación, aislado por sesión. |
| POST /provider/submit | providerKey estable y payload | Un efecto para una clave idempotente; un timeout puede ocurrir después de aceptar. |
| GET /provider/operations/:key | clave conocida | accepted, rejected, not_found definitivo o unknown según el escenario. |

Los errores HTTP usan `code`, `message` y `correlationId`; no devuelven stacks ni conexión de base de datos. La cuenta de demo queda explícitamente delimitada y no se presenta como autenticación productiva.

## Reglas que no deben romperse

- Estados internos: created, submitting, uncertain, accepted, rejected y manual_review. Un timeout de envío lleva a uncertain, nunca directamente a rejected.
- Una clave idempotente se conserva para la misma operación en todos los intentos; no generar una clave nueva para resolver un timeout.
- Un lookup unknown o inconsistente mantiene incertidumbre. Solo tratar not_found como concluyente si el contrato del proveedor garantiza esa semántica; simular consistencia eventual.
- Sin idempotencia del proveedor, una respuesta ambigua no habilita reenvío automático. Escalar a manual_review con evidencia.
- Usar importes enteros en unidades mínimas con moneda explícita; para cálculos intermedios usar decimal y una regla de redondeo documentada. No usar double.
- Una transición terminal no retrocede por un evento viejo. Comprobar versión y deduplicar eventos del proveedor.

## Fases y backlog para convertir en issues

### Fase 1 Dominio

- [ ] Definir estados, tabla de transiciones e importes.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Tests rechazan transiciones inválidas y timeout no produce rechazo.

### Fase 2 Proveedor

- [ ] Crear simulador con almacenamiento propio y escenarios.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Aceptar antes de cortar la respuesta produce effect_count=1.

### Fase 3 API y outbox

- [ ] Crear operación e intención de envío en una transacción.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Repetir POST devuelve un id; reiniciar no pierde la intención.

### Fase 4 Conciliación

- [ ] Consultar antes de reenviar; idempotencia estable y revisión manual.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Se resuelven timeout y duplicados sin un segundo efecto.

### Fase 5 Concurrencia y UI

- [ ] Dos workers, versiones y timeline visible.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Ninguna carrera viola la transición terminal ni duplica el efecto.

### Fase 6 Entrega

- [ ] Compose, tests de integración, CI y guion.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Se reproduce cada escenario con comandos desde un clon limpio.

## Pruebas de aceptación

| Escenario | Cómo provocarlo | Resultado exigido |
| --- | --- | --- |
| Respuesta perdida | Proveedor acepta y corta conexión | uncertain y luego accepted; effect_count=1. |
| Consulta atrasada | lookup temporalmente unknown o no concluyente | Sin reenvío ciego; conserva uncertainty. |
| Dos workers | Reclamo concurrente de la misma operación | Un efecto lógico y transición consistente. |
| Proveedor no idempotente | Timeout tras aceptar | manual_review sin reenvío automático. |
| Rechazo permanente | Proveedor responde invalid_request | rejected sin reintentos inútiles. |
| Callback duplicado | Mismo evento dos veces | Una transición y auditoría sin duplicación lógica. |
| Caída de proceso | Matar tras persistir outbox | Otro proceso recupera la operación. |
| Dinero | Descuento y redondeo en valores límite | Resultado exacto según política y moneda. |

## Guion de la demo

Mostrar el diagrama de estados. Crear una operación con escenario accept_then_timeout. Ver uncertain en el panel y accepted después de conciliar. Mostrar effect_count=1 en el simulador. Ejecutar el mismo caso sin idempotencia del proveedor y explicar por qué termina en revisión manual.

## Configuración

ConnectionStrings__Database, Provider__BaseUrl, Worker__LeaseSeconds, Worker__MaxAttempts, Demo__ActorId. No requiere llaves de pagos.

## Comandos que debe ofrecer el proyecto

Estos nombres son el contrato a implementar en el scaffold. No describen scripts ya creados.

```text
docker compose up --build
dotnet test
dotnet format --verify-no-changes
npm --prefix apps/web ci
npm --prefix apps/web run build
dotnet test --filter Category=Integration
./scripts/demo.ps1 -Scenario accept_then_timeout
```

## Riesgos y decisiones

La demo debe distinguir intención, intento HTTP y efecto del proveedor. Un algoritmo local no puede garantizar unicidad si el proveedor externo no ofrece contrato idempotente ni consulta concluyente. No ocultar esa limitación en el README.

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
