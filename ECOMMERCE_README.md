# El Gordito del Sabor - Sistema Completo

## 🎉 ¡Bienvenido!

Se ha integrado exitosamente un sistema completo de e-commerce a tu página web de El Gordito del Sabor. Ahora tienes:

✅ **Página web informativa** con recetas y contenido  
✅ **Sistema de autenticación** de usuarios  
✅ **Tienda de delantales personalizados**  
✅ **Carrito de compras**  
✅ **Checkout con Stripe**  
✅ **Panel de admin**  

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
cd /Users/gardo/gordito-del-sabor
npm install --legacy-peer-deps
```

### 2. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus valores
# NEXTAUTH_URL=http://localhost:3001
# NEXTAUTH_SECRET=tu-secret-key
# STRIPE_PUBLISHABLE_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

Accede a: **http://localhost:3001**

## 📋 Flujo de Uso

### Para Usuarios Normales

1. **Visita la página principal** → http://localhost:3001
2. **Haz clic en "Tienda de Delantales"** en el Hero o Navbar
3. **Serás redirigido a login** → http://localhost:3001/auth/login
4. **Regístrate o inicia sesión**
5. **Selecciona un delantal** y personaliza con tu nombre
6. **Agrega al carrito**
7. **Ve a tu carrito** → http://localhost:3001/carrito
8. **Procede al pago** con Stripe
9. **Usa tarjeta de prueba**: 4242 4242 4242 4242
10. **Confirmación** → http://localhost:3001/pago-exitoso

### Para Administradores

- **Ver órdenes**: http://localhost:3001/admin/orders
- Aquí puedes ver todas las órdenes, clientes y detalles

## 🛍️ Productos Disponibles

### 1. Delantal Básico - $19.99
- Algodón 100%
- Bolsillo frontal
- Ajuste regulable
- Personalización incluida

### 2. Delantal Estándar - $29.99
- Algodón premium
- Dos bolsillos
- Refuerzo en cintura
- Personalización incluida
- Más durabilidad

### 3. Delantal Premium Canvas - $39.99
- Lona gruesa 100%
- Tres bolsillos
- Refuerzo profesional
- Personalización incluida
- Máxima durabilidad
- Uso profesional

## 🎨 Personalización

Cada delantal permite personalización con texto:
- **Máximo 20 caracteres**
- Se muestra como: "[TU TEXTO] del Sabor"
- Ejemplos:
  - "El Flaco del Sabor"
  - "La Reina del Sabor"
  - "El Chef del Sabor"

## 🔐 Autenticación

### Registro
- Email
- Contraseña
- Nombre completo
- Las contraseñas se encriptan con bcryptjs

### Login
- Email
- Contraseña
- Sesiones con NextAuth

### Datos de Prueba
Puedes crear usuarios de prueba en la página de login.

## 💳 Stripe

### Configuración Inicial
1. Ve a https://stripe.com
2. Crea una cuenta
3. Obtén tus claves de prueba (test keys)
4. Actualiza `.env.local`

### Tarjetas de Prueba
- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **Fecha**: Cualquier fecha futura
- **CVC**: Cualquier número de 3 dígitos

### Pasar a Producción
1. Obtén tus claves de producción (live keys)
2. Actualiza `.env.local` con las claves live
3. Despliega en Vercel

## 📁 Estructura de Archivos

```
app/
├── api/
│   ├── auth/[...nextauth]/route.ts    # Autenticación
│   ├── checkout/route.ts               # Checkout
│   └── admin/orders/route.ts           # Órdenes
├── auth/
│   └── login/page.tsx                  # Login/Registro
├── tienda/page.tsx                     # Tienda
├── carrito/page.tsx                    # Carrito
├── pago-exitoso/page.tsx               # Confirmación
└── admin/
    └── orders/page.tsx                 # Panel admin

lib/
├── auth.ts                             # Configuración NextAuth
├── products.ts                         # Productos
└── cart-store.ts                       # Carrito (Zustand)

components/
├── Navbar.tsx                          # Navbar con carrito
├── Hero.tsx                            # Hero con tienda
├── AuthProvider.tsx                    # SessionProvider
└── NavbarWrapper.tsx                   # Wrapper para Navbar
```

## 🌐 Despliegue en Vercel

### Pasos

1. **Inicializar Git**
```bash
cd /Users/gardo/gordito-del-sabor
git init
git add .
git commit -m "Initial commit"
```

2. **Crear repositorio en GitHub**
- Ve a https://github.com/new
- Crea un repositorio llamado "gordito-del-sabor"

3. **Push a GitHub**
```bash
git remote add origin https://github.com/tu-usuario/gordito-del-sabor.git
git branch -M main
git push -u origin main
```

4. **Conectar Vercel**
- Ve a https://vercel.com
- Haz clic en "New Project"
- Selecciona tu repositorio

5. **Configurar Variables de Entorno**
En Vercel → Settings → Environment Variables:
```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=genera-una-clave-segura
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

6. **Desplegar**
- Haz clic en "Deploy"

7. **Conectar Dominio GoDaddy**
- En Vercel → Settings → Domains
- Agrega tu dominio de GoDaddy
- Sigue las instrucciones de DNS

## 📚 Documentación Adicional

- **ECOMMERCE_GUIDE.md** - Guía completa del e-commerce
- **STRIPE_SETUP.md** - Configuración de Stripe
- **VERCEL_DEPLOYMENT.md** - Despliegue en Vercel
- **DEPLOYMENT.md** - Despliegue general

## 🔧 Troubleshooting

### Error: "useSession must be wrapped in SessionProvider"
✅ **Solucionado** - Ya está configurado en el layout

### Error: "NEXTAUTH_SECRET not set"
- Asegúrate de haber configurado NEXTAUTH_SECRET en .env.local

### Error: "Stripe key not found"
- Verifica que STRIPE_SECRET_KEY esté en .env.local

### El carrito no persiste
- Verifica que localStorage esté habilitado en el navegador

## 📞 Soporte

Para más información:
- **Next.js**: https://nextjs.org/docs
- **NextAuth**: https://next-auth.js.org
- **Stripe**: https://stripe.com/docs
- **Zustand**: https://github.com/pmndrs/zustand

## 🎯 Próximos Pasos

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

## ✨ Características Implementadas

- ✅ Autenticación con NextAuth
- ✅ Encriptación de contraseñas con bcryptjs
- ✅ Carrito de compras con Zustand
- ✅ Persistencia de carrito en localStorage
- ✅ Checkout con Stripe
- ✅ Panel de admin
- ✅ Personalización de productos
- ✅ Validación de formularios
- ✅ Diseño responsive
- ✅ Integración con página existente

## 🎨 Diseño

- Colores: Ámbar, naranja y tonos cálidos
- Tipografía: Playfair Display para títulos, Inter para cuerpo
- Responsive: Mobile-first design
- Accesibilidad: Semántica HTML correcta

---

**¡Listo para vender delantales personalizados!** 🎉

Para cualquier pregunta o problema, consulta la documentación en los archivos .md del proyecto.
