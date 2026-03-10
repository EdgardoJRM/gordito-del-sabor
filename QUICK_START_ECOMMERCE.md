# 🚀 INICIO RÁPIDO - E-COMMERCE

## Paso 1: Configurar Stripe (5 minutos)

1. Ve a https://stripe.com
2. Crea una cuenta
3. Ve a "Developers" → "API keys"
4. Copia tu **Publishable Key** (pk_test_...)
5. Copia tu **Secret Key** (sk_test_...)

## Paso 2: Configurar Variables de Entorno (2 minutos)

Abre `/Users/gardo/gordito-del-sabor/.env.local` y actualiza:

```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=dev-secret-key-change-in-production

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_AQUI
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_AQUI
```

## Paso 3: Ejecutar el Servidor (1 minuto)

```bash
cd /Users/gardo/gordito-del-sabor
npm run dev
```

Accede a: **http://localhost:3001**

## Paso 4: Probar el Flujo Completo (10 minutos)

### 1. Registro
- Haz clic en "Tienda de Delantales" en el Hero
- Haz clic en "Regístrate"
- Completa el formulario:
  - Nombre: "Tu Nombre"
  - Email: "tu@email.com"
  - Contraseña: "password123"
- Haz clic en "Crear Cuenta"

### 2. Compra
- Selecciona un delantal (ej: "Delantal Básico")
- Ingresa tu nombre personalizado (ej: "El Flaco")
- Haz clic en "Personalizar"
- Haz clic en "Agregar al Carrito"
- Verás que el carrito muestra "1" artículo

### 3. Carrito
- Haz clic en el icono del carrito (arriba a la derecha)
- Verás tu delantal: "El Flaco del Sabor"
- Haz clic en "Proceder al Pago"

### 4. Pago
- Se abrirá Stripe Checkout
- Usa esta tarjeta de prueba:
  - **Número**: 4242 4242 4242 4242
  - **Fecha**: 12/25 (cualquier fecha futura)
  - **CVC**: 123 (cualquier número)
  - **Email**: tu@email.com
- Haz clic en "Pagar"

### 5. Confirmación
- Serás redirigido a la página de éxito
- Verás los detalles de tu orden
- El carrito se habrá limpiado

### 6. Ver Órdenes (Admin)
- Ve a http://localhost:3001/admin/orders
- Verás tu orden listada con todos los detalles

## ✅ Checklist

- [ ] Stripe configurado
- [ ] Variables de entorno actualizadas
- [ ] Servidor ejecutándose
- [ ] Página principal carga
- [ ] Puedo registrarme
- [ ] Puedo iniciar sesión
- [ ] Puedo agregar al carrito
- [ ] Puedo hacer checkout
- [ ] Pago procesado exitosamente
- [ ] Página de confirmación muestra
- [ ] Orden aparece en admin

## 🎯 Próximos Pasos

1. **Desplegar en Vercel**
   - Ver `VERCEL_DEPLOYMENT.md`

2. **Conectar Dominio GoDaddy**
   - Ver `VERCEL_DEPLOYMENT.md`

3. **Pasar a Producción**
   - Obtener claves live de Stripe
   - Actualizar variables de entorno
   - Desplegar en Vercel

4. **Implementar Base de Datos**
   - Ver `ECOMMERCE_GUIDE.md`

## 📞 Problemas Comunes

### "Error: NEXTAUTH_SECRET not set"
→ Asegúrate de haber actualizado .env.local

### "Error: Stripe key not found"
→ Verifica que STRIPE_SECRET_KEY esté en .env.local

### "El carrito no muestra nada"
→ Abre la consola del navegador (F12) y verifica que no haya errores

### "No puedo hacer login"
→ Verifica que hayas ingresado el email y contraseña correctamente

## 📚 Documentación

- `ECOMMERCE_README.md` - Guía completa
- `ECOMMERCE_GUIDE.md` - Detalles técnicos
- `STRIPE_SETUP.md` - Configuración de Stripe
- `VERCEL_DEPLOYMENT.md` - Despliegue

## 🎉 ¡Listo!

Tu sistema de e-commerce está completamente funcional. 

**Ahora puedes:**
- ✅ Vender delantales personalizados
- ✅ Aceptar pagos con Stripe
- ✅ Gestionar órdenes
- ✅ Mantener tu página informativa

¡Felicidades! 🚀
