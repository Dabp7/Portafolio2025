export const projects = [
  {
    "name": "SuperKinal",
    "status": "published",
    "category": "Aplicación de escritorio · académico",
    "art": "java",
    "summary": "Gestión de inventario, compras y facturación con JavaFX y una base relacional.",
    "tech": [
      "Java",
      "JavaFX",
      "MySQL",
      "JDBC",
      "Maven"
    ],
    "url": "https://github.com/Dabp7/IN5BM_SuperKinal",
    "problem": "Organizar clientes, proveedores, productos y movimientos comerciales en una aplicación de escritorio con reglas consistentes.",
    "features": [
      "Interfaz JavaFX con organización MVC y acceso a datos mediante JDBC.",
      "Gestión de entidades comerciales, compras y facturas.",
      "Esquema SQL y migración documentada.",
      "Pruebas Java y workflow de verificación en GitHub Actions."
    ],
    "validation": "Veinticuatro pruebas reales de integración, validación y vistas, más migración y arranque del JAR. Demo MySQL aislada con datos ficticios, capturas JavaFX reales y video; el README explica instalación y evidencia.",
    "image": "projects/superkinal.png",
    "evidence": [
      {
        "label": "Demo con capturas JavaFX reales",
        "url": "https://github.com/Dabp7/IN5BM_SuperKinal/blob/master/docs/demo/README.md"
      }
    ]
  },
  {
    "name": "Ventas Online",
    "status": "published",
    "category": "Backend · académico",
    "art": "commerce",
    "summary": "API para conectar usuarios, catálogo, carrito y comprobantes en un flujo de venta.",
    "tech": [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "PDFKit"
    ],
    "url": "https://github.com/Dabp7/ventasOnline_LabFinal",
    "problem": "Conectar el proceso de compra con autenticación, roles y gestión de productos, en una API de aprendizaje.",
    "features": [
      "Autenticación y roles protegidos frente a elevación desde el perfil.",
      "Carrito propio sin reservas y compra transaccional de inventario.",
      "Comprobantes PDF descargables únicamente por el propietario.",
      "Seed sintético, OpenAPI, MongoDB replica set y verificación en CI."
    ],
    "validation": "Pruebas HTTP con MongoDB real: compras concurrentes, doble confirmación, rollback, cantidades, permisos y roles. Seed, arranque real, login y catálogo comprobados desde una base vacía."
  },
  {
    "name": "DocumentFlow",
    "status": "published",
    "category": "Backend · demo local",
    "art": "export",
    "summary": "Exportaciones XML y PDF con worker durable, ZIP por streaming y recuperación tras caídas.",
    "tech": [
      "TypeScript",
      "React",
      "PostgreSQL",
      "Streams"
    ],
    "problem": "Exportar un conjunto grande de documentos sin bloquear la interfaz ni cargar todos los archivos en memoria.",
    "features": [
      "Solicitudes idempotentes y panel React con estados y descarga.",
      "Worker separado con leases, heartbeat y fencing sobre PostgreSQL.",
      "ZIP incremental, PDF local y validación SHA-256.",
      "Datos sintéticos y almacenamiento filesystem; AWS queda para una fase posterior."
    ],
    "validation": "Build, tres pruebas unitarias y trece de integración con PostgreSQL real. Recorridos de navegador en escritorio y móvil, caída real de worker y benchmark reproducible de 1 000 documentos. El README enlaza comandos, video y decisiones.",
    "image": "projects/documentflow.png",
    "url": "https://github.com/Dabp7/documentflow",
    "evidence": [
      {
        "label": "Video de la exportación real",
        "url": "https://github.com/Dabp7/documentflow/blob/main/docs/evidence/demo.webm"
      },
      {
        "label": "Decisión: almacenamiento local antes de AWS",
        "url": "https://github.com/Dabp7/documentflow/blob/main/docs/decisions/001-local-first.md"
      },
      {
        "label": "Decisión: worker, leases y publicación de resultados",
        "url": "https://github.com/Dabp7/documentflow/blob/main/docs/architecture.md"
      }
    ]
  },
  {
    "name": "ReconcileLab",
    "status": "published",
    "category": "Integraciones · laboratorio",
    "art": "reconcile",
    "summary": "Una operación incierta se concilia con un proveedor simulado sin duplicar su efecto.",
    "tech": [
      "C# / .NET",
      "PostgreSQL",
      "React",
      "Docker"
    ],
    "problem": "Una API externa puede aceptar una operación aunque su respuesta se pierda. Reenviarla sin comprobar el estado puede duplicarla.",
    "features": [
      "API y worker .NET con PostgreSQL, outbox y proveedor independiente.",
      "Estados de incertidumbre, idempotencia y consulta antes del reenvío.",
      "Timeline React, eventos duplicados y exportación de evidencia JSON.",
      "Recuperación de leases y revisión manual cuando el proveedor no garantiza idempotencia."
    ],
    "validation": "Catorce pruebas unitarias y ocho de integración con API, proveedor y dos workers reales. Prueba de caída después del HTTP y recuperación con un único efecto. Build, formato, navegador y Docker Compose verificados en CI.",
    "image": "projects/reconcilelab.png",
    "url": "https://github.com/Dabp7/reconcilelab"
  },
  {
    "name": "POS Sandbox",
    "status": "published",
    "category": "Mobile · demo offline",
    "art": "pos",
    "summary": "Una venta móvil persiste sin conexión y se sincroniza sin duplicarse al recuperar la red.",
    "tech": [
      "React Native",
      "TypeScript",
      "SQLite",
      "Expo",
      "PostgreSQL"
    ],
    "problem": "Explorar la facturación móvil y un POS sin requerir un procesador de pagos real.",
    "features": [
      "Catálogo, carrito y totales en centavos con descuento e impuesto de demostración.",
      "SQLite nativo con comprobante inmutable y outbox transaccional.",
      "Pagos e impresión simulados, con consulta de estado y reimpresión marcada como copia.",
      "API idempotente PostgreSQL y recuperación de respuestas perdidas tras confirmar."
    ],
    "validation": "Pruebas de dominio, SQLite y API con PostgreSQL real. En Android API36 se comprobó guardar, forzar cierre sin red, recuperar y sincronizar el mismo UUID tras una respuesta perdida. También se verificó la demo web a390px. Todos los pagos y dispositivos son simulados.",
    "image": "projects/pos-sandbox.png",
    "url": "https://github.com/Dabp7/pos-sandbox",
    "evidence": [
      {
        "label": "Video del recorrido web",
        "url": "https://github.com/Dabp7/pos-sandbox/blob/main/docs/evidence/pos-demo-web.webm"
      },
      {
        "label": "Prueba de persistencia nativa en Android",
        "url": "https://github.com/Dabp7/pos-sandbox/blob/main/docs/evidence/native-results.json"
      }
    ]
  }
]
export const experience = [
  {
    "icon": "cloud",
    "title": "Procesos que siguen trabajando",
    "text": "Recuperación y descarga de documentos con S3, DynamoDB Streams, Lambda y ECS Fargate. Generación de PDF y preparación de archivos ZIP."
  },
  {
    "icon": "backend",
    "title": "Integraciones y reglas de negocio",
    "text": "Servicios REST y SOAP/ASMX, lógica en C#/.NET y funciones PostgreSQL. Autogestión, validaciones XML y tratamiento de errores."
  },
  {
    "icon": "web",
    "title": "Interfaces conectadas al negocio",
    "text": "Portales React y TypeScript para consulta y autogestión. Reportes y mejoras de exactitud en fechas, filtros e importes."
  },
  {
    "icon": "mobile",
    "title": "Del navegador al dispositivo",
    "text": "Mantenimiento de aplicaciones React Native, correcciones de facturación e integración con equipos POS Sunmi y Topwise."
  }
]
export const capabilities = [
  {
    "label": "PRODUCTO",
    "title": "Frontend & mobile",
    "text": "Interfaces comprensibles, estados de error y recorridos conectados a servicios reales.",
    "tech": [
      "React",
      "Next.js",
      "TypeScript",
      "React Native"
    ]
  },
  {
    "label": "LÓGICA",
    "title": "Backend & datos",
    "text": "Contratos claros, reglas explícitas e integraciones que contemplan lo que puede fallar.",
    "tech": [
      "Node.js",
      "C# / .NET",
      "PostgreSQL",
      "SQL Server"
    ]
  },
  {
    "label": "ENTREGA",
    "title": "Cloud & calidad",
    "text": "Procesos asíncronos, contenedores y comprobaciones que acompañan cada cambio.",
    "tech": [
      "AWS",
      "Docker",
      "GitHub Actions",
      "Jest / Vitest"
    ]
  }
]
