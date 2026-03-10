# 🏗️ Arquitectura de MongoDB Integration

## Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                    EL GORDITO DEL SABOR                         │
│                    (Next.js App)                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NextAuth.js                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ CredentialsProvider                                      │  │
│  │ - Login                                                  │  │
│  │ - Registro                                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    lib/auth.ts                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ authorize(credentials)                                   │  │
│  │ - Valida email y contraseña                              │  │
│  │ - Conecta a MongoDB                                      │  │
│  │ - Busca/crea usuario                                     │  │
│  │ - Hashea contraseña                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    lib/mongodb.ts                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ dbConnect()                                              │  │
│  │ - Conecta a MongoDB Atlas                                │  │
│  │ - Cachea conexión                                        │  │
│  │ - Reutiliza conexión                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MongoDB Atlas                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Cluster0 (Gratis - M0)                                   │  │
│  │                                                          │  │
│  │ ┌────────────────────────────────────────────────────┐  │  │
│  │ │ users (Colección)                                  │  │  │
│  │ │ - _id: ObjectId                                    │  │  │
│  │ │ - name: String                                     │  │  │
│  │ │ - email: String (único)                            │  │  │
│  │ │ - password: String (hasheada)                      │  │  │
│  │ │ - createdAt: Date                                  │  │  │
│  │ │ - updatedAt: Date                                  │  │  │
│  │ └────────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  │ ┌────────────────────────────────────────────────────┐  │  │
│  │ │ orders (Colección)                                 │  │  │
│  │ │ - _id: ObjectId                                    │  │  │
│  │ │ - userId: ObjectId (referencia a users)            │  │  │
│  │ │ - productId: String                                │  │  │
│  │ │ - customText: String                               │  │  │
│  │ │ - quantity: Number                                 │  │  │
│  │ │ - price: Number                                    │  │  │
│  │ │ - email: String                                    │  │  │
│  │ │ - status: String (pending/completed/failed)        │  │  │
│  │ │ - stripeSessionId: String                          │  │  │
│  │ │ - createdAt: Date                                  │  │  │
│  │ │ - updatedAt: Date                                  │  │  │
│  │ └────────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  │ ┌────────────────────────────────────────────────────┐  │  │
│  │ │ favorites (Colección)                              │  │  │
│  │ │ - _id: ObjectId                                    │  │  │
│  │ │ - userId: ObjectId (referencia a users)            │  │  │
│  │ │ - recipeId: String                                 │  │  │
│  │ │ - createdAt: Date                                  │  │  │
│  │ └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Flujo de Registro

```
Usuario
  │
  ├─ Ingresa: nombre, email, contraseña
  │
  ▼
Formulario de Login
  │
  ├─ Envía credenciales a NextAuth
  │
  ▼
lib/auth.ts (authorize)
  │
  ├─ Valida que no esté vacío
  ├─ Conecta a MongoDB
  ├─ Busca si el email ya existe
  ├─ Si existe: Error "Email ya registrado"
  ├─ Si no existe:
  │   ├─ Hashea la contraseña
  │   ├─ Crea documento en colección "users"
  │   └─ Retorna usuario
  │
  ▼
NextAuth
  │
  ├─ Crea JWT token
  ├─ Guarda sesión
  │
  ▼
Usuario Autenticado ✅
```

## Flujo de Login

```
Usuario
  │
  ├─ Ingresa: email, contraseña
  │
  ▼
Formulario de Login
  │
  ├─ Envía credenciales a NextAuth
  │
  ▼
lib/auth.ts (authorize)
  │
  ├─ Valida que no esté vacío
  ├─ Conecta a MongoDB
  ├─ Busca usuario por email
  ├─ Si no existe: Error "Email o contraseña incorrectos"
  ├─ Si existe:
  │   ├─ Compara contraseña con bcrypt
  │   ├─ Si no coincide: Error "Email o contraseña incorrectos"
  │   ├─ Si coincide: Retorna usuario
  │
  ▼
NextAuth
  │
  ├─ Crea JWT token
  ├─ Guarda sesión
  │
  ▼
Usuario Autenticado ✅
```

## Flujo de Crear Orden

```
Usuario (Autenticado)
  │
  ├─ Selecciona apron
  ├─ Ingresa texto personalizado
  ├─ Agrega al carrito
  ├─ Hace clic en "Checkout"
  │
  ▼
app/api/checkout/route.ts
  │
  ├─ Valida que usuario esté autenticado
  ├─ Crea sesión de Stripe
  ├─ Redirige a Stripe Checkout
  │
  ▼
Stripe Checkout
  │
  ├─ Usuario ingresa tarjeta
  ├─ Procesa pago
  │
  ▼
Webhook de Stripe
  │
  ├─ Pago exitoso
  ├─ Crea orden en MongoDB
  │   ├─ userId: ID del usuario
  │   ├─ productId: ID del apron
  │   ├─ customText: Texto personalizado
  │   ├─ price: Precio
  │   ├─ status: "completed"
  │   └─ stripeSessionId: ID de sesión
  │
  ▼
Redirige a Página de Éxito ✅
```

