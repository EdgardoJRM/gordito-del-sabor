# 📊 SQL vs NoSQL - DIFERENCIAS EXPLICADAS

## RESUMEN RÁPIDO

| Aspecto | SQL | NoSQL |
|--------|-----|-------|
| **Estructura** | Tablas con filas y columnas | Documentos, clave-valor, grafos |
| **Esquema** | Rígido (predefinido) | Flexible (dinámico) |
| **Relaciones** | Sí (JOIN) | No (desnormalizado) |
| **Escalabilidad** | Vertical | Horizontal |
| **Transacciones** | ACID (seguras) | BASE (eventual) |
| **Velocidad** | Más lenta con muchos datos | Más rápida |
| **Complejidad** | Más complejo | Más simple |

---

## SQL (RELACIONAL)

### ¿Qué es?
Base de datos que organiza datos en **tablas** con **filas** y **columnas**, como un Excel.

### Estructura

```
TABLA: USUARIOS
┌─────┬──────────┬─────────────────┬──────────┐
│ ID  │ Nombre   │ Email           │ Edad     │
├─────┼──────────┼─────────────────┼──────────┤
│ 1   │ Juan     │ juan@email.com  │ 25       │
│ 2   │ María    │ maria@email.com │ 30       │
│ 3   │ Carlos   │ carlos@email.com│ 28       │
└─────┴──────────┴─────────────────┴──────────┘

TABLA: ÓRDENES
┌─────┬─────────┬──────────┬────────┐
│ ID  │ Usuario │ Producto │ Precio │
├─────┼─────────┼──────────┼────────┤
│ 1   │ 1       │ Delantal │ $19.99 │
│ 2   │ 2       │ Delantal │ $29.99 │
│ 3   │ 1       │ Delantal │ $39.99 │
└─────┴─────────┴──────────┴────────┘
```

### Características

✅ **Esquema Rígido**
- Debes definir las columnas antes
- Todos los registros tienen la misma estructura
- No puedes agregar campos dinámicamente

✅ **Relaciones**
- Puedes conectar tablas (JOIN)
- Evita duplicación de datos
- Integridad referencial

✅ **Transacciones ACID**
- Atomicidad: Todo o nada
- Consistencia: Datos válidos
- Aislamiento: Sin conflictos
- Durabilidad: Datos guardados

✅ **Consultas Complejas**
- SQL es muy poderoso
- Puedes hacer búsquedas complejas
- Reportes avanzados

### Ejemplos de SQL

```sql
-- Crear tabla
CREATE TABLE usuarios (
  id INT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100),
  edad INT
);

-- Insertar datos
INSERT INTO usuarios VALUES (1, 'Juan', 'juan@email.com', 25);

-- Buscar datos
SELECT * FROM usuarios WHERE edad > 25;

-- Unir tablas
SELECT u.nombre, o.producto 
FROM usuarios u 
JOIN ordenes o ON u.id = o.usuario;
```

### Bases de Datos SQL

- **PostgreSQL** (Recomendado)
- **MySQL**
- **SQL Server**
- **Oracle**
- **MariaDB**

### Ventajas

✅ Datos consistentes
✅ Relaciones claras
✅ Transacciones seguras
✅ Consultas poderosas
✅ Integridad de datos

### Desventajas

❌ Menos flexible
❌ Escalabilidad limitada
❌ Más lento con muchos datos
❌ Cambios de esquema complicados

---

## NoSQL (NO RELACIONAL)

### ¿Qué es?
Base de datos que almacena datos en **documentos** (JSON), **clave-valor**, o **grafos**, sin estructura fija.

### Estructura

