# Plan de mejora de ventasOnline_LabFinal

Repositorio: https://github.com/Dabp7/ventasOnline_LabFinal

## Problema que resuelve

Flujo de venta con catálogo, carrito, permisos y comprobantes.

## Tecnologías

Node.js, Express, MongoDB, JWT y PDFKit.

## Backlog ordenado

- [ ] Revisar .env y datos versionados; reemplazar por ejemplos ficticios y rotar valores si fueron secretos reales.
- [ ] Añadir pruebas de propiedad del carrito, roles y acceso a comprobantes.
- [ ] Definir transacción de stock y compra; dos compras concurrentes no venden stock negativo.
- [ ] Documentar OpenAPI y errores; agregar CI y un seed local.

## Primera tarea

Prueba de compra concurrente y regla de inventario.

## Criterio de cierre

La API no permite comprar inventario inexistente ni leer compras ajenas; la demo se instala con el README.

## Entrega en GitHub

Trabajar en una rama, comprobar los cambios y abrir un PR con comandos ejecutados y resultados. Mantener el propósito académico del proyecto; añadir evidencia técnica antes de multiplicar funcionalidades. En el portafolio describir solo lo que esté implementado.
