# Plan de POS Sandbox

Repositorio propuesto: `Dabp7/pos-sandbox`. Estado: plan para implementar.

## Problema y usuarios

Una aplicación de venta debe conservar una operación cuando se pierde internet o se cierra la app. El comportamiento de dispositivos e impresoras no puede depender de comparaciones frágiles ni duplicar descuentos y ventas al reintentar.

Persona que registra una venta en un móvil y desarrolladores que necesitan reproducir fallos de hardware o conexión con simuladores.

## Resultado buscado

Construir una demo Android offline con persistencia, cálculos monetarios y sincronización idempotente. Los dispositivos y pagos son simulados.

## Tecnologías y responsabilidad

| Tecnología | Función | Decisión |
| --- | --- | --- |
| React Native con Expo y TypeScript | App Android | Seleccionar una versión estable del SDK al iniciar y mantener sus dependencias compatibles. |
| Expo SQLite | Ventas y cola local | Persistencia transaccional; una venta confirmada y su outbox se guardan juntas. |
| React Navigation o Expo Router | Navegación | Elegir uno según el starter; carrito, ticket, historial y sincronización. |
| Dominio TypeScript puro | Cálculo y adaptadores | Reglas probables sin componentes nativos; convertir importes a unidades mínimas de forma explícita. |
| API Node.js y PostgreSQL | Servidor de sincronización | Clave estable por venta y payload hash; evita duplicados por reintento. |
| Adaptadores de POS e impresión | Simulación y extensión | PaymentDevice y ReceiptPrinter con implementaciones fake; hardware real fuera del MVP. |
| Jest y React Native Testing Library | Reglas y pantallas | Estados vacíos, cierre de venta, errores y recuperación. |
| Prueba en emulador o dispositivo | Flujo de usuario | Validar persistencia real al matar el proceso; no dar por probada la app solo con tests JS. |

## Alcance de la primera versión

- Catálogo local, carrito y confirmación de venta ficticia.
- Subtotal, descuento e impuesto de demostración con política explícita.
- Venta y outbox SQLite en una transacción.
- Historial con estados pending_sync, syncing, synced y failed.
- Simulador de impresora con errores recuperables y reimpresión marcada.
- Sincronización al recuperar conexión y deduplicación en servidor.

## Fuera de alcance

- No procesar tarjetas, manejar PAN/CVV, emitir documentos fiscales ni asegurar cumplimiento tributario.
- Expo Go no demuestra compatibilidad con SDK de una impresora real. La integración nativa y sus builds son una fase posterior separada.

## Arquitectura

```text
React Native → casos de uso → dominio monetario
                     ↓
             SQLite sales + outbox
                     ↓
             sync worker → API → PostgreSQL
                     ↓
          PaymentDevice / ReceiptPrinter
              simuladores en el MVP
```

## Estructura del repositorio

```text
apps/mobile/app/               rutas o pantallas
apps/mobile/src/domain/        dinero, carrito y venta
apps/mobile/src/application/   confirmar, reimprimir, sincronizar
apps/mobile/src/storage/       SQLite y migraciones
apps/mobile/src/devices/       puertos y simuladores
apps/mobile/src/sync/          outbox y recuperación
apps/api/                      servidor idempotente
packages/contracts/            esquema de venta
tests/scenarios/               cierre, offline y reintentos
docs/                          decisiones y video de demo
```

## Modelo de datos

| Entidad | Campos principales | Invariante |
| --- | --- | --- |
| products | id, name, price_minor, currency, updated_at | Seed local y ficticio; precio de la venta queda congelado por línea. |
| sales | id UUID, state, currency, subtotal_minor, discount_minor, tax_minor, total_minor | Guardar al confirmar; venta e intención de sincronización son atómicas. |
| sale_lines | sale_id, product_id, name_snapshot, quantity, unit_price_minor, amounts | Snapshot para reimpresión estable aunque cambie el catálogo. |
| sync_outbox | sale_id, attempt, lease_until, next_attempt_at, payload_hash | Recuperar leases vencidos tras cerrar la app. |
| print_attempts | sale_id, attempt, result, at | Reimpresión no crea otra venta ni otro pago. |

## Contratos de integración

| Operación | Entrada | Resultado esperado |
| --- | --- | --- |
| POST /api/sales | Idempotency-Key igual al UUID de venta y payload | 201 inicial; mismo payload devuelve venta existente; diferente payload 409. |
| GET /api/sales/:id | id de la venta | Permite confirmar el resultado tras timeout. |
| GET /api/catalog | cursor de versión de demo | Catálogo ficticio; validación antes de sustituir datos locales. |
| Interfaz PaymentDevice | authorize, getStatus y capabilities | Respuesta simulada: approved, declined, uncertain; ningún cargo real. |
| Interfaz ReceiptPrinter | print y getCapabilities | Imprimir o reportar error; reimpresión marcada como copia. |