```
COLECCIÓN: usuarios
[
  {
    _id: 1,
    nombre: "Juan",
    email: "juan@email.com",
    edad: 25,
    ciudad: "San Juan"  // Campo extra
  },
  {
    _id: 2,
    nombre: "María",
    email: "maria@email.com",
    edad: 30
    // Sin ciudad
  },
  {
    _id: 3,
    nombre: "Carlos",
    email: "carlos@email.com",
    edad: 28,
    ciudad: "Ponce",
    teléfono: "787-123-4567"  // Campo diferente
  }
]

COLECCIÓN: ordenes
[
  {
    _id: 1,
    usuario_id: 1,
    producto: "Delantal",
    precio: 19.99,
    fecha: "2024-01-15"
  },
  {
    _id: 2,
    usuario_id: 2,
    producto: "Delantal",
    precio: 29.99,
    fecha: "2024-01-16",
    descuento: 5  // Campo extra
  }
]
```

### Características

✅ **Esquema Flexible**
- No necesitas definir estructura
- Cada documento puede ser diferente
- Puedes agregar campos dinámicamente

✅ **Documentos Anidados**
- Puedes guardar datos relacionados juntos
- Menos consultas necesarias
- Más rápido para lectura

✅ **Escalabilidad Horizontal**
- Fácil de distribuir en múltiples servidores
- Crece con tu aplicación
- Mejor para datos grandes

✅ **Transacciones BASE**
- Básicamente disponible
- Estado suave
- Eventualmente consistente

### Ejemplos de NoSQL (MongoDB)

```javascript
// Crear colección e insertar
db.usuarios.insertOne({
  nombre: "Juan",
  email: "juan@email.com",
  edad: 25,
  ciudad: "San Juan"
});

// Buscar datos
db.usuarios.find({ edad: { $gt: 25 } });

// Actualizar
db.usuarios.updateOne(
  { _id: 1 },
  { $set: { ciudad: "San Juan" } }
);

// Agregar campo dinámicamente
db.usuarios.updateOne(
  { _id: 1 },
  { $set: { teléfono: "787-123-4567" } }
);
```

### Bases de Datos NoSQL

- **MongoDB** (Documentos)
- **Firebase** (Documentos)
- **Redis** (Clave-valor)
- **Cassandra** (Columnas)
- **Neo4j** (Grafos)

### Ventajas

✅ Muy flexible
✅ Escalable horizontalmente
✅ Rápido para lectura
✅ Fácil de cambiar
✅ Bueno para datos no estructurados

### Desventajas

❌ Menos consistencia
❌ Duplicación de datos
❌ Consultas más complejas
❌ Transacciones limitadas

---

## COMPARACIÓN VISUAL

### Caso: Tienda de Delantales

#### SQL (PostgreSQL)

```
TABLA: usuarios
┌────┬────────┬──────────────────┐
│ id │ nombre │ email            │
├────┼────────┼──────────────────┤
│ 1  │ Juan   │ juan@email.com   │
│ 2  │ María  │ maria@email.com  │
└────┴────────┴──────────────────┘

TABLA: delantales
┌────┬──────────────────┬────────┐
│ id │ nombre           │ precio │
├────┼──────────────────┼────────┤
│ 1  │ Delantal Básico  │ 19.99  │
│ 2  │ Delantal Premium │ 39.99  │
└────┴──────────────────┴────────┘

TABLA: ordenes
┌────┬──────────┬────────────┬──────────┐
│ id │ usuario  │ delantal   │ cantidad │
├────┼──────────┼────────────┼──────────┤
│ 1  │ 1        │ 1          │ 2        │
│ 2  │ 2        │ 2          │ 1        │
└────┴──────────┴────────────┴──────────┘

CONSULTA:
SELECT u.nombre, d.nombre, o.cantidad
FROM ordenes o
JOIN usuarios u ON o.usuario = u.id
JOIN delantales d ON o.delantal = d.id;
```

#### NoSQL (MongoDB)