## Flujo de Guardar Favorito

```
Usuario (Autenticado)
  │
  ├─ Ve receta
  ├─ Hace clic en corazón
  │
  ▼
FavoriteButton.tsx
  │
  ├─ Llama a addFavorite(recipeId)
  ├─ Guarda en localStorage (local)
  ├─ Guarda en MongoDB (persistente)
  │
  ▼
MongoDB
  │
  ├─ Crea documento en "favorites"
  │   ├─ userId: ID del usuario
  │   ├─ recipeId: ID de la receta
  │   └─ createdAt: Fecha
  │
  ▼
Corazón se marca como favorito ✅
```

## Estructura de Carpetas

```
gordito-del-sabor/
├── lib/
│   ├── mongodb.ts                    ← Conexión
│   ├── auth.ts                       ← Autenticación (actualizado)
│   ├── models/
│   │   ├── User.ts                   ← Modelo de usuario
│   │   ├── Order.ts                  ← Modelo de orden
│   │   └── Favorite.ts               ← Modelo de favorito
│   ├── recipes-data.ts               ← Datos de recetas
│   ├── products.ts                   ← Datos de productos
│   ├── cart-store.ts                 ← Zustand store del carrito
│   └── favorites-store.ts            ← Zustand store de favoritos
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts
│   │   │   └── register/
│   │   │       └── route.ts          ← Nuevo
│   │   ├── checkout/
│   │   │   └── route.ts
│   │   ├── orders/
│   │   │   └── route.ts              ← Nuevo
│   │   └── admin/
│   │       └── orders/
│   │           └── route.ts
│   │
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── recetas/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── tienda/
│   │   └── page.tsx
│   │
│   ├── carrito/
│   │   └── page.tsx
│   │
│   ├── pago-exitoso/
│   │   └── page.tsx
│   │
│   ├── perfil/
│   │   └── page.tsx
│   │
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── usuarios/
│   │   │   └── page.tsx
│   │   ├── recetas-vistas/
│   │   │   └── page.tsx
│   │   └── ordenes/
│   │       └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── types/
│   └── mongoose.d.ts                 ← Nuevo
│
├── .env.local                        ← Agregar MONGODB_URI
├── .env.example                      ← Actualizado
│
└── Documentación/
    ├── MONGODB_SETUP.md              ← Guía completa
    ├── MONGODB_QUICK_START.md        ← Inicio rápido
    ├── MONGODB_INTEGRATION.md        ← Resumen de cambios
    ├── MONGODB_COMPLETE.md           ← Resumen completo
    └── MONGODB_ARCHITECTURE.md       ← Este archivo
```

## Conexión a MongoDB

```
┌─────────────────────────────────────────────────────────────┐
│ .env.local                                                  │
│ MONGODB_URI=mongodb+srv://gordito_user:password@cluster0... │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ lib/mongodb.ts                                              │
│ - Lee MONGODB_URI de .env.local                             │
│ - Conecta a MongoDB Atlas                                   │
│ - Cachea la conexión                                        │
│ - Reutiliza para todas las operaciones                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ MongoDB Atlas (Cloud)                                       │
│ - Almacena datos de forma segura                            │
│ - Accesible desde cualquier lugar                           │
│ - Gratis (M0 - 512MB)                                       │
│ - Escalable                                                 │
└─────────────────────────────────────────────────────────────┘
```

## Seguridad

```
┌─────────────────────────────────────────────────────────────┐
│ Contraseña del Usuario                                      │
│ "MiContraseña123"                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ bcryptjs.hash()                                             │
│ - Genera salt aleatorio                                     │
│ - Hashea 10 veces                                           │
│ - Imposible revertir                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ MongoDB                                                     │
│ "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36..."│
│ (Nunca se guarda en texto plano)                            │
└─────────────────────────────────────────────────────────────┘
```

## Próximos Pasos

1. ✅ Crear cuenta en MongoDB Atlas
2. ✅ Crear cluster M0 (gratis)
3. ✅ Crear usuario de base de datos
4. ✅ Permitir acceso desde tu IP
5. ✅ Obtener connection string
6. ✅ Agregar a .env.local
7. ✅ Probar la conexión

¡Listo! 🚀