Los errores HTTP usan `code`, `message` y `correlationId`; no devuelven stacks ni conexión de base de datos. La cuenta de demo queda explícitamente delimitada y no se presenta como autenticación productiva.

## Reglas que no deben romperse

- El usuario confirma una venta una sola vez; deshabilitar doble envío y validar también en dominio y almacenamiento.
- No guardar un booleano online como garantía de entrega: intentar, clasificar el resultado y conservar outbox hasta confirmación.
- Usar moneda explícita y unidades mínimas enteras. Definir si el descuento se aplica antes del impuesto y dónde se redondea. Para la demo: descuento por línea antes del impuesto y redondeo half-up por línea.
- No aplicar descuento en carrito y volver a aplicarlo al serializar el comprobante. El payload usa importes finales del snapshot.
- Normalizar fabricante en el adaptador; seleccionar por capabilities cuando sea posible. El dominio no debe conocer nombres de fabricantes.
- Fallo de impresión no revierte ni duplica la venta. Reimprimir usa el mismo snapshot con etiqueta de copia.
- Persistir la venta antes de afirmar que se guardó; recuperar sincronizaciones interrumpidas tras matar el proceso.

## Fases y backlog para convertir en issues

### Fase 1 Reglas y pantallas

- [ ] Dominio puro y catálogo/carrito sin red.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Tests verifican descuentos, límites y redondeo.

### Fase 2 Persistencia

- [ ] Migraciones SQLite y cierre transaccional.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Matar la app tras confirmar no pierde la venta.

### Fase 3 Dispositivos

- [ ] Interfaces y simuladores de pago e impresión.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Fabricante en distinto case funciona; fallo de impresión no duplica venta.

### Fase 4 Sincronización

- [ ] API idempotente y outbox con reintentos.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Timeout después de guardar en servidor termina con una venta.

### Fase 5 Experiencia

- [ ] Historial, detalle, estados offline y recuperación manual.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Se entiende qué está guardado, impreso y sincronizado.

### Fase 6 Entrega

- [ ] Emulador Android, video, CI de JS y guía.
- [ ] Añadir o actualizar las pruebas del comportamiento de esta fase.
- [ ] Registrar decisión técnica, evidencia y comandos en el PR.

Criterio de cierre: Un tercero reproduce el flujo offline; límites nativos documentados.

## Pruebas de aceptación

| Escenario | Cómo provocarlo | Resultado exigido |
| --- | --- | --- |
| Descuento | Carrito y ticket con rebaja | Se aplica una sola vez; totales coinciden. |
| Offline | Crear venta sin conexión y reiniciar | Venta persiste y queda pendiente. |
| Respuesta perdida | Servidor guarda y corta respuesta | Reintento no duplica la venta. |
| Doble confirmación | Dos taps rápidos | Un UUID, una venta y una intención de sincronización. |
| Impresora | Fallo y reimpresión | Misma venta y snapshot; reimpresión marcada. |
| Fabricante | Topwise, TOPWISE y fabricante desconocido | Normalización y fallback explícito sin asumir soporte. |
| Proceso interrumpido | Matar durante syncing | Lease se recupera y no queda syncing para siempre. |
| Moneda y cantidades | Cantidad inválida o moneda no admitida | Validación de dominio antes de persistir. |

## Guion de la demo

Iniciar en modo avión, agregar productos, aplicar un descuento y confirmar. Cerrar la app completamente y abrirla: el ticket sigue ahí. Simular fallo de impresora y reimprimir. Restaurar conexión con el servidor configurado para perder una respuesta y mostrar una sola venta en ambos lados.

## Configuración

EXPO_PUBLIC_API_BASE_URL y EXPO_PUBLIC_DEMO_MODE. Cualquier variable EXPO_PUBLIC va al cliente: nunca contiene secretos. API: DATABASE_URL y DEMO_ACTOR_ID.

## Comandos que debe ofrecer el proyecto

Estos nombres son el contrato a implementar en el scaffold. No describen scripts ya creados.

```text
npm ci
npx expo install --check
npm run typecheck
npm test
npx expo start
npm --prefix apps/api run verify
# La guía Android deberá incluir cómo acceder a la API desde emulador y dispositivo.
```

## Riesgos y decisiones

Los tests JS no verifican SQLite nativo, reconexión ni una impresora física. Separar la evidencia de emulador de la de hardware. Un APK de demo debe mostrar que los pagos son simulados y usar datos sintéticos.

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
