# Entrega de proyectos · 27 de noviembre de 2026

Se implementaron los tres laboratorios nuevos y las mejoras de los nueve repositorios existentes. Cada repositorio incluye su guía de instalación y evidencia de las verificaciones ejecutadas. Son demos locales con datos sintéticos; AWS queda aplazado.

## Repositorios y evidencia

- **[DocumentFlow](https://github.com/Dabp7/documentflow)**: 16 pruebas (3 unitarias y 13 de integración), navegador escritorio/móvil, ZIP/PDF reales, caída de worker, paginación precisa y Docker Compose. [Evidencia](https://github.com/Dabp7/documentflow/blob/main/docs/evidence/verification.md) · [CI](https://github.com/Dabp7/documentflow/actions).

- **[ReconcileLab](https://github.com/Dabp7/reconcilelab)**: 22 pruebas, proveedor independiente y dos workers, recuperación de lease, navegador y Docker Compose. [Evidencia](https://github.com/Dabp7/reconcilelab/blob/main/docs/evidence/verification.md) · [CI](https://github.com/Dabp7/reconcilelab/actions).

- **[POS Sandbox](https://github.com/Dabp7/pos-sandbox)**: 13 pruebas con SQLite/PostgreSQL, recorrido web y persistencia/sincronización tras cierre forzado en Android API36. [Evidencia](https://github.com/Dabp7/pos-sandbox/blob/main/docs/evidence/verification.md) · [CI](https://github.com/Dabp7/pos-sandbox/actions).

- **[Portafolio](https://github.com/Dabp7/Portafolio2025)**: lint, build, assets/CV/hosting y cuatro pruebas Playwright de escritorio/móvil. [Evidencia](https://github.com/Dabp7/Portafolio2025/blob/main/docs/evidence/2026-11-27-proyectos.md) · [CI](https://github.com/Dabp7/Portafolio2025/actions).

- **[SuperKinal](https://github.com/Dabp7/IN5BM_SuperKinal)**: 24 pruebas reales, migración, arranque JAR, seed MySQL aislado, capturas JavaFX y video. [Evidencia](https://github.com/Dabp7/IN5BM_SuperKinal/blob/master/docs/evidence/demo-validation.md) · [CI](https://github.com/Dabp7/IN5BM_SuperKinal/actions).

- **[Ventas Online](https://github.com/Dabp7/ventasOnline_LabFinal)**: 10 pruebas MongoDB, compras concurrentes, rollback, permisos, validación de inventario y seed repetido. [Evidencia](https://github.com/Dabp7/ventasOnline_LabFinal/blob/master/docs/evidence.md) · [CI](https://github.com/Dabp7/ventasOnline_LabFinal/actions).

- **[Gestión Coperex](https://github.com/Dabp7/Gestion_Coperex)**: 5 pruebas MongoDB, permisos en todas las rutas, filtros y lectura del Excel con tipos numéricos. [Evidencia](https://github.com/Dabp7/Gestion_Coperex/blob/master/docs/evidence.md) · [CI](https://github.com/Dabp7/Gestion_Coperex/actions).

- **[Gestión de Estudiantes](https://github.com/Dabp7/Gestion_Estudiantes_2020527)**: 9 pruebas MongoDB, límite de tres cursos bajo concurrencia, propiedad, borrado transaccional y seed. [Evidencia](https://github.com/Dabp7/Gestion_Estudiantes_2020527/blob/master/docs/evidence.md) · [CI](https://github.com/Dabp7/Gestion_Estudiantes_2020527/actions).

- **[Gestión de Opiniones](https://github.com/Dabp7/Gestion_Opiniones_2025)**: 8 pruebas MongoDB, autoría, categorías, comentarios sin huérfanos, revocación de JWT y reparación de demo. [Evidencia](https://github.com/Dabp7/Gestion_Opiniones_2025/blob/master/docs/evidence.md) · [CI](https://github.com/Dabp7/Gestion_Opiniones_2025/actions).

- **[Blog backend](https://github.com/Dabp7/Back_BlogAprendizaje)**: 10 pruebas MongoDB, contratos de comentarios, transacciones, límites, seed y API temporal reproducible. [Evidencia](https://github.com/Dabp7/Back_BlogAprendizaje/blob/master/docs/evidence.md) · [CI](https://github.com/Dabp7/Back_BlogAprendizaje/actions).

- **[Blog frontend](https://github.com/Dabp7/Front_BlogAprendizaje)**: lint/build y cinco recorridos Playwright, incluido comentario contra backend/MongoDB reales. [Evidencia](https://github.com/Dabp7/Front_BlogAprendizaje/blob/master/docs/verification.md) · [CI](https://github.com/Dabp7/Front_BlogAprendizaje/actions).

- **[Laboratorio 2](https://github.com/Dabp7/Laboratorio_2)**: 9 pruebas MongoDB, reservas simultáneas, reprogramación, permisos y subida de imágenes desde clon limpio. [Evidencia](https://github.com/Dabp7/Laboratorio_2/blob/master/docs/evidence.md) · [CI](https://github.com/Dabp7/Laboratorio_2/actions).

## Cómo empezar

Clonar el repositorio que se quiera ejecutar y seguir su README: los stacks usan distintos requisitos. Node/npm cubren las aplicaciones web y móviles; ReconcileLab necesita .NET10 y PostgreSQL; SuperKinal necesita JDK8 con JavaFX, Maven y MySQL. Los repositorios Node que usan transacciones requieren MongoDB replica set. Hay alternativas Docker Compose para bases o demos completas según el proyecto.

Las demos se ejecutan individualmente. Si se usan varios Compose a la vez, ajustar sus puertos de bases para evitar conflictos. Los scripts de prueba levantan bases temporales propias o usan una base explícita de pruebas; no deben apuntarse a datos personales.

El portafolio presenta cinco casos seleccionados, enlaza los repositorios reales, videos y decisiones y distingue la ilustración conceptual de Ventas Online de las capturas de las demos.

## Alcance de esta entrega

AWS no requiere cuenta ni recursos en esta versión. Firebase conserva su configuración, pero no se desplegó desde esta tarea. POS usa pagos e impresoras simulados; se verificó SQLite nativo en emulador Android, no hardware POS físico ni publicación en una tienda.

Las guías de tecnologías se conservan como material de práctica. La traducción inglesa y los metadatos para un dominio definitivo permanecen como mejoras futuras condicionadas a esa publicación.