```
COLECCIÓN: ordenes
[
  {
    _id: 1,
    usuario: {
      id: 1,
      nombre: "Juan",
      email: "juan@email.com"
    },
    delantal: {
      id: 1,
      nombre: "Delantal Básico",
      precio: 19.99
    },
    cantidad: 2,
    fecha: "2024-01-15"
  },
  {
    _id: 2,
    usuario: {
      id: 2,
      nombre: "María",
      email: "maria@email.com"
    },
    delantal: {
      id: 2,
      nombre: "Delantal Premium",
      precio: 39.99
    },
    cantidad: 1,
    fecha: "2024-01-16"
  }
]

CONSULTA:
db.ordenes.find({});
```

---

## ¿CUÁNDO USAR CADA UNA?

### Usa SQL si:

✅ Datos muy relacionados
✅ Necesitas transacciones seguras
✅ Datos estructurados
✅ Consultas complejas
✅ Integridad de datos crítica

**Ejemplos:**
- Banco (dinero)
- Hospital (pacientes)
- Empresa (empleados)
- Inventario (stock)

### Usa NoSQL si:

✅ Datos flexibles
✅ Escalabilidad importante
✅ Datos no estructurados
✅ Velocidad de lectura crítica
✅ Cambios frecuentes

**Ejemplos:**
- Red social (posts)
- Blog (artículos)
- Chat (mensajes)
- Análisis (logs)
- Tu tienda de recetas

---

## PARA TU PROYECTO (El Gordito del Sabor)

### Datos que tienes:

```
Usuarios:
- ID, nombre, email, contraseña, fecha_registro

Recetas:
- ID, título, categoría, ingredientes, instrucciones, tiempo, dificultad

Órdenes:
- ID, usuario_id, delantal_id, cantidad, precio, fecha

Favoritos:
- ID, usuario_id, receta_id, fecha_guardado
```

### Recomendación: NoSQL (MongoDB)

**Por qué:**
✅ Recetas pueden tener campos diferentes
✅ Ingredientes son arrays (flexible)
✅ Favoritos son simples
✅ Escalable para crecer
✅ Rápido para lectura

**Estructura MongoDB:**

```javascript
// Usuarios
{
  _id: ObjectId,
  nombre: "Juan",
  email: "juan@email.com",
  contraseña: "hash",
  createdAt: Date
}

// Recetas
{
  _id: ObjectId,
  título: "Mofongo",
  categoría: "Comida Criolla",
  ingredientes: ["plátanos", "ajo", "sal"],
  instrucciones: ["paso 1", "paso 2"],
  tiempo: "20 min",
  dificultad: "Fácil",
  imagen: "url"
}

// Órdenes
{
  _id: ObjectId,
  usuario_id: ObjectId,
  delantal_id: ObjectId,
  cantidad: 2,
  precio: 39.99,
  createdAt: Date
}

// Favoritos
{
  _id: ObjectId,
  usuario_id: ObjectId,
  receta_id: ObjectId,
  createdAt: Date
}
```

---

## RESUMEN FINAL

| Característica | SQL | NoSQL |
|---|---|---|
| **Estructura** | Tablas rígidas | Documentos flexibles |
| **Relaciones** | Sí (JOIN) | No (anidado) |
| **Escalabilidad** | Vertical | Horizontal |
| **Velocidad** | Lenta con muchos datos | Rápida |
| **Consistencia** | ACID (garantizada) | BASE (eventual) |
| **Complejidad** | Más complejo | Más simple |
| **Cambios** | Difíciles | Fáciles |
| **Para tu proyecto** | ❌ | ✅ |

---

## CONCLUSIÓN

Para **El Gordito del Sabor**, **MongoDB (NoSQL)** es la mejor opción porque:

1. ✅ Flexible para cambios futuros
2. ✅ Rápido para lectura de recetas
3. ✅ Fácil de escalar
4. ✅ Estructura simple
5. ✅ Gratis en MongoDB Atlas

**Próximo paso:** Configurar MongoDB Atlas y conectarlo a tu proyecto.

¿Quieres que te ayude a configurarlo? 🚀
