# Sistema de E-Commerce - El Gordito del Sabor

## Descripción General

Se ha integrado un sistema completo de e-commerce a la página web de El Gordito del Sabor. El sistema permite:

- ✅ Autenticación de usuarios (login/registro)
- ✅ Tienda de delantales personalizados
- ✅ Carrito de compras
- ✅ Checkout con Stripe
- ✅ Panel de admin para ver órdenes
- ✅ Página de confirmación de pago

## Características

### 1. Autenticación de Usuarios
- **Ubicación**: `/auth/login`
- **Funcionalidad**:
  - Registro de nuevos usuarios
  - Login con email y contraseña
  - Contraseñas encriptadas con bcryptjs
  - Sesiones con NextAuth

### 2. Tienda de Delantales
- **Ubicación**: `/tienda`
- **Productos**:
  1. Delantal Básico - $19.99
  2. Delantal Estándar - $29.99
  3. Delantal Premium Canvas - $39.99

- **Personalización**:
  - Cada delantal permite texto personalizado
  - Máximo 20 caracteres
  - Se muestra como: "[TEXTO] del Sabor"
  - Ejemplo: "El Flaco del Sabor"

### 3. Carrito de Compras
- **Ubicación**: `/carrito`
- **Funcionalidad**:
  - Agregar/eliminar productos
  - Cambiar cantidad
  - Ver total
  - Proceder al pago

### 4. Checkout con Stripe
- **Integración**: Stripe Checkout
- **Flujo**:
  1. Usuario hace clic en "Proceder al Pago"
  2. Se redirige a Stripe Checkout
  3. Usuario ingresa datos de tarjeta
  4. Pago procesado
  5. Redirección a página de éxito

### 5. Panel de Admin
- **Ubicación**: `/admin/orders`
- **Funcionalidad**:
  - Ver todas las órdenes
  - Información del cliente
  - Detalles del producto
  - Estado de la orden
  - Fecha de creación

## Estructura de Archivos

```
app/
├── api/
│   ├── auth/[...nextauth]/route.ts    # Configuración NextAuth
│   ├── checkout/route.ts               # API de checkout
│   └── admin/orders/route.ts           # API de órdenes
├── auth/
│   └── login/page.tsx                  # Página de login/registro
├── tienda/page.tsx                     # Página de tienda
├── carrito/page.tsx                    # Página de carrito
├── pago-exitoso/page.tsx               # Página de confirmación
└── admin/
    └── orders/page.tsx                 # Panel de admin

lib/
├── auth.ts                             # Configuración NextAuth
├── products.ts                         # Datos de productos
└── cart-store.ts                       # Store de carrito (Zustand)

components/
├── Navbar.tsx                          # Navbar actualizado con carrito
└── Hero.tsx                            # Hero actualizado con enlace a tienda
```

## Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=tu-secret-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Flujo de Compra

1. **Usuario no autenticado**
   - Hace clic en "Tienda de Delantales"
   - Se redirige a `/auth/login`
   - Se registra o inicia sesión

2. **Usuario autenticado**
   - Accede a `/tienda`
   - Selecciona un delantal
   - Ingresa texto personalizado
   - Agrega al carrito
   - Va a `/carrito`
   - Revisa su orden
   - Hace clic en "Proceder al Pago"

3. **Pago**
   - Se abre Stripe Checkout
   - Usuario ingresa datos de tarjeta
   - Pago procesado
   - Redirección a `/pago-exitoso`

4. **Confirmación**
   - Se muestra página de éxito
   - Se limpia el carrito
   - Se guarda la orden

## Datos de Prueba

### Tarjetas de Prueba (Stripe)
- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **Fecha**: Cualquier fecha futura
- **CVC**: Cualquier número de 3 dígitos

### Usuarios de Prueba
Puedes crear usuarios de prueba en la página de login.

## Almacenamiento de Datos

### Usuarios
- Almacenados en memoria (desarrollo)
- En producción: usar base de datos (MongoDB, PostgreSQL, etc.)

### Órdenes
- Almacenadas en memoria (desarrollo)
- En producción: usar base de datos

### Carrito
- Almacenado en localStorage del navegador
- Persiste entre sesiones

## Seguridad

- ✅ Contraseñas encriptadas con bcryptjs
- ✅ Sesiones JWT con NextAuth
- ✅ Variables de entorno protegidas
- ✅ Stripe maneja datos de tarjeta (PCI compliant)

## Próximos Pasos

1. **Base de Datos**
   - Implementar MongoDB o PostgreSQL
   - Guardar usuarios y órdenes permanentemente

2. **Webhooks de Stripe**
   - Confirmar pagos en tiempo real
   - Actualizar estado de órdenes

3. **Email**
   - Enviar confirmación de orden
   - Enviar número de seguimiento

4. **Inventario**
   - Controlar stock de delantales
   - Mostrar disponibilidad

5. **Análisis**
   - Rastrear ventas
   - Analizar comportamiento de usuarios

## Soporte

Para más información:
- Stripe: https://stripe.com/docs
- NextAuth: https://next-auth.js.org
- Next.js: https://nextjs.org/docs
